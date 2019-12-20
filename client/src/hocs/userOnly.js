/* eslint-disable react/prop-types */
import React, { 
  useEffect } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { 
  useHistory } from 'react-router-dom';
import { Cookies } from 'react-cookie';
import { logout } from '../reducers/auth.reducer';

const userOnly = (MyComponent) => {

  
  const UserWrapper = () => {
    const history = useHistory();
    const cookies = new Cookies();  
    const currUser = cookies.get('CURR_USER');

    useEffect(() => {
      if(!currUser){
        history.push('/login');      
      }
    });

    return (
      <MyComponent user={currUser}/>
    );
  };

  const mapStateToProps = (state) => ({
    isAuthenticated: state.authReducer.isAuthenticated
  }); 
  
  const mapDispatchToProps = (dispatch) => ({
    logoutUser: () => dispatch(logout())
  });

  return compose(
    connect(
      mapStateToProps,
      mapDispatchToProps 
    )
  )(UserWrapper);
};

export default userOnly;