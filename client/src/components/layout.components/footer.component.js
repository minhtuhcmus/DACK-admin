import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Redirect, useHistory } from 'react-router-dom';
import { Layout } from 'antd';
const { Footer } = Layout;

const MyFooter = () => {
  return(
    <Footer>Footer</Footer>
  ); 
}

export default MyFooter;