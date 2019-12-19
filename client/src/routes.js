/* eslint-disable react/prop-types */

import React, { useState, 
  // useEffect 
} from 'react'; 
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import { DashboardPage, LoginPage, CreateUserPage, UsersPage, SkillsPage, UserDetailPage, ContractsPage } from './pages';
import { useTranslation } from 'react-i18next';
import { Layout, Menu, Icon, Button } from 'antd';
import {LanguageToggle } from './components';
// import logo from './assets/logo225.png';
import { logout } from './reducers/auth.reducer';
const { Header, 
  // Footer, 
  Sider, Content } = Layout;
// const { SubMenu } = Menu;


const AppRouter = ({logout}) => {
  const { t } = useTranslation();
  const [showLayout, setshowLayout] = useState(true);
  const [collapsed, setCollapsed] = useState(true);
  const [tab, setTab] = useState(null);
  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  return (
    <Router>
      <Layout>
        <Header className={`${showLayout ? '' : 'hide'}`}>
          <Button className='menu-button' type='link' onClick={toggleCollapsed}>
            <Icon type={collapsed ? 'menu' : 'close'} style={{fontSize:'32px', margin:'4px', }}/>
          </Button>
          
          <span className='app-name'>{t('app_name')}</span>
          
          <div className='header-right'>
            <div className='language-toggle'>
              <LanguageToggle/>
            </div>

            <div className={`float-right-btn ${showLayout ? '' : 'hide'}`}>
              <Link to='/login'>
                <Button type='primary' onClick={() => {
                  logout();
                }}>{t('logout')}</Button>
              </Link>
            </div>
        
          </div>

        </Header>
        <Layout className={`${showLayout ? 'width-80': 'full-width'}`}>
          <Sider className={`${showLayout ? '' : 'hide'}`} trigger={null} collapsible collapsed={collapsed}>
            <div>
              <Menu
                defaultSelectedKeys={[tab]}
                mode="inline"
                theme="dark"
                inlineCollapsed={collapsed}
              >
                <Menu.Item key="/">
                  <Link to='/'>
                    <Icon type="dashboard" />
                    <span>{t('dashboard')}</span>
                  </Link>
                </Menu.Item>
                <Menu.Item key="/users">
                  <Link to='/users'>
                    <Icon type="user" />
                    <span>{t('users')}</span>
                  </Link>
                </Menu.Item>
                <Menu.Item key="/skills">
                  <Link to="/skills">
                    <Icon type="thunderbolt" />
                    <span>{t('skills')}</span>
                  </Link>
                </Menu.Item>
                <Menu.Item key="/contracts">
                  <Link to="/contracts">
                    <Icon type="file" />
                    <span>{t('contracts')}</span>
                  </Link>
                </Menu.Item>
                <Menu.Item key="/chats">
                  <Link to="/chats">
                    <Icon type="mail" />
                    <span>{t('chats')}</span>
                  </Link>
                </Menu.Item>
              </Menu>
            </div>
          </Sider>
          <Content>
            <div className={showLayout ? 'content-wrapper': ''}>
              <Switch>
                <Route path="/login" >
                  <LoginPage setshowLayout={setshowLayout} setTab={setTab}/>
                </Route>
                <Route exact path='/users/create-admin'>
                  <CreateUserPage setshowLayout={setshowLayout} setTab={setTab}/>
                </Route>
                <Route exact path='/users'>
                  <UsersPage setshowLayout={setshowLayout} setTab={setTab}/>  
                </Route>
                <Route path='/skills'>
                  <SkillsPage setshowLayout={setshowLayout} setTab={setTab}/>  
                </Route>
                <Route path={'/users/:email'}>
                  <UserDetailPage setshowLayout={setshowLayout} setTab={setTab}/>
                </Route>
                <Route path={'/contracts'}>
                  <ContractsPage setshowLayout={setshowLayout} setTab={setTab}/>
                </Route>
                <Route path='/'>
                  <DashboardPage setshowLayout={setshowLayout} setTab={setTab}/>
                </Route>
              </Switch>
            </div>
          </Content>
        </Layout>
      </Layout>
    </Router>    
  );
};

const mapStateToProps = () => ({
}); 

const mapDispatchToProps = (dispatch) => ({
  logout: () => dispatch(logout())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AppRouter);