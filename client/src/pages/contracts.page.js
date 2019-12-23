/* eslint-disable react/display-name, react/prop-types */
import React, { useState, useEffect }  from 'react';
import {Cookies} from 'react-cookie';
import { connect } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { withRouter, 
  useLocation, useHistory } from 'react-router-dom';
import { Button, Table, 
  Col, Row, Modal, Radio,
} from 'antd';
import { contractApi } from '../api';
const cookies = new Cookies();
const ContractsPage = ({language, setshowLayout, setTab}) => {
  const [showModal, setShowModal] = useState(false);
  const [contractDetail, setContractDetail] = useState(null);
  const {t, i18n} = useTranslation();
  const history = useHistory();
  const currUser = cookies.get('CURR_USER');
  useEffect(() => {
    if(!currUser){
      history.push('/login');      
    }
  });

  useEffect(() => {
    i18n.changeLanguage(language);
  }, [language]);

  const location = useLocation();
  const [contractList, setContractList] = useState(null);

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
    const res = await contractApi.getContracts();
    await setContractList(res.data);
  }

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div>
      
      <Row className='page-title'>
        <h1 className='page-title-text'>{t('contracts')}</h1>
      </Row>
      <Modal 
        title="Contract Info"
        visible={showModal}
        onOk={async () => {
          await setShowModal(false);
        }}
        onCancel={async () => {
          await setShowModal(false);
        }}
        width='50%'
      >
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
      </Modal>
      <Table 
        columns={
          [
            {
              title: t('contract_id'),
              dataIndex: 'contractID',
              key: 'contractID',
              width: '100px'
            },
            {
              title: t('teacher_email'),
              dataIndex: 'teacherEmail',
              key: 'teacherEmail'
            },
            {
              title: t('student_email'),
              dataIndex: 'studentEmail',
              key: 'studentEmail'
            },
            {
              title: t('subject'),
              dataIndex: 'subject',
              key: 'subject'
            },
            {
              title: t('creation_date'),
              dataIndex: 'creationDate',
              key: 'creationDate'
            },
            {
              title: t('start_date'),
              dataIndex: 'startDate',
              key: 'startDate'
            },
            {
              title: t('end_date'),
              dataIndex: 'endDate',
              key: 'endDate'
            },
            {
              title: t('action'),
              key: 'action',
              render: record => 
                <Button icon='eye' type='primary' onClick={ async () => {
                  await setContractDetail(record);
                  await setShowModal(true);
                }}/>
            }
          ]
        }

        dataSource={contractList ? contractList: null}
        scroll={{ y: 350}}
      />
    </div>
  );
};

const mapStateToProps = (state) => ({
  language: state.appReducer.language  
}); 

const mapDispatchToProps = () => ({

});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ContractsPage));