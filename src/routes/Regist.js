import React from 'react';
import { connect } from 'dva';
import styles from './Regist.css';
import WrappedRegistrationForm from '../components/Regist.js'

class Regist extends React.Component {
    constructor(props){
      super(props)
    }
    render(){
       return (
            <WrappedRegistrationForm />
        );
    }
    componentDidMount(){
      const breadData={
      breadcrumb:[
        {
          name:'首页',
          path:'/'
        },
        {
          name:"regist",
          path:'/'
        },
        {
          name:"regist"
        }
      ]}
      this.props.dispatch({
        type:"common/changeBreadcrumb",
        payload:breadData
      })
    }
      
  
 
}

function mapStateToProps({common}) {
  return {common};
}

export default connect(mapStateToProps)(Regist);
