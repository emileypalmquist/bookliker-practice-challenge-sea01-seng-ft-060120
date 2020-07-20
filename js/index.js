document.addEventListener("DOMContentLoaded", function() {});

fetch('http://localhost:3000/books')
.then(res => res.json())
.then(json => json.forEach(element => {
    listAllBooks(element)
}))


const listAllBooks = (book) => {
    let list = document.getElementById('list')
    let li = document.createElement('li')
    li.textContent = book.title
    list.appendChild(li)
    li.addEventListener('click', (e) => getBookImage(book, e))
}

const getBookImage = (book, e) => {
    let div = document.getElementById('show-panel')
    div.innerHTML = `
        <img src='${book.img_url}'>
        <h4>${book.title}</h4>
        <p>${book.description}</p>
        <button id='like'><3</button>
    `
    let button = document.getElementById('like')
    button.addEventListener('click', () => handleLike(book))

    let userListUl = document.createElement('ul')
    userListUl.id = 'user-list'
    book.users.forEach(user => {
        let userLi = document.createElement('li')
        userLi.innerText = user.username
        userListUl.appendChild(userLi)
    })
    div.appendChild(userListUl)
}

const handleLike = (book) => {
    // console.log(book)
    let users = book.users
    const currentUser = {"id":1, "username":"pouros"}
    users.push(currentUser)

    let userLikesList = document.getElementById('user-list')
    let li = document.createElement('li')
    li.innerText = currentUser.username
    userLikesList.appendChild(li)

    fetch(`http://localhost:3000/books/${book.id}`, {
        method: 'PATCH',
        body: JSON.stringify({users: users}),
        headers: {
            "Content-type": "application/json"
        }
    })
    .then(res => res.json())
    .then(json => console.log(json))
}