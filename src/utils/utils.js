export function checkLogin() {
  var cookies = document.cookie.split(';');
  for (var i = 0; i < cookies.length; i++) {
    var cookie = cookies[i].trim();
    if (cookie.indexOf('session=') === 0) {
      // The "session" cookie exists
      return true;
   }
  }
  // The "session" cookie doesn't exist
  return false;
}

function getSessionKey() {
  var cookies = document.cookie.split(';');
  for (let i = 0; i < cookies.length; i++) {
    const cookie = cookies[i].trim(); // Remove any leading or trailing whitespace
    if (cookie.startsWith('session=')) {
      console.log(cookie.substring('session='.length, cookie.length));
      return cookie.substring('session='.length, cookie.length); // Extract the value of the cookie
    }
  }
  return null;
}

export function getFirstName() {
  fetch('http://127.0.0.1:3030/userinfo', {
    method: 'GET',
    headers: {
      'x-session-key' : "b36efa01-7824-4f61-a274-63131b58d8fe",
    }
  })
  .then(response => response.json())
  .then(data => {
    const name = data.name;
    return name; // Return firstname
  })
  .catch(error => console.error(error));
}