const API_URL = 'http://167.179.80.90:3002'

const login = async (username, password) => {
  const res = await fetch(`${API_URL}/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      username,
      password
    })
  });
  console.log('res from db', res);
  const data = await res.json();
  return data;
}

export default {
  login
}
