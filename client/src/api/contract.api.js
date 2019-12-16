import { Cookies } from 'react-cookie';
const cookies = new Cookies();
const API_URL = 'http://167.179.80.90:3002';

const getContracts = async() => {
  const res = await fetch(`${API_URL}/api/contracts`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${cookies.get('MY_TOKEN')}`
    }
  });
  const resData = await res.json();
  return resData;
};

const getContract = async(id) => {
  const res = await fetch(`${API_URL}/api/contracts/${id}`, {
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
  const res = await fetch(`${API_URL}/api/contracts/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${cookies.get('MY_TOKEN')}`
    },
    body: JSON.stringify({status: newStatus})
  });
  const resData = await res.json();
  return resData;
}

export default{
  getContract,
  getContracts,
  changeStatus
};