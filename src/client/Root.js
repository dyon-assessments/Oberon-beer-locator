import React from 'react';
import {BrowserRouter, Route} from 'react-router-dom';

import App from './App';
import addBrewery from './pages/addBrewery/addBrewery';

const Root = (props) => {
  return (
    <BrowserRouter>
      <Route exact path="/" component={App} />
      <Route path="/addbrewery/" component={addBrewery} />
    </BrowserRouter>
  );
};

export default Root;
