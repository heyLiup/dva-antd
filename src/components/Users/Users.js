import React from 'react';
import { connect } from 'dva';
import { Table, Pagination, Popconfirm } from 'antd';
import styles from './Users.css';
import { routerRedux } from 'dva/router';
import { PAGE_SIZE } from '../../../constants.js';

function Users({ dispatch,list: dataSource, total,loading, page: current }) {
  function deleteHandler(id) {
    console.warn(`TODO: ${id}`);
    dispatch({
      type:'users/remove',
      payload:id,
    });
  }

  function changePage(page){
    dispatch(routerRedux.push({
      pathname:`/users/${page}`,
    }));
  }

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: text => <a href="">{text}</a>,
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Website',
      dataIndex: 'website',
      key: 'website',
    },
    {
      title: 'Operation',
      key: 'operation',
      render: (text, { id }) => (
        <span className={styles.operation}>
          <a href="">Edit</a>
          <Popconfirm title="Confirm to delete?" onConfirm={deleteHandler.bind(null, id)}>
            <a href="">Delete</a>
          </Popconfirm>
        </span>
      ),
    },
  ];

  return (
    <div className={styles.normal}>
      <div>
        <Table
          columns={columns}
          dataSource={dataSource}
          loading={loading}
          rowKey={record => record.id}
          pagination={false}
        />
        <Pagination
          className="ant-table-pagination"
          total={total}
          current={current}
          pageSize={PAGE_SIZE}
          onChange={changePage}
        />
      </div>
    </div>
  );
}

function mapStateToProps(state) {
  console.log(state.users);
  const { list, total, page } = state.users;
  return {
    loading: state.loading.models.users,
    list,
    total,
    page,
  };
}

export default connect(mapStateToProps)(Users);