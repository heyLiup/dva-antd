import * as usersService from '../services/users.js';

export default {
  namespace: 'users',
  state: {
    list: [],
    total: 0,
  },
  reducers: {
    save(state, { payload: { data: list, total } }) {
      return { ...state, list, total };
    },

  },
  effects: {
    *fetch({ payload: { page } }, { call, put }) {
      const { data, headers } = yield call(usersService.fetch, { page });
      yield put({ type: 'save', payload: { data, total: headers['x-total-count'] } });
    },
    *remove({payload:id},{call,put,select}){
      console.log(id+"$$")
      yield call(usersService.remove,id);
      const page=yield select(state=>state.users.page);
      yield put({type:'fetch',payload:{page}});
    },
    *patch({payload:{id,values}},{call,put,select}){
      yield call(usersService.patch,id,values);
      const page=yield select(state=>state.users.page);
      yield put({type:'fetch',payload:{page}});
    }
  },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname, search }) => {
          var reg=pathname.match(/\d/g);
          var page=reg?reg[0]:1;
          if(reg){
            if (pathname === `/users/${page}`) {
              dispatch({ type: 'fetch', payload: {page} });
            }
          }else{
            if (pathname === `/users`) {
              dispatch({ type: 'fetch', payload: {page} });
            }
          }
       
      });
    },
  },
};