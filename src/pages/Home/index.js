import React from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/Button';

function Home() {
  const { currentUser } = useSelector((state) => state.usersReducer);
  const navigate = useNavigate();
  return (
    <div>
      <div className='flex justify-between'>
        <h1 className='text-primary uppercase text-2xl font-bold'>
            Welcome, { currentUser.name}!
        </h1>
        <Button title='Add Blog' variant='primary-outlined'
          onClick={() => navigate('/add-blog')}
        />
      </div>
    </div>
  );
}

export default Home 