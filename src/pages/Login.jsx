import React, { useState } from 'react'
import { Container } from 'react-bootstrap'
import './Login.css'

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorText, setErrorText] = useState(null);

    function handleSubmit(event) {
        event.preventDefault();

        const formData = new FormData();
        formData.append('email', email);
        formData.append('password', password);

        // Send the form data via HTTP using Fetch API
        fetch(`https://api.bb.gabefarrell.com/auth/login?email=${email}&password=${password}`, {
            method: 'POST',
            body: formData,
        })
        .then((response) => response.json())
        .then((data) => {
            if (data.status != 200) {
                console.log(data.error);
                setErrorText(data.error);
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
                    <h3>Sign In</h3>
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
                    <div className="mb-3">
                    <div className="custom-control custom-checkbox">
                        <input
                        type="checkbox"
                        className="custom-control-input"
                        id="customCheck1"
                        />
                         <label id="remember-me" className="custom-control-label" htmlFor="customCheck1">
                        Remember me
                        </label>
                    </div>
                    </div>
                    <div className="d-grid">
                    <button type="submit" className="btn btn-primary mb-3">
                        Submit
                    </button>
                    </div>
                    {errorText && <div className='alert alert-danger p-2 mb-1'>{errorText}</div>}
                    <p className="forgot-password">
                        Don't have an account? <a href="/signup">sign up</a>
                    </p>
                    {/* <p className="forgot-password">
                    Forgot <a href="#">password?</a>
                    </p> */}
                </form>
            </div>
        </div>
    )
}