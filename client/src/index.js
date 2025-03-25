import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from "react-redux";
import App from './App';
// import App from "./showwiew/App";
import reportWebVitals from './reportWebVitals';
import store from "./redux/store";


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // loading lại để kiểm tra nên gây ra load
  <React.StrictMode> 
    {/* chúng ta có thể cung cấp store cho các thành phần React của mình */}
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();