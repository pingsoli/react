import React from 'react';
import { connect } from 'dva';
import { Table, Pagination, Popconfirm, Button } from 'antd';
import { routerRedux } from 'dva/router';
import styles from './Users.css';
import { PAGE_SIZE } from '../../constants';
import UserModal from './UserModal';

function Users({ dispatch, list: dataSource, total, page: current, loading }) {

  function deleteHandler(id) {
  	dispatch({
      type: 'users/remove',
      payload: id,
    });
  }

  function createHandler(values) {
    dispatch({
      type: 'users/create',
      payload: values,
    })
  }

  function editHandler(id, values) {
    dispatch({
      type: 'users/patch',
      payload: { id, values },
    });
  }

  function pageChangeHandler(page) {
    dispatch(routerRedux.push({
      pathname: '/users',
      query: { page },
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
  	  key: 'website'
  	}, 
  	{
  	  title: 'Operation',
  	  dataIndex: 'operation',
  	  key: 'operation',
  	  render: (text, record ) => (
  	  	<span className={styles.operation}>
          <UserModal record={record} onOk={editHandler.bind(null, record.id)}>
            <a>Edit</a>
          </UserModal>
  	  	  <Popconfirm title="confirm to delete? " onConfirm={deleteHandler.bind(null, record.id)} >
 			      <a href="">Delete</a>
  	  	  </Popconfirm>
  	  	</span>
  	  ),
  	},
  ];


  return (
    <div className={styles.normal}>
   	  <div>
        <div className={styles.normal}>
          <UserModal record={{}} onOk={createHandler}>
            <Button type="primary">Create User</Button>
          </UserModal>
        </div>
   	    <Table 
   	      columns={columns}
   	      dataSource={dataSource}
          loading={loading}
   	      rowKey={ record => record.id }
   	      pagination={false}
   	    />
   	    <Pagination 
   	      className="ant-table-pagination"
   	      total={total}
   	      current={current}
   	      pageSize={PAGE_SIZE}
          onChange={pageChangeHandler}
   	    />
   	  </div>
    </div>
  );
}

function mapStateToProps(state) {
  const { list, total, page } = state.users;
  return {
    loading: state.loading.models.users,
    list,
  	total,
  	page,
  };
}

export default connect(mapStateToProps)(Users);
