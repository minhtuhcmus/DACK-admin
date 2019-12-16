/* eslint-disable react/display-name, react/prop-types */
import React, { useState, useEffect }  from 'react';
import {Cookies} from 'react-cookie';
import { connect } from 'react-redux';
import { useTranslation } from 'react-i18next';
// import { compose } from 'redux';
// import { LanguageToggle } from '../components';
// import {userOnly} from '../hocs';
import { withRouter, 
  // Link, 
  useLocation, useHistory } from 'react-router-dom';
import { Button, Icon, Table, 
  // Tag,  
  Col, Row, Modal, Descriptions,
  // Popover, 
  Input } from 'antd';
import { contractApi } from '../api';
// import Slider from 'react-slick';
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

  // useEffect(() => {
  //   i18n.changeLanguage(language);
  // }, [language]);

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
            <Row className='contract-row'>
              <Col span={8}>
              <span className='contract-item-title'>ID: </span>
              {
                contractDetail.contractID
              }
              </Col>
              <Col span={8}>
              <span className='contract-item-title'>Subject: </span>
              {
                contractDetail.subject
              }
              </Col>
              <Col span={8}>
              <span className='contract-item-title'>Creation Date: </span>
              {
                contractDetail.creationDate
              }
              </Col>
            </Row>
            <Row className='contract-row'>
              <Col span={12}>
              <span className='contract-item-title'>Teacher Email: </span>
              {
                contractDetail.teacherEmail
              }
              </Col>
              <Col span={12}>
              <span className='contract-item-title'>Student Email: </span>
              {
                contractDetail.studentEmail
              }
              </Col>
            </Row>
            <Row className='contract-row'>
              <Col span={12}>
              <span className='contract-item-title'>Start Date: </span>
              {
                contractDetail.startDate
              }
              </Col>
              <Col span={12}>
              <span className='contract-item-title'>End Date: </span>
              {
                contractDetail.endDate
              }
              </Col>
            </Row>
            <Row className='contract-row'>
              <span className='contract-item-title'>Price: </span>
              <Col span={6}>
              {
                contractDetail.signedPrice
              }
              </Col>
              <Col span={2}>
                X
              </Col>
              <Col span={6}>
              {
                contractDetail.totalHour
              }
              </Col>
              <Col span={2}>
                =
              </Col>
              <Col span={8}>
              {
                contractDetail.totalPrice
              }
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
              {
                contractDetail.rating
              }
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
              key: 'contractID'
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