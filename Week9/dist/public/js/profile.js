"use strict";
const logoutBtn = document.getElementById('logout');
const addItem = document.getElementById('add-item');
if (logoutBtn !== null) {
    logoutBtn.addEventListener('click', () => {
        localStorage.removeItem('auth_token');
        window.location.reload();
    });
}
if (addItem !== null) {
    addItem.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            console.log(addItem.value);
            fetch('http://localhost:3000/api/todos', {
                method: "POST",
                body: JSON.stringify({ items: [addItem.value] }),
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem('auth_token')}`
                }
            })
                .then((res) => res.text())
                .then((text) => console.log(text));
        }
    });
}
