import dva from 'dva';
import './index.css';
import { useRouterHistory } from 'dva/router';
import { createHashHistory } from 'history';
import createLoading from 'dva-loading';


// 1. Initialize
const app = dva({
  history: useRouterHistory(createHashHistory)({ queryKey: false })
});

// 2. Plugins
app.use(createLoading());

// 3. Model
// app.model(require('./models/example'));
app.model(require('./models/users'));

// 4. Router
app.router(require('./router'));

// 5. Start
app.start('#root');
