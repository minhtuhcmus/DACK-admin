const API_URL = 'http://167.179.80.90:3002/api/'

const login = async (email, password) => {
  const res = await fetch(`${API_URL}/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      username: email,
      password
    })
  });
  const data = await res.json();
  return data;
}

export default {
  login
}
