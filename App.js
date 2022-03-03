import React from 'react';
import Main from './components/MainComponent';
import { Provider } from 'react-redux';                   
import { ConfigureStore } from './redux/configureStore';

const store = ConfigureStore();

export default function App() {       //the provider store passing to store componenet gives Main componenet and it's child componenets ability to connect to redux store
  return (
    <Provider store ={store}>     
      <Main />
    </Provider>
  );
}
