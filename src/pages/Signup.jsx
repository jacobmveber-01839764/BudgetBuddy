import './Login.css'
import React, { useState } from 'react'

export default function SignUp() {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');


    function handleSubmit(event) {
        event.preventDefault();

        // Combine firstname and lastname into name field
        const name = `${firstName} ${lastName}`;
        setName(name);

        const formData = new FormData();
        formData.append('name', name);
        formData.append('email', email);
        formData.append('password', password);

        // Send the form data via HTTP using Fetch API
        fetch(`http://127.0.0.1:3030/auth/createaccount?name=${name}&email=${email}&password=${password}`, {
            method: 'POST',
            body: formData,
        })
        .then((response) => response.json())
        .then((data) => {
            if (data.status != 200) {
                console.log(data.error);
            } else {
                const session = data.session;
                document.cookie = `session=${session}; path=/;`
                window.location.href = '/dashboard';
            }

            console.log(data); // Log the response from the server
        })
        .catch((error) => {
            console.error(error); // Log any errors
        });
    }

    return (
        <div className="auth-wrapper">
            <div className="auth-inner">
                <form id="form" onSubmit={handleSubmit}>
                    <h3>Sign Up</h3>
                    <div className="mb-3">
                    <label>First name</label>
                    <input
                        type="text"
                        className="form-control"
                        placeholder='First Name'
                        value={firstName}
                        onChange={(event) => setFirstName(event.target.value)}
                        required
                    />
                    </div>
                    <div className="mb-3">
                    <label>Last name</label>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Last name"
                        value={lastName}
                        onChange={(event) => setLastName(event.target.value)}
                        required
                    />
                    </div>
                    <div className="mb-3">
                    <label>Email address</label>
                    <input
                        type="email"
                        className="form-control"
                        placeholder="Enter email"
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                        required
                    />
                    </div>
                    <div className="mb-3">
                    <label>Password</label>
                    <input
                        type="password"
                        className="form-control"
                        placeholder="Enter password"
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                        required
                    />
                    </div>
                    <div className="d-grid">
                    <button type="submit" className="btn btn-primary mb-3">
                        Sign Up
                    </button>
                    </div>
                    <p className="forgot-password text-right">
                    Already registered? <a href="/login">log in</a>
                    </p>
                </form>
            </div>
        </div>
    )
}