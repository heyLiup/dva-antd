import React from 'react';
import { connect } from 'dva';
import styles from './IndexPage.css';
import Menu from '../components/Menu.js'
import { Row, Col } from 'antd';
import CustomBreadcrumb from '../components/Breadcrumb.js'
import Option from '../components/App.js'

function IndexPage(props) {
  return (
    <Row>
      <Col span={24}>
       <CustomBreadcrumb data={props.common.breadcrumb}/>
      </Col>
      <Col span={8}>
        <Menu />
      </Col>
      <Col span={16}>
       {props.children||<Option/>}
      </Col>
    </Row>
  );
}

IndexPage.propTypes = {
};
function mapStateToProps({ common }) {
  return {common};
}
export default connect(mapStateToProps)(IndexPage);
