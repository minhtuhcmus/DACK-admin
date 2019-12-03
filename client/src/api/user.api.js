import { Cookies } from 'react-cookie';
const cookies = new Cookies();

const API_URL = 'http://localhost:3002'

const addUser = async (data) => {
  console.log('data call api', data);
  console.log({
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${cookies.get('MY_TOKEN')}`
    },
    body: JSON.stringify(data)
  });
  const res = await fetch(`${API_URL}/api/users`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${cookies.get('MY_TOKEN')}`
    },
    body: JSON.stringify({
      data
    })
  });
  console.log('res from db', res);
  const res_data = await res.json();
  return res_data;
}

export default {
  addUser
}
