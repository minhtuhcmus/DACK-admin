import React, { useState, useEffect }  from 'react';
import {Cookies} from 'react-cookie';
import { connect } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { compose } from 'redux';
import { LanguageToggle } from '../components';
import {userOnly} from '../hocs';
import { withRouter, Link, useLocation, useHistory } from 'react-router-dom';
import { Button, Icon, Table, Tag, Row, Drawer, Popover, Input } from 'antd';
import { skillApi } from '../api';
import Slider from 'react-slick';
const cookies = new Cookies();
const SkillsPage = ({language, setshowLayout, setTab}) => {
  const [showDrawer, setShowDrawer] = useState(false);
  const [newSkill, setNewSkill] = useState('');
  const {t, i18n} = useTranslation();
  const history = useHistory();
  const curr_user = cookies.get('CURR_USER');
  useEffect(() => {
    if(!curr_user){
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
  const [skillList, setSkillList] = useState(null);

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
    const res = await skillApi.getSkills();
    await setSkillList(res.data);
  }

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div>
      
      <Row className='page-title'>
        <h1 className='page-title-text'>{t('skills')}</h1>
          <Button className='float-right-btn' type='primary' onClick={() => {
            setShowDrawer(true);
          }}>
            <Icon type='plus'/>
            {
              t('add_skill')
            }
          </Button>
      </Row>
      <Drawer
        title="Add skill"
        placement="right"
        closable={false}
        onClose={() => {
          setShowDrawer(false);
        }}
        visible={showDrawer}
      >
        <Input 
          size='large' 
          placeholder='Skill name' 
          value={newSkill}
          onChange={async (e) => {
            await setNewSkill(e.target.value);
          }}
          />
        <Button 
          className='add-skill-btn' 
          type='primary'
          onClick={async () => {
            if(newSkill!=''&&newSkill){
              await skillApi.addSkill({skillName: newSkill});
              setShowDrawer(false);
              setNewSkill('');
              loadData();
            }
          }}
        
        >{t('add_skill')}</Button>
      </Drawer>
      <Table 
          columns={
            [
              {
                title: t('skill_name'),
                dataIndex: 'skillName',
                key: 'skillName'
              },
              {
                title: t('action'),
                dataIndex: 'skillID',
                key: 'action',
                render: skillID => (
                  <div> 
                    <Button icon='delete' type='danger' onClick={ async () => {
                      await skillApi.deleteSkill(skillID);
                      loadData();
                    }}/>
                  </div>
                )
              }
            ]
          }

          dataSource={skillList ? skillList.map((skill, index) => ({
            skillName: skill.skillName,
            skillID: skill.skillID,
            key: index
          })): null}
        />
    </div>
  );
}

const mapStateToProps = (state) => ({
  language: state.appReducer.language  
}); 

const mapDispatchToProps = (dispatch) => ({

});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SkillsPage));