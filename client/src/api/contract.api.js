import { Cookies } from 'react-cookie';
import { API_URL } from '../constants';

const cookies = new Cookies();

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
  console.log(id, newStatus);
  const res = await fetch(`${API_URL}/api/contracts/${id}`, {
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

export default{
  getContract,
  getContracts,
  changeStatus
};