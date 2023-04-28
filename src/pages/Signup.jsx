import './Login.css'
import React, { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.css';

export default function SignUp() {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorText, setErrorText] = useState(null);


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
        fetch(`https://api.bb.gabefarrell.com/auth/createaccount?name=${name}&email=${email}&password=${password}`, {
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
            setErrorText(error);
        });
    }

    (() => {
        // Fetch all the forms we want to apply custom Bootstrap validation styles to
        const forms = document.querySelectorAll('.needs-validation')
    
        // Loop over them and prevent submission
        Array.from(forms).forEach(form => {
        form.addEventListener('submit', event => {
            if (!form.checkValidity()) {
                event.preventDefault();
                event.stopPropagation();
            }

            form.classList.add('was-validated')
        }, false)
        })
    })()

    return (
        <div className="auth-wrapper">
            <div className="auth-inner">
                <form className="needs-validation" id="form" onSubmit={handleSubmit} noValidate>
                    <h3>Sign Up</h3>
                    <div className="mb-3">
                    <label>First name</label>
                    <input
                        type="text"
                        className="form-control"
                        placeholder='First Name'
                        pattern="\S(.*\S)?"
                        value={firstName}
                        onChange={(event) => setFirstName(event.target.value)}
                        required
                    />
                    <div className='invalid-feedback'>
                        Please enter a valid first name
                    </div>
                    </div>
                    <div className="mb-3">
                    <label>Last name</label>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Last name"
                        pattern="\S(.*\S)?"
                        value={lastName}
                        onChange={(event) => setLastName(event.target.value)}
                        required
                    />
                    <div className='invalid-feedback'>
                        Please enter a valid last name
                    </div>
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
                    <div className='invalid-feedback'>
                        Please enter a valid email address
                    </div>
                    </div>
                    <div className="mb-3">
                    <label>Password</label>
                    <input
                        type="password"
                        className="form-control"
                        placeholder="Enter password"
                        pattern="\S(.*\S)?"
                        minLength="8"
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                        required
                    />
                    <div className='invalid-feedback'>
                        Please enter a valid password
                        <br/>
                        Your new password must be at least 8 characters long
                        <br/>
                        It cannot have whitespace at the start or end of it
                    </div>
                    </div>
                    <div className="d-grid">
                    <button type="submit" className="btn btn-primary mb-3">
                        Sign Up
                    </button>
                    {errorText && <div className='alert alert-danger p-2 mb-1'>{errorText}</div>}
                    </div>
                    <p className="forgot-password text-right">
                    Already registered? <a href="/login">log in</a>
                    </p>
                </form>
            </div>
        </div>
    )
}