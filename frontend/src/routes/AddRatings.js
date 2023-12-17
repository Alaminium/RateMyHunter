import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useAddRatingMutation } from '../slices/ratingsSlice';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { setCredentials } from '../slices/authSlice';

const AddingRating = () =>{
  const { userInfo } = useSelector((state) => state.auth);
  const [professor_name, setProfessorName] = useState('');
  const rater_email = userInfo.email;
  const [comment, setComment] = useState('');
  const [professor_rating, setProfessorRating] = useState(1);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [addRating, { isLoading }] = useAddRatingMutation();

  const submitHandler = async (e) => {

    e.preventDefault();
      try {
        const res = await addRating({ professor_name, rater_email, comment, professor_rating}).unwrap();
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }

      setProfessorName('');
      setComment('');
      setProfessorRating(1);
  };

    return(
        <div>
            <div id='register-container'>
                <form onSubmit={submitHandler}>
                    <label htmlFor='ProfessorName' className='ProfessorName-Label'> Professor Name </label>
                    <input type='text' id='ProfessorName' name='ProfessorName' value={professor_name} onChange={(e) => setProfessorName(e.target.value)}></input>
                    <label htmlFor='Comment' className='Comment-Label'> Comment </label>
                    <input type='text' id='Comment' name='Comment' value={comment} onChange={(e) => setComment(e.target.value)}></input>
                    <label htmlFor='Rating' className='Confirm-Password-Label'> Rate from 1 to 5</label>
                    <input type='number' id='Rating' name='Confirm-Password' value={professor_rating} onChange={(e) => setProfessorRating(e.target.value)} min={1} max={5}></input>
                    <input type='submit' value='Submit' className='AddRating-Submit'></input>
                </form>
            </div>
        </div>
    )
};

export default AddingRating;