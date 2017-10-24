import React from 'react';
import { connect } from 'dva';
import UsersComponent from '../components/Users/Users.js'
class Users extends React.Component {
  render(){
      return (
          <UsersComponent />
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
        name:"users"
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

export default connect(mapStateToProps)(Users);
