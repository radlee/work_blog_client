import React, { useEffect, useState } from 'react'
import { toast } from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { GetAllBlogs } from '../../apicalls/blogs';
import Button from '../../components/Button';
import { HideLoading, ShowLoading } from '../../redux/loadersSlice';

function Home() {
  const [blogs, setBlogs] = useState([]);
  const { currentUser } = useSelector((state) => state.usersReducer);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const getData = async () => {
    try {
      dispatch(ShowLoading());
      const response = await GetAllBlogs();
      if(response.success) {
        setBlogs(response.data);
      } else {
        toast.error(response.message);
      }
      dispatch(HideLoading());
    } catch (error) {
      dispatch(HideLoading());
    }
  }

  useEffect(()=> {
    getData()
  }, []);
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