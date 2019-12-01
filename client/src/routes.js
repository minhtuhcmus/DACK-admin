import React from 'react'; 
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import { DashboardPage, LoginPage, CreateUserPage } from './pages';
import { useTranslation } from 'react-i18next';
const AppRouter = () => {
  const { t, i18n } = useTranslation();
  return (
      <Router>
        <Switch>
          <Route path="/login">
            <LoginPage t={t} i18n={i18n}/>
          </Route>
          <Route path='/create-user'>
            <CreateUserPage t={t} i18n={i18n}/>
          </Route>
          <Route path='/'>
            <DashboardPage t={t} i18n={i18n}/>
          </Route>
        </Switch>
      </Router>
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