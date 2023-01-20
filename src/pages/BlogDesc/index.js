import React, { useEffect, useState } from 'react'
import { toast } from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { GetBlogById } from '../../apicalls/blogs';
import Button from '../../components/Button';
import { HideLoading, ShowLoading } from '../../redux/loadersSlice';
import ReactHtmlParser from 'react-html-parser';
import draftToHtml from 'draftjs-to-html';
import moment from 'moment';

function BlogDescription() {
    const [blog, setBlog] = useState(null);
    const { currentUser } = useSelector((state) => state.usersReducer);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {id} = useParams();

    const getData = async () => {
      try {
        dispatch(ShowLoading());
        const response = await GetBlogById(id);
        if(response.success) {
          console.log(response.data)
          setBlog(response.data);
        } else {
          toast.error(response.message);
        }
        dispatch(HideLoading());
      } catch (error) {
        dispatch(HideLoading());
      }
    }
  
    useEffect(() => {
      getData();
    }, []);

  return (
    blog && (
      <div className='p-2 flex flex-col gap-5'>
        {currentUser?._id === blog?.user?._id && (
          <div className='flex justify-end gap-5'>
            <Button onClick={() => {}} title='Delete' variant='primary-outlined'/>
            <Button onClick={() => navigate(`/edit-blog/${blog?._id}`)} title='Edit' />
          </div>
        )}
        <h1 className='text-3xl font-bold text-primary'>{blog?.title}</h1>
        <hr />
        <h1 className='font-bold text-2xl'>{blog?.description}</h1>
        <div>
          {ReactHtmlParser(draftToHtml(JSON.parse(blog?.content)))}
        </div>

        <hr />

        <div className='flex justify-between items-center'>
        <div>
          <h1>
            Posted By :{blog.user.name}
          </h1>
          <h1>
            Posted On : {moment(blog.createdAt).format('DD-MM-YYYY hh:mm:ss')}
          </h1>
        </div>

        <div className='flex gap-5 items-center'>
          <div className='flex gap-1 items-center'>
            <i className="ri-heart-line"></i>
            <span>{blog.likesCount}</span>
          </div>
          <div className='flex gap-1 items-center'>
            <i className="ri-chat-1-line"></i>
            <span>{blog.commentsCount}</span>
          </div>
          <div className='flex gap-1 items-center'>
          <i className="ri-share-forward-line"></i>
            <span>{blog.sharesCount}</span>
          </div>
        </div>

      </div>

      </div>
    )
  )
}

export default BlogDescription