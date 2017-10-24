import React from 'react';
import { Router, Route, IndexRedirect } from 'dva/router';
import IndexPage from './routes/IndexPage';

// import Users from "./routes/Users.js";

// import Form from "./routes/Form.js";

// import Login from "./routes/Login.js";

// import Regist from "./routes/Regist.js";


const Users = (location, callback) => {
  require.ensure([], require => {callback(null,
    require('./routes/Users.js'))}, 'Users')
};

const Form = (location, callback) => {
  require.ensure([], require => {callback(null,
    require('./routes/Form.js'))}, 'Form')
};


const Login = (location, callback) => {
  require.ensure([], require => {callback(null,
    require('./routes/Login.js'))}, 'Login')
};

const Regist = (location, callback) => {
  require.ensure([], require => {callback(null,
    require('./routes/Regist.js'))}, 'Regist')
};

const WrappedNormalLoginForm = (location, callback) => {
  require.ensure([], require => {callback(null,
    require('./components/LoginForm.js'))}, 'WrappedNormalLoginForm')
};

const Option = (location, callback) => {
  require.ensure([], require => {callback(null,
    require('./components/App.js'))}, 'Option')
};



function RouterConfig({ history }) {
  return (
    <Router history={history}>
      <Route path="/" component={IndexPage}>
        <Route path="Users" getComponent={Users} />
        <Route path="Form" getComponent={Form} />
        <Route path="Login" getComponent={Login} />
        <Route path="Regist" getComponent={Regist} />
        <Route path="WrappedNormalLoginForm" getComponent={WrappedNormalLoginForm} />
      </Route>
    </Router>
  );
}

export default RouterConfig;
