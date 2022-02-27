import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

//  import the AuthContext Provider => destructured

import { AuthContextProvider } from './context/AuthContext'

// CSS

import './index.css';

// #2 Wrap the App Component With the AuthContextProvider

// #3 no need to add value prop to the AuthContextProvider here because it is being passed from the AuthContext.js file down as a prop

ReactDOM.render(
  <React.StrictMode>
    <AuthContextProvider>
      <App />
    </AuthContextProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

