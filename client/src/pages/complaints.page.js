/* eslint-disable react/display-name, react/prop-types */
import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { 
  withRouter, 
  useLocation, 
  useHistory 
} from 'react-router-dom';
import {Cookies} from 'react-cookie';
import { complaintApi } from '../api';
import { useTranslation } from 'react-i18next';
import { Card, Row, Col } from 'antd';

const cookies = new Cookies();

const ComplaintsPage = ({language, setshowLayout, setTab}) => {
  const location = useLocation();
  const currUser = cookies.get('CURR_USER');
  const history = useHistory();
  const {t, i18n} = useTranslation();
  const [complaintList, setComplaintList] = useState(null);
  useEffect(() => {
    if(!currUser){
      history.push('/login');      
    }
  });

  useEffect(() => {
    i18n.changeLanguage(language);
  }, [language]);

  useEffect(() => {
    async function checkLocation() {
      await setTab(location.pathname);
      if(location.pathname === '/login'){
        await setshowLayout(false);
      }
      else{
        await setshowLayout(true);
      }
    }
    checkLocation();
  });

  async function loadData() {
    const res = await complaintApi.getComplaints();
    await setComplaintList(res.data);
  }

  useEffect(() => {
    loadData();
  }, []);

  return(
    <Row>
      {
        complaintList ? 
          complaintList.map((complaint, index) => 
            <Col 
              xs={{span: 24}} 
              sm={{span: 24}} 
              md={{span: 12}} 
              lg={{span: 12}} 
              xl={{span: 8}}
              key={index} 
            >
              <Card 
                title={`${t('complaint')} #${complaint.complaintID}`} 
              
                style={{ 
                  margin: '12px' 
                }}
                onClick={() => {
                
                }}
              >
                <span>{complaint.content}</span>
              </Card>
            </Col>
          )
          :
          null
      }
    </Row>
  );

};

const mapStateToProps = (state) => ({
  language: state.appReducer.language  
}); 

const mapDispatchToProps = () => ({

});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ComplaintsPage));