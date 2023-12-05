import './App.css';
import { Component } from 'react';
import Main from './5.Share Component/MainComponent';
import { BrowserRouter } from 'react-router-dom';

class App extends Component {
  render() {
  return (
    <BrowserRouter>
    <div className="App">
        <Main/>
    </div>
    </BrowserRouter>
  );
}
}

export default App;
