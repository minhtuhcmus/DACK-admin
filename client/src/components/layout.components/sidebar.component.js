import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Redirect, useHistory } from 'react-router-dom';
import { Layout } from 'antd';
const { Sider } = Layout;

const MySidebar = () => {
  return(
    <Sider>Sider</Sider>
  ); 
}

export default MySidebar;