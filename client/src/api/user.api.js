import { Cookies } from 'react-cookie';
const cookies = new Cookies();

const API_URL = 'http://167.179.80.90:3002'

const addUser = async (data) => {
  const res = await fetch(`${API_URL}/api/users`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${cookies.get('MY_TOKEN')}`
    },
    body: JSON.stringify(data)
  });
  const res_data = await res.json();
  return res_data;
}

const getUsers = async () => {
  const res = await fetch(`${API_URL}/api/users`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${cookies.get('MY_TOKEN')}`
    }
  });
  const res_data = await res.json();
  return res_data;
}

const getUser = async (email) => {
  const res = await fetch(`${API_URL}/api/users/${email}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${cookies.get('MY_TOKEN')}`
    }
  });
  const res_data = await res.json();
  return res_data;
}

export default {
  addUser,
  getUsers, 
  getUser
}
