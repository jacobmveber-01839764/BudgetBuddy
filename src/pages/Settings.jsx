import React, { useState, useEffect } from "react";
import { getName, getEmail, getSessionKey, handleLogout } from "../utils/utils";

const Settings = () => {
    const [currentName, setCurrentName] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [newName, setNewName] = useState('');
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [email, setEmail] = useState('');
    const [deleteAccount, setDeleteAccount] = useState('');
    
    useEffect(() => {
        async function fetchName() {
            const currentName = await getName();
            setCurrentName(currentName);
        }
        fetchName();
    }, []);

    useEffect(() => {
        async function fetchEmail() {
            const email = await getEmail();
            setEmail(email);
        }
        fetchEmail();
    }, []);

    // javascript for the updated username and password alerts
    const handleNameChange = (event) => {
        event.preventDefault();

        const name = `${firstName} ${lastName}`;
        setNewName(name);

        const formData = new FormData();
        formData.append('name', name);

        fetch(`https://api.bb.gabefarrell.com/auth/changename?name=${name}`, {
            method: 'POST',
            body: formData,
            headers: {
                'x-session-key': getSessionKey(),
            },
        })
        .then(response => {
            if(response.ok) {
                alert('Name updated successfully!');
                window.location.reload();
            }
            else {
                alert('Name update failed!');
                window.location.reload();
            }
        })
    }
    
    const handlePasswordChange = (event) => {
        event.preventDefault();
        
        const oldP = `${currentPassword}`;
        const newP = `${newPassword}`

        const formData = new FormData();
        formData.append('old', oldP);
        formData.append('new', newP);

        fetch(`https://api.bb.gabefarrell.com/auth/changepassword?old=${oldP}&new=${newP}`, {
            method: 'POST',
            body: formData,
            headers: {
                'x-session-key': getSessionKey(),
            },
        })
        .then(response => {
            if(response.ok) {
                alert('Password updated successfully!');
                window.location.reload();
            }
            else {
                alert('Password update failed! Make sure you have entered your current password correctly');
                window.location.reload();
            }
        })
    }

    const handleDeleteAccount = (event) => {
        event.preventDefault();

        const password = `${deleteAccount}`;

        const formData = new FormData();
        formData.append('password', password);

        fetch(`https://api.bb.gabefarrell.com/auth/deleteaccount?password=${password}`, {
            method: 'POST',
            body: formData,
            headers: {
                'x-session-key': getSessionKey(),
            },
        })
        .then(response => {
            if(response.ok) {
                alert('Account deleted successfully!');
                handleLogout();
            }
            else {
                alert('Account could not be delete. Make sure you have entered your current password correctly');
                window.location.reload();
            }
        })
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

    // toggle between light mode and dark mode
    /*const toggleDarkMode = () => {
        if (document.documentElement.getAttribute('data-bs-theme') === 'dark') {
            document.documentElement.setAttribute('data-bs-theme','light')
        }
        else {
            document.documentElement.setAttribute('data-bs-theme','dark')
        }
    }*/

    return (
    <>
        <div className="container overflow-auto">
            <h4 className="mt-4 mb-4">Profile Settings</h4>

            <h5 className="mb-4">Email and Name</h5>
            <form className="needs-validation" onSubmit={handleNameChange} noValidate>
                <div className="row mb-3">
                    <label htmlFor="staticEmail" className="col-2 col-form-label">Email</label>
                    <div className="col-4">
                        <input type="text" readOnly className="form-control-plaintext" id="staticEmail" value={email}/>
                    </div>
                </div>
                <div className="row mb-3">
                    <label htmlFor="currentName" className="col-2 col-form-label">Current Name</label>
                    <div className="col-4">
                        <input type="text" readOnly className="form-control-plaintext" id="currentName" value={currentName}/>
                    </div>
                </div>
                <div className="row mb-3">
                    <label htmlFor="newFirstName" className="col-2 col-form-label">New First Name</label>
                    <div className="col-4">
                        <input type="text" className="form-control" id="newFirstName" placeholder="Please enter a new first name" value={firstName} onChange={(event) => setFirstName(event.target.value)} required/>
                        <div className="invalid-feedback">
                            Please enter a new first name
                        </div>
                    </div>
                </div>
                <div className="row mb-3">
                    <label htmlFor="newLastName" className="col-2 col-form-label">New Last Name</label>
                    <div className="col-4">
                        <input type="text" className="form-control" id="newLastName" placeholder="Please enter a new last name" value={lastName} onChange={(event) => setLastName(event.target.value)} required />
                        <div className="invalid-feedback">
                            Please enter a new last name
                        </div>
                    </div>
                </div>

                <div>
                    <button type="submit" className="btn btn-primary mb-5" id="newNameButton">Change Name</button>
                </div>
            </form>

            <h5 className="mb-4">Password</h5>
            <form className="needs-validation" onSubmit={handlePasswordChange} noValidate>
                <div className="row mb-3">
                    <label htmlFor="currentPassword" className="col-2 col-form-label">Current Password</label>
                    <div className="col-4">
                        <input type="password" className="form-control" id="currentPassword" placeholder="Please enter your current password" minLength="8" value={currentPassword} onChange={(event) => setCurrentPassword(event.target.value)} required />
                        <div className="invalid-feedback">
                            Please enter your current password
                        </div>
                    </div>
                </div>
                <div className="row mb-3">
                    <label htmlFor="newPassword" className="col-2 col-form-label">New Password</label>
                    <div className="col-4">
                        <input type="password" className="form-control" id="newPassword" placeholder="Please enter a new password" minLength="8" value={newPassword} onChange={(event) => setNewPassword(event.target.value)} required />
                        <div className="invalid-feedback">
                            Please enter a new password
                            <br/>
                            Your new password must be at least 8 characters long
                        </div>
                    </div>
                </div>

                <div>
                    <button type="submit" className="btn btn-primary mb-5" id="newPasswordButton">Change Password</button>
                </div>
            </form>

            {/*<h4 className="mb-4">Dark Mode</h4>

            <div className="form-check form-switch mb-5">
                <input className="form-check-input" type="checkbox" id="darkModeCheckbox" onClick={toggleDarkMode}/>
                <label className="form-check-label" htmlFor="darkModeCheckbox">Enable Dark Mode</label>
            </div>*/}

            <h4 className="mb-4">Account Settings</h4>

            <h5 className="mb-4">Delete Your Account</h5>
            <form className="needs-validation" onSubmit={handleDeleteAccount} noValidate>
                <div className="row mb-3">
                    <label htmlFor="deleteAccount" className="col-2 col-form-label">Current Password</label>
                    <div className="col-4">
                        <input type="password" className="form-control" id="deleteAccount" placeholder="Please enter your current password" minLength="8" value={deleteAccount} onChange={(event) => setDeleteAccount(event.target.value)} required />
                        <div className="invalid-feedback">
                            Please enter your current password in order to delete your account
                        </div>
                    </div>
                </div>
                <div>
                    <button type="submit" className="btn btn-danger" id="deleteAccountButton">Delete Account</button>
                </div>
                <div className="mt-2 mb-5 fw-bold">
                    CAUTION: This will delete your account. All account and profile data
                    will be completely erased.
                </div>
            </form>
        </div>
    </>
    )
}

export default Settings;