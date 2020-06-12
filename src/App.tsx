import React from 'react';

import GlobalStyle from './styles/global';

import Home from './pages/Home';

const App: React.FC = () => {
  return (
    <>
      <Home />
      <GlobalStyle></GlobalStyle>
    </>
  );
};

export default App;
