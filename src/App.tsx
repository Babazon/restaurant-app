import React from 'react';
import {StatusBar} from 'react-native';
import Header from './components/Header';
import Welcome from './components/Welcome';
import Page from './components/Page';

const App: () => JSX.Element = () => {
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <Page>
        <Header />
        <Welcome />
      </Page>
    </>
  );
};

export default App;
