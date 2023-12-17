/*
(Resource from blackboard)
Taken/Modified From: https://www.youtube.com/watch?v=R4AhvYORZRY  and    https://github.com/bradtraversy/mern-auth
*/

import { useState, useEffect } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { useUpdateUserMutation} from '../slices/usersApiSlice';
import { setCredentials } from '../slices/authSlice';

const ProfileScreen = () => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const dispatch = useDispatch();

  const { userInfo } = useSelector((state) => state.auth);

  const [updateProfile, { isLoading }] = useUpdateUserMutation();

  useEffect(() => {
    setName(userInfo.name);
    setEmail(userInfo.email);
  }, [userInfo.email, userInfo.name]);

  useEffect((updateProfile) =>{

  })

  const submitHandler = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error('Passwords do not match');
    } else {
      try {
        const res = await updateProfile({
          _id: userInfo._id,
          name,
          email,
          password,
        }).unwrap();
        console.log(res);
        dispatch(setCredentials(res));
        toast.success('Profile updated successfully');
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };
  return (
    <div>
        <form onSubmit={submitHandler}>
            <label htmlFor='Name' className='Name-Label'> Name </label>
            <input type='text' id='Name' name='Name' value={name} onChange={(e) => setName(e.target.value)}></input>
            <label htmlFor='Email' className='Email-Label'> Email </label>
            <input type='email' id='Email' name='Email' value={email} onChange={console.log('Not Allowed')}></input>
            <label htmlFor='Password' className='Password-Label'> Password </label>
            <input type='password' id='Password' name='Password' value={password} onChange={(e) => setPassword(e.target.value)}></input>
            <label htmlFor='Confirm-Password' className='Confirm-Password-Label'> Confirm Password </label>
            <input type='password' id='Confirm-Password' name='Confirm-Password' value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}></input>
            <input type='submit' value='Submit' className='Register-Submit'></input>
        </form>
    </div>
  );
};

export default ProfileScreen;