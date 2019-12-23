/* eslint-disable react/display-name, react/prop-types */
import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { 
  withRouter, 
  useLocation, 
  useHistory 
} from 'react-router-dom';
import {Cookies} from 'react-cookie';
import { complaintApi, contractApi } from '../api';
import { useTranslation } from 'react-i18next';
import { Card, Row, Col, Modal, Radio, Tabs, Tooltip } from 'antd';

const { TabPane } = Tabs;
const cookies = new Cookies();

const ComplaintsPage = ({language, setshowLayout, setTab}) => {
  const location = useLocation();
  const currUser = cookies.get('CURR_USER');
  const history = useHistory();
  const {t, i18n} = useTranslation();
  const [complaintList, setComplaintList] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [contractDetail, setContractDetail] = useState(null);
  const [chatLog, setChatLog] = useState(null);

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
    <div>
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
                  onClick={async () => {
                    let resContract = await contractApi.getContract(complaint.contractID);
                    let resChat = await complaintApi.getChats(complaint.contractID);
                    await setContractDetail(resContract.data);
                    await setChatLog(resChat.data);
                    await setShowModal(true);
                  }}
                  style={{ 
                    margin: '12px' 
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

      <Modal 
        title="Complaint Info"
        visible={showModal}
        onOk={async () => {
          await setShowModal(false);
        }}
        onCancel={async () => {
          await setShowModal(false);
        }}
        width='50%'
      >
        <Tabs defaultActiveKey="1">
          <TabPane tab="Contract Detail" key="1">
            {
              contractDetail ?
                <div>
                  <Row className='contract-row' style={{
                    borderRadius: '5px',
                    borderStyle: 'solid',
                    paddingTop: '12px'
                  }}>
                    <Col span={8}>
                      <span className='contract-item-title'>Subject: </span>
                      <h1 style={{fontSize: 'large'}}>
                        {
                          contractDetail.subject
                        }
                      </h1>
                    </Col>
                    <Col span={8}>
                      <span className='contract-item-title'>ID: </span>
                      <h1 style={{fontSize: 'xx-large'}}>
                        {
                          contractDetail.contractID
                        }
                      </h1>
                    </Col>
                    <Col span={8}>
                      <span className='contract-item-title'>Creation Date: </span>
                      <h1 style={{fontSize: 'large'}}>
                        {
                          contractDetail.creationDate
                        }
                      </h1>
                    </Col>
                  </Row>
                  <Row className='contract-row'>
                    <Col span={12}>
                      <span className='contract-item-title'>Teacher Email: </span>
                      <h1 style={{fontSize: 'x-large	'}}>
                        {
                          contractDetail.teacherEmail
                        }
                      </h1>
                  
                    </Col>
                    <Col span={12}>
                      <span className='contract-item-title'>Student Email: </span>
                      <h1 style={{fontSize: 'x-large'}}>
                        {
                          contractDetail.studentEmail
                        }
                      </h1>
                    </Col>
                  </Row>
                  <Row className='contract-row'>
                    <Col span={12}>
                      <span className='contract-item-title'>Start Date: </span>
                      <h1 style={{fontSize: 'x-large'}}>
                        {
                          contractDetail.startDate
                        }
                      </h1>
                    </Col>
                    <Col span={12}>
                      <span className='contract-item-title'>End Date: </span>
                      <h1 style={{fontSize: 'x-large'}}>
                        {
                          contractDetail.endDate
                        }
                      </h1>
                    </Col>
                  </Row>
                  <Row className='contract-row price'>
                    <Col span={4}>
                      <h2 className='contract-item-title'>Price: </h2>
                    </Col>
                    <Col span={4}>
                      <span className='contract-item-title'>Per hour</span>
                      <h1 style={{fontSize: 'large'}}>
                        {
                          contractDetail.signedPrice
                        }
                      </h1>
                    </Col>
                    <Col span={4}>
                X
                    </Col>
                    <Col span={4}>
                      <span className='contract-item-title'>Hour(s)</span>
                      <h1 style={{fontSize: 'large'}}>
                        {
                          contractDetail.totalHour
                        }
                      </h1>
                    </Col>
                    <Col span={2}>
                =
                    </Col>
                    <Col span={6}>
                      <h1 style={{fontSize: 'xx-large'}}>
                        {
                          contractDetail.totalPrice
                        }
                      </h1>
                    </Col>
                  </Row>
                  <Row className='contract-row'>
                    <Col span={12}>
                      <span className='contract-item-title'>Review: </span>
                      {
                        contractDetail.review
                      }
                    </Col>
                    <Col span={12}>
                      <span className='contract-item-title'>Rating: </span>
                      <h1 style={{fontSize: 'large'}}>
                        {
                          contractDetail.rating
                        }
                      </h1>
                    </Col>
                  </Row>
                  <Row className='contract-row' type="flex" justify="center">
                    <Col span={12}>
                      <Radio.Group value={contractDetail.status} onChange={async (e) => {
                        console.log('value', e.target.value);
                        let res = await contractApi.changeStatus(contractDetail.contractID, e.target.value);
                        if(res.returnCode === 1){
                          let newContract = await contractApi.getContract(contractDetail.contractID);
                          console.log('newContract', newContract);
                          setContractDetail(newContract.data);
                        }
                        loadData();
                      }}>
                        <Radio.Button value={0}>{t('cancel')}</Radio.Button>
                        <Radio.Button value={2} disabled>{t('waiting')}</Radio.Button>
                        <Radio.Button value={3} disabled>{t('ongoing')}</Radio.Button>
                        <Radio.Button value={1}>{t('done')}</Radio.Button>
                      </Radio.Group>
                    </Col>
                  </Row>
                </div>
                :
                ''
            }
          </TabPane>
          <TabPane tab="Chat log" key="2">
            {
              chatLog ? 
              chatLog.map(chat =>
                
                  <Row 
                  type='flex' 
                  justify={chat.sender === 1 ? 'end' : 'start'} 
                  style={{
                    marginBottom: '5px'
                  }}
                >
                <Tooltip title={chat.timestamp} placement={chat.sender === 1 ? 'left' : 'right'}>

                  <Col span={12} 
                    style={{
                      backgroundColor: chat.sender === 1 ? '#09f' : '#f1f0f0',
                      color: chat.sender === 1 ? 'white' : 'black',
                      borderRadius: '10px'
                    }}>
                    {
                      chat.message
                    }
                  </Col>
                  </Tooltip>

                </Row>

                 
                
              )
              :
              null
            }
          </TabPane>
        </Tabs>
        
      </Modal>
    </div>
  );

};

const mapStateToProps = (state) => ({
  language: state.appReducer.language  
}); 

const mapDispatchToProps = () => ({

});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ComplaintsPage));