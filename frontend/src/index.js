/*
(Resource from blackboard)
Taken/Modified From: https://www.youtube.com/watch?v=R4AhvYORZRY  and    https://github.com/bradtraversy/mern-auth
*/

import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider} from 'react-router-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import store from './store';
import { Provider } from 'react-redux';
import Login from './routes/Login';
import Home from './routes/HomePage.js';
import Register from './routes/Register';
import LogOutPage from './routes/LogOutPage';
import PrivateRoute from './components/PrivateRoute';
import GetAllUsers from './routes/GetAllUsers';
import AddingRating from './routes/AddRatings.js';
import ProfileScreen from './routes/Profile.js';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App />}> 
      <Route index={true} path='/' element={<Home />}></Route>
      <Route path='/login' element={<Login />}></Route>
      <Route path='/register' element={<Register />}></Route>
      <Route path='/logout' element={<LogOutPage />}></Route>
      <Route path='/viewusers' element={<GetAllUsers />}></Route>
      
      <Route path = '' element={<PrivateRoute />}>
        <Route path='/profile' element={<ProfileScreen />}></Route>
        <Route path='/addrating' element={<AddingRating />}></Route>
      </Route>
    </Route>
  )
)
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <React.StrictMode>
      <RouterProvider router={ router } />
    </React.StrictMode>
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
