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
  const res_data = await res.json();
  return res_data;
}

const getSkills = async() => {
  const res = await fetch(`${API_URL}/api/skills`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${cookies.get('MY_TOKEN')}`
    }
  });
  const res_data = await res.json();
  return res_data;
}

const getSkill = async(id) => {
  const res = await fetch(`${API_URL}/api/skills/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${cookies.get('MY_TOKEN')}`
    }
  });
  const res_data = await res.json();
  return res_data;
}

const deleteSkill = async(id) => {
  const res = await fetch(`${API_URL}/api/skills/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${cookies.get('MY_TOKEN')}`
    }
  });
  const res_data = await res.json();
  return res_data;
}

export default{
  addSkill,
  getSkill,
  getSkills,
  deleteSkill
}