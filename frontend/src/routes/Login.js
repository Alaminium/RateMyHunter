/*
(Resource from blackboard)
Taken/Modified From: https://www.youtube.com/watch?v=R4AhvYORZRY  and    https://github.com/bradtraversy/mern-auth
*/

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useLoginMutation } from '../slices/usersApiSlice';
import { setCredentials } from '../slices/authSlice';
import { toast } from 'react-toastify';
import './Login.css';

const Login = () =>{
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const submitHandler = async (e) =>{
        e.preventDefault();
        try {
            const res = await login({ email, password }).unwrap();
            dispatch(setCredentials({ ...res }));
            navigate('/');
          } catch (err) {
            toast.error(err?.data?.message || err.error);
        }
    };

    const [login, { isLoading }] = useLoginMutation();

    const { userInfo } = useSelector((state) => state.auth);

    useEffect(() => {
        if (userInfo) {
          navigate('/');
        }
      }, [navigate, userInfo]);

    return(
        <div>
            <div id='login-container'>
                <form onSubmit={submitHandler}>
                    <label htmlFor='Email' className='Email-Label'> Email </label>
                    <input type='email' id='Email' name='Email' value={email} onChange={(e) => setEmail(e.target.value)}></input>
                    <label htmlFor='Password' className='Password-Label'> Password </label>
                    <input type='password' id='Password' name='Password' value={password} onChange={(e) => setPassword(e.target.value)}></input>
                    <input type='submit' value='Submit' className='Register-Submit'></input>
                </form>
            </div>
        </div>
    )
}

export default Login;
