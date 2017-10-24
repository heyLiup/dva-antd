import dva from 'dva';
import './index.css';
import createLoading from 'dva-loading';
import { browserHistory } from 'dva/router';
import {message} from 'antd';
// 1. Initialize
const app = dva({
    initialState: {
         products: [
           { name: 'dva', id: 1,key:1 },
           { name: 'antd', id: 2 ,key:2},
         ],
       },
    history: browserHistory,
    onError(e) {
      message.error(e.message, 3);
    },
  });

app.model(require("./models/users"));

app.model(require("./models/echartTest"));

app.model(require("./models/common"));

app.model(require("./models/Form"));

// 2. Plugins
// app.use({});
app.use(createLoading({effects: true}));
// 3. Model
// app.model(require('./models/example'));

// 4. Router
app.router(require('./router'));

// 5. Start
app.start('#root');
