import React, { useEffect } from 'react'
import { toast } from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { GetUser } from '../apicalls/users';
import { HideLoading, ShowLoading } from '../redux/loadersSlice';
import { SetCurrentUser } from '../redux/usersSlice';

function ProtectedRoute({children}) {
    const { currentUser } = useSelector((state) => state.usersReducer);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const getUser = async ()=> {
        
        try {
            dispatch(ShowLoading());
            const response = await GetUser();
            if(response.success){
                dispatch(SetCurrentUser(response.data));
            } else {
                toast.error(response.message)
            }
            dispatch(HideLoading());
        } catch (error) {
            dispatch(HideLoading());
            toast.error(error.message)
        }
    };

    useEffect(()=> {
        if(localStorage.getItem('token')) {
            getUser()
        } else {
            navigate('/login')
        }
    }, [])

  return( currentUser && (
        <div className='p-5'>
            <div className='bg-primary w-full p-5 justify-between flex rounded items-center'>
                
                <h1 className='text-white text-2xl font-bold uppercase cursor-pointer'>
                    The Flash Blog
                </h1>

                <div className='bg-white rounded p-2 flex gap-2 items-center font-semibold text-primary'>

                    <h1 className='underline uppercase text-sm cursor-pointer'>
                        {currentUser.name}
                    </h1>
                    <i className="ri-notification-line cursor-pointer"></i>
                    <i className="ri-logout-circle-r-line ml-5 cursor-pointer"></i>

                </div>
            </div>
            <div className='mt-5'>{children}</div>
        </div>
    )
  )
}

export default ProtectedRoute