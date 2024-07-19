const contentDiv = document.getElementById('content') as HTMLElement

fetch('http://localhost:3000/auth', {
    method: "GET",
    headers: {
        "Authorization": `Bearer ${localStorage.getItem('auth_token')}`
    }
}).then((res) => res.text())
.then((text) => {
    contentDiv.innerHTML = text;

    const logoutBtn = document.getElementById('logout')
    const addItem = document.getElementById('add-item') as HTMLInputElement
    const itemsList = document.getElementById('items')

    if (itemsList !== null) {
        fetch('http://localhost:3000/api/todos/list', {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${localStorage.getItem('auth_token')}`
            }
        }).then((res) => res.json())
        .then((json) => {
            json.items.forEach((item: string) => {
                let newLI = document.createElement('li')
                newLI.textContent=item
                itemsList.appendChild(newLI)
            });
        })
    }

    if (logoutBtn !== null) {
        logoutBtn.addEventListener('click', () => {
            localStorage.removeItem('auth_token')
            window.location.reload()
        })
    }
    if (addItem !== null) {
        addItem.addEventListener('keypress', (event) => {
            if (event.key === 'Enter') {
                fetch('http://localhost:3000/api/todos', {
                    method: "POST",
                    body: JSON.stringify({ items: [addItem.value] }),
                    headers: {
                        'Content-Type': 'application/json',
                        "Authorization": `Bearer ${localStorage.getItem('auth_token')}`
                    }
                })
                .then((res) => {
                    if (res.ok) {
                        addItem.value=""
                    }
                })
            }
        })
    }
})

