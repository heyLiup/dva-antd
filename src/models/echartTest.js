import * as GET from '../services/echartTest.js'  
export default {
  namespace: 'echartTest',
  state: {
      period:"",
      period_in:""
  },
  reducers: {
    saveGetdata(state,action){
      // console.log(action.payload);
      return {...action.payload};
    },
  },
  effects: {
    *testGetdata({payload:data},{call,put,select}){
      const res=yield call(GET.getCliAnalysis,data);
      yield put({
        type:'saveGetdata',
        payload:res.data.result
      })
    }
  },
  subscriptions: {},
};
