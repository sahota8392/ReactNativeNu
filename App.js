import React from 'react';
import Main from './components/MainComponent';
import { Provider } from 'react-redux';                   
import { ConfigureStore } from './redux/configureStore';
import { PersistGate } from 'redux-persist/es/integration/react';
import Loading from './components/LoadingComponent';


const {persistor, store } = ConfigureStore();

export default function App() {       //the provider store passing to store componenet gives Main componenet and it's child componenets ability to connect to redux store
  return (
    <Provider store={store}>
      <PersistGate
          loading={<Loading />}       //keeping the favorite saved when you reload app even
          persistor={persistor}>
          <Main />
      </PersistGate>
  </Provider>     
  );
}
