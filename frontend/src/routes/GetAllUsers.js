import { useState, useEffect } from "react";
import { useGetUsersByUsernameQuery } from '../slices/usersApiSlice';
import { useGetRatingsByProfessorQuery } from "../slices/ratingsSlice";

const GetAllUsers = () => {
  const [professor_name, setName] = useState('');
  const { data: userArray, error, isLoading, refetch } = useGetRatingsByProfessorQuery(professor_name, {skip: professor_name === '',});

  const submitHandler = (e) => {
    e.preventDefault();
    if(isLoading) {
      refetch();
    }
  };

  const handleNameChange = (e) => {
    const newName = e.target.value;
    setName(newName);
  };

  useEffect(() => {
    if (professor_name !== '') {
      refetch({ professor_name });
    }
  }, [professor_name, refetch]);

  return (
    <div>
      <div id='getusers-container'>
        <form onSubmit={submitHandler}>
          <label htmlFor='Name' className='Name-Label'> Name </label>
          <input
            type='text'
            id='Name'
            name='Name'
            value={professor_name}
            onChange={handleNameChange}
          ></input>
          <input type='submit' value='Submit' className='getusers-Submit'></input>
        </form>
      </div>

      {isLoading && <p>Loading...</p>}

      {error && (
        <div>
          <p>Error fetching users: {error.message}</p>
        </div>
      )}

      {userArray && userArray.length > 0 && (
        <div>
          <h2>Users with the specified username:</h2>
          <ul>
            {userArray.map((user) => (
              <div key={user._id}>
                <h1>{user.professor_name}</h1>
                <p>{user.comment}</p>
              </div>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default GetAllUsers;