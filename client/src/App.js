import React, { useState } from 'react';
import './style';

import Button from '@material-ui/core/Button';

const App = () => {
  const [greeting, setGreeting] = useState('');

  const greetingServer = async () => {
    const res = await fetch('http://localhost:5000/greeting');
    const data = await res.json(); 
    setGreeting(data.greeting);
  }

  return (
    <div className='App'>
      <h1 className='greeting'>{greeting}</h1>
      <Button className='button' variant='contained' color='primary' onClick={greetingServer}>Hello SERVER!!!</Button>
    </div>
  );
}

export default App;
