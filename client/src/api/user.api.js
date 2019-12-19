import { Cookies } from 'react-cookie';

import { API_URL } from '../constants';
const cookies = new Cookies();

const addAdmin = async (data) => {
  const res = await fetch(`${API_URL}/api/admins`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${cookies.get('MY_TOKEN')}`
    },
    body: JSON.stringify(data)
  });
  const resData = await res.json();
  return resData;
};

const getAdmins = async () => {
  const res = await fetch(`${API_URL}/api/admins`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${cookies.get('MY_TOKEN')}`
    }
  });
  const resData = await res.json();
  return resData;
};

const getAdmin = async (email) => {
  const res = await fetch(`${API_URL}/api/admins/${email}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${cookies.get('MY_TOKEN')}`
    }
  });
  const resData = await res.json();
  return resData;
};

const changeAdmin = async (email, data) => {
  const res = await fetch(`${API_URL}/api/admins/${email}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${cookies.get('MY_TOKEN')}`
    },
    body: JSON.stringify(data)
  });
  const resData = await res.json();
  return resData;
};

const getUsers = async () => {
  const res = await fetch(`${API_URL}/api/users`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${cookies.get('MY_TOKEN')}`
    }
  });
  const resData = await res.json();
  return resData;
};

const getUser = async (email) => {
  const res = await fetch(`${API_URL}/api/users/${email}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${cookies.get('MY_TOKEN')}`
    }
  });
  const resData = await res.json();
  return resData;
};

const changeUser = async (email, data) => {
  const res = await fetch(`${API_URL}/api/users/${email}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${cookies.get('MY_TOKEN')}`
    },
    body: JSON.stringify(data)
  });
  const resData = await res.json();
  return resData;
};

const changePassword = async (email, { oldPassword, newPassword }) => {
  const res = await fetch(`${API_URL}/api/admins/changepassword/${email}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${cookies.get('MY_TOKEN')}`
    },
    body: JSON.stringify({oldPassword, newPassword})
  });
  const resData = await res.json();
  return resData;
};

export default {
  addAdmin,
  getUsers, 
  getUser,
  changeAdmin,
  changeUser,
  getAdmins,
  getAdmin,
  changePassword
};
