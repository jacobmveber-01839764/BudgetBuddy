export default function Settings() {
    // javascript for the updated username and password alerts
    const handleNameClick = () => {
        const alert = '<div class="alert alert-success alert-dismissible" role="alert">Name updated successfully!<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>';
        document.getElementById('nameAlert').innerHTML = alert;
    }
    
    const handlePasswordClick = () => {
        const alert = '<div class="alert alert-success alert-dismissible" role="alert">Name updated successfully!<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>';
        document.getElementById('passwordAlert').innerHTML = alert;
    }

    (() => {
        // Fetch all the forms we want to apply custom Bootstrap validation styles to
        const forms = document.querySelectorAll('.needs-validation')
    
        // Loop over them and prevent submission
        Array.from(forms).forEach(form => {
        form.addEventListener('click', event => {
            if (!form.checkValidity()) {
            event.preventDefault()
            event.stopPropagation()
            }

            form.classList.add('was-validated')
        }, false)
        })
    })()

    // toggle between light mode and dark mode
    const toggleDarkMode = () => {
        if (document.documentElement.getAttribute('data-bs-theme') === 'dark') {
            document.documentElement.setAttribute('data-bs-theme','light')
        }
        else {
            document.documentElement.setAttribute('data-bs-theme','dark')
        }
    }

    // JSX: Javascript XML
    return (
    <>
        <div className="container overflow-auto">
        <h4 className="mt-4 mb-4">Profile Settings</h4>

        <h5 className="mb-4">Email and Name</h5>
        <form className="needs-validation" noValidate>
            <div className="row mb-3">
            <label htmlFor="staticEmail" className="col-2 col-form-label">Email</label>
            <div className="col-4">
                <input type="text" readOnly className="form-control-plaintext" id="staticEmail" value="daniel_quinonezrosario@student.uml.edu" />
            </div>
            </div>
            <div className="row mb-3">
            <label htmlFor="currentName" className="col-2 col-form-label">Current Name</label>
            <div className="col-4">
                <input type="text" readOnly className="form-control-plaintext" id="currentName" value="Daniel" />
            </div>
            </div>
            <div className="row mb-3">
            <label htmlFor="newName" className="col-2 col-form-label">New Name</label>
            <div className="col-4">
                <input type="text" className="form-control" id="newName" required />
                <div className="invalid-feedback">
                Please enter a new name
                </div>
            </div>
            </div>

            <div id="nameAlert"></div>
            <div>
            <button type="button" className="btn btn-primary mb-5" id="newNameButton" onClick={handleNameClick}>Change Name</button>
            </div>
        </form>

        <h5 className="mb-4">Password</h5>
        <form className="needs-validation" noValidate>
            <div className="row mb-3">
            <label htmlFor="currentPassword" className="col-2 col-form-label">Current Password</label>
            <div className="col-4">
                <input type="password" className="form-control" id="currentPassword" minLength="8" required />
                <div className="invalid-feedback">
                Please enter your current password
                </div>
            </div>
            </div>
            <div className="row mb-3">
            <label htmlFor="newPassword" className="col-2 col-form-label">New Password</label>
            <div className="col-4">
                <input type="password" className="form-control" id="newPassword" minLength="8" required />
                <div className="invalid-feedback">
                Please enter a new password
                <br />
                Your new password must be at least 8 characters long
                </div>
            </div>
            </div>

            <div id="passwordAlert"></div>
            <div>
            <button type="button" className="btn btn-primary mb-5" id="newPasswordButton" onClick={handlePasswordClick}>Change Password</button>
            </div>
        </form>

        <h4 className="mb-4">Dark Mode</h4>

        <div className="form-check form-switch mb-5">
            <input className="form-check-input" type="checkbox" id="darkModeCheckbox" onClick={toggleDarkMode}/>
            <label className="form-check-label" htmlFor="darkModeCheckbox">Enable Dark Mode</label>
        </div>

        <h4 className="mb-4">Account Settings</h4>

        <div className="mb-4">
            <button type="button" className="btn btn-danger">Delete Account</button>
            <br />
            <div className="mt-2">
            CAUTION: This will delete your account. All account and profile data
            will be completely erased.
            </div>
        </div>
        </div>
    </>
    );
}