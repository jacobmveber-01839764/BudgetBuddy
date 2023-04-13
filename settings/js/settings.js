// javascript for the updated username alert
const nameAlertPlaceholder = document.getElementById('nameAlert')
const nameAppendAlert = (message, type) => {
  const wrapper = document.createElement('div')
  wrapper.innerHTML = [
    `<div className"alert alert-${type} alert-dismissible" role="alert">`,
    `   <div>${message}</div>`,
    '   <button type="button" className"btn-close" data-bs-dismiss="alert" aria-label="Close"></button>',
    '</div>'
  ].join('')

  nameAlertPlaceholder.append(wrapper)
}

const nameAlertTrigger = document.getElementById('newNameButton')
if (nameAlertTrigger) {
    nameAlertTrigger.addEventListener('click', () => {
    nameAppendAlert('Name updated successfully!', 'success')
  })
}

// javascript for the updated password alert
const passwordAlertPlaceholder = document.getElementById('passwordAlert')
const passwordAppendAlert = (message, type) => {
  const wrapper = document.createElement('div')
  wrapper.innerHTML = [
    `<div className"alert alert-${type} alert-dismissible" role="alert">`,
    `   <div>${message}</div>`,
    '   <button type="button" className"btn-close" data-bs-dismiss="alert" aria-label="Close"></button>',
    '</div>'
  ].join('')

  passwordAlertPlaceholder.append(wrapper)
}

const passwordAlertTrigger = document.getElementById('newPasswordButton')
if (passwordAlertTrigger) {
  passwordAlertTrigger.addEventListener('click', () => {
    passwordAppendAlert('Password updated successfully!', 'success')
  })
}

(() => {
    'use strict'
  
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
document.getElementById('darkModeCheckbox').addEventListener('click', ()=>{
  if (document.documentElement.getAttribute('data-bs-theme') == 'dark') {
      document.documentElement.setAttribute('data-bs-theme','light')
  }
  else {
      document.documentElement.setAttribute('data-bs-theme','dark')
  }
})



