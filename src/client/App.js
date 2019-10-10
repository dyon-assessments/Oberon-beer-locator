import React from 'react';
import './app.css';
import Header from './components/Header/Header';
import Search from './components/Search/Search';

class App extends React.Component {

  render() {
    return (
      <div>
        <Header/>
        <Search/>
      </div>
    );
  }
}

export default App;
