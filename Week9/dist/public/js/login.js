"use strict";
const loginForm = document.getElementById('login-form');
const errorField = document.getElementById('errors');
if (loginForm)
    loginForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const form = event.target;
        const data = new FormData(form);
        fetch("http://localhost:3000/api/user/login", {
            method: "POST",
            body: data
        })
            .then((res) => res.json())
            .then((json) => {
            if (json.token) {
                localStorage.setItem('auth_token', json.token);
            }
            else {
                if (errorField !== null) {
                    errorField.textContent = json.msg;
                }
            }
        })
            .then(() => {
            if (localStorage.getItem('auth_token')) {
                window.location.href = "http://localhost:3000/";
            }
        });
    });
