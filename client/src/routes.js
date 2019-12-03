import React, { useState, useEffect } from 'react'; 
import { BrowserRouter as Router, Route, Link, Switch, useLocation, withRouter} from 'react-router-dom';
import { connect } from 'react-redux';
import { DashboardPage, LoginPage, CreateUserPage } from './pages';
import { useTranslation } from 'react-i18next';
import { Layout } from 'antd';
import {LanguageToggle } from './components';
import logo from './assets/logo225.png';
const { Header, Footer, Sider, Content } = Layout;



const AppRouter = ({history}) => {
  const { t, i18n } = useTranslation();
  const [layoutVisible, setLayoutVisible] = useState(true);
  
  return (
    <Layout>
      <Header className={`${layoutVisible ? '' : 'hide'}`}>
        <img className='app-logo-navbar' alt='app-logo-navbar' src={logo}/>
        <span className='app-name'>{t('app_name')}</span>
        <div className='language-toggle'>
          <LanguageToggle/>
        </div>
      </Header>
      <Layout>
        <Sider className={`${layoutVisible ? '' : 'hide'}`}>
          Sider
        </Sider>
        <Content>
          <Router>
            <Switch>
              <Route path="/login" >
                <LoginPage setLayoutVisible={setLayoutVisible}/>
              </Route>
              <Route path='/create-user'>
                <CreateUserPage/>
              </Route>
              <Route path='/'>
                <DashboardPage/>
              </Route>
            </Switch>
          </Router>
        </Content>
      </Layout>
      <Footer className={`${layoutVisible ? '' : 'hide'}`}>
        Footer
      </Footer>
    </Layout>
      
  );
}

const mapStateToProps = (state) => ({
}); 

const mapDispatchToProps = (dispatch) => ({
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AppRouter);