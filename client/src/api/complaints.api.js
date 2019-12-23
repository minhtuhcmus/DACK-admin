import { Cookies } from 'react-cookie';
import { API_URL } from '../constants';

const cookies = new Cookies();

const getComplaints = async() => {
  const res = await fetch(`${API_URL}/api/complaints`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${cookies.get('MY_TOKEN')}`
    }
  });
  const resData = await res.json();
  return resData;
};

const getComplaint = async(id) => {
  const res = await fetch(`${API_URL}/api/complaints/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${cookies.get('MY_TOKEN')}`
    }
  });
  const resData = await res.json();
  return resData;
};

const changeStatus = async (id, newStatus) => {
  console.log(id, newStatus);
  const res = await fetch(`${API_URL}/api/complaints/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${cookies.get('MY_TOKEN')}`
    },
    body: JSON.stringify({status: newStatus})
  });
  const resData = await res.json();
  console.log(resData);
  return resData;
};

const getChats = async(id) => {
  const res = await fetch(`${API_URL}/api/complaints/chat/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${cookies.get('MY_TOKEN')}`
    }
  });
  const resData = await res.json();
  return resData;
};

export default{
  getComplaints,
  getComplaint,
  getChats,
  changeStatus
};