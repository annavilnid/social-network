import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
import {BrowserRouter} from "react-router-dom";
import store from './redux/redux-store';
import {Provider} from './StoreContext';

export const renderEntireTree = (state: any) => {
  console.log(state)
  ReactDOM.render(
    <BrowserRouter>
      <Provider store={store}>
      <App/>
      </Provider>
    </BrowserRouter>,

    document.getElementById('root')
  );
}

renderEntireTree(store.getState());

store.subscribe(() => {
  let state = store.getState()
  renderEntireTree(state);
})