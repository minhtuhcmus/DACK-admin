import { Cookies } from 'react-cookie';
const cookies = new Cookies();
const API_URL = 'http://167.179.80.90:3002';

const addSkill = async(data) => {
  const res = await fetch(`${API_URL}/api/skills`,{
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

const getSkills = async() => {
  const res = await fetch(`${API_URL}/api/skills`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${cookies.get('MY_TOKEN')}`
    }
  });
  const resData = await res.json();
  return resData;
};

const getSkill = async(id) => {
  const res = await fetch(`${API_URL}/api/skills/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${cookies.get('MY_TOKEN')}`
    }
  });
  const resData = await res.json();
  return resData;
};

const deleteSkill = async(id) => {
  const res = await fetch(`${API_URL}/api/skills/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${cookies.get('MY_TOKEN')}`
    }
  });
  const resData = await res.json();
  return resData;
};

export default{
  addSkill,
  getSkill,
  getSkills,
  deleteSkill
};