import React from 'react';
import { Router, Route } from 'dva/router';
import Users from './routes/Users'
import IndexPage from './routes/IndexPage';

// const cached = {};

// function registerModel(app, model) {
//   if (!cached[model.namespace]) {
//   	app.model(model);
//   	cached[model.namespace] = 1;
//   }
// }


function RouterConfig({ history }) {
  return (
    <Router history={history}>
      <Route path="/">
        <Route path="users" component={Users} />
      </Route>
    </Router>
  );
}

export default RouterConfig;
