import React, {useState, useEffect} from 'react';
import { Link, useParams, Navigate } from 'react-router-dom';
import { useConfirmUserMutation } from '../redux/api/usersApiSlice';
import { useSelector } from 'react-redux';
import {toast} from 'react-toastify';
import Loader from './Loader';

const ConfirmAccount = () => {
  const [confirmAccount, setConfirmAccount] = useState(false);
  const [confirmUser, {isLoading}] = useConfirmUserMutation();

  const params = useParams();
  const {id} = params;

  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    const confirmedAccount = async () => {
      try {
        await confirmUser(id);
        setConfirmAccount(true);
      } catch (error) {
        toast.error(error?.data?.message || error.message);
      }
    }
    confirmedAccount();
  }, [])

  return (
    <>
      { !confirmAccount && !userInfo.isConfirmed ? 
        <div className='p-4 flex flex-col items-center justify-center'>
          <h2 className='text-pink-500 text-4xl font-semibold mx-auto text-center mt-[10rem]'>Your Account Has Been Confirmed!!</h2>
          <Link className='mt-[5rem] text-teal-500 text-2xl hover:text-teal-700 hover:scale-110 hover:underline transition-transform'>Now You Can Shop.</Link>
        </div>  
        : (<Navigate to="/" replace />)
      }
      
    </>
  )
}

export default ConfirmAccount