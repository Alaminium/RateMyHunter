/*
(Resource from blackboard)
Taken/Modified From: https://www.youtube.com/watch?v=R4AhvYORZRY  and    https://github.com/bradtraversy/mern-auth
*/

import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRegisterMutation } from '../slices/usersApiSlice';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { setCredentials } from '../slices/authSlice';
import './Register.css';

const Register = () =>{
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [register, { isLoading }] = useRegisterMutation();

  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    if (userInfo) {
      navigate('/');
    }
  }, [navigate, userInfo]);

  const submitHandler = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error('Passwords do not match');
    } else {
      try {
        const res = await register({ name, email, password }).unwrap();
        dispatch(setCredentials({ ...res }));
        console.log("Submit button pressed")
        navigate('/');
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };

    return(
        <div>
            <div id='register-container'>
                <form onSubmit={submitHandler}>
                    <label htmlFor='Name' className='Name-Label'> Name </label>
                    <input type='text' id='Name' name='Name' value={name} onChange={(e) => setName(e.target.value)}></input>
                    <label htmlFor='Email' className='Email-Label'> Email </label>
                    <input type='email' id='Email' name='Email' value={email} onChange={(e) => setEmail(e.target.value)}></input>
                    <label htmlFor='Password' className='Password-Label'> Password </label>
                    <input type='password' id='Password' name='Password' value={password} onChange={(e) => setPassword(e.target.value)}></input>
                    <label htmlFor='Confirm-Password' className='Confirm-Password-Label'> Confirm Password </label>
                    <input type='password' id='Confirm-Password' name='Confirm-Password' value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}></input>
                    <input type='submit' value='Submit' className='Register-Submit'></input>
                </form>
            </div>
        </div>
    )
};

export default Register;