import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Redirect, useHistory } from 'react-router-dom';
import { Layout } from 'antd';
const { Content } = Layout;

const MyContent = ({MyComponent, curr_user}) => {
  return(
    <Content>
      <MyComponent user={curr_user}/>
    </Content>
  ); 
}

export default MyContent;