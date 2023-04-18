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

export function getSessionKey() {
  var cookies = document.cookie.split(';');
  for (let i = 0; i < cookies.length; i++) {
    const cookie = cookies[i].trim(); // Remove any leading or trailing whitespace
    if (cookie.startsWith('session=')) {
      return cookie.substring('session='.length, cookie.length); // Extract the value of the cookie
    }
  }
  return null;
}

export async function getName() {
  try {
    const response = await fetch('https://api.bb.gabefarrell.com/userinfo', {
      method: 'GET',
      headers: {
        'x-session-key': getSessionKey(),
      },
    });
    const data = await response.json();
    const name = data.name;
    return name;
  } catch (error) {
    console.error(error);
  }
}

export function handleLogout() {
  document.cookie.split(";").forEach(function(c) { document.cookie = c.replace(/^ +/, "").replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/"); });
  window.location.href='/welcome';
}

export function calculateValue(category) {
  return category.whole + category.decimal * 0.01;
}