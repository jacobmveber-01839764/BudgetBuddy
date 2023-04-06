export default function checkLogin() {
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