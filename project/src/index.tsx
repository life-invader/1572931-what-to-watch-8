import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app/app';

const movieInfo = {
  name: 'Macbeth',
};

ReactDOM.render(
  <React.StrictMode>
    <App name={movieInfo.name} />
  </React.StrictMode>,
  document.getElementById('root'));
