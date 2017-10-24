import React from 'react';
import { connect } from 'dva';
import styles from './Login.css';
import WrappedNormalLoginForm from '../components/LoginForm.js'

class Login extends React.Component {
  constructor(props){
    super(props)
  }

  componentDidMount(){
    const breadcrumbData = {
      breadcrumb:[
        {
          name:'首页',
          path:'/'
        },{
          name:'login'
        }
      ]
    };
    this.props.dispatch({
      type:'common/changeBreadcrumb',
      payload:breadcrumbData
    })
  }
  render(){
     return (
        <WrappedNormalLoginForm />
    );
  }
}
function mapStateToProps({common}) {
  return {common};
}

export default connect(mapStateToProps)(Login);
