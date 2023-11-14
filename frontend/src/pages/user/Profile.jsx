import React, {useState, useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {toast} from 'react-toastify';
import Loader from '../../components/Loader';
import { setCredentials } from '../../redux/features/auth/authSlice';
import { Link } from 'react-router-dom';
import { useProfileMutation } from '../../redux/api/usersApiSlice';

const Profile = () => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const { userInfo } = useSelector((state) => state.auth);

    const [updateProfile, { isLoading }] = useProfileMutation();
    
    useEffect(() => {
        setUsername(userInfo.username);
        setEmail(userInfo.email);
    }, [userInfo.email, userInfo.username]);

    const dispatch = useDispatch();

    const HandlerSubmit = async (e) => {
        e.preventDefault();
        if(password !== confirmPassword){
            toast.error('Passwords Should Match');
            return
        }
        try {
            const res = await updateProfile({
                _id: userInfo._id, 
                username, 
                email,
                password
            }).unwrap();
            dispatch(setCredentials({...res}));
            toast.success('Profile Updated');
            console.log(res);
        } catch (error) {
            toast.error(error?.data?.message || error.message);
        }
        
    }

    return (
        <div className='mx-auto p-4 w-[100vw] h-[100vh] bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-orange-400 to-sky-400'>
            <div className="flex flex-col justify-center items-center md:flex md:space-x-4 mt-[10rem]">
                <h2 className='text-2xl font-semibold mb-4'>Update Profile</h2>
                <form onSubmit={HandlerSubmit} className='w-[500px]'>
                    <div className="mb-4">
                        <label className='block text-black mb-2'>Username</label>
                        <input type="text" placeholder='Enter new username' className='p-4 border border-teal-900 rounded w-full'
                            value={username}
                            onChange={e=> setUsername(e.target.value)}
                        />
                    </div>
                    <div className="mb-4">
                        <label className='block text-black mb-2'>Email</label>
                        <input type="email" placeholder='Enter new email' className='p-4 border border-teal-900 rounded w-full'
                            value={email}
                            onChange={e=> setEmail(e.target.value)}
                        />
                    </div>
                    <div className="mb-4">
                        <label className='block text-black mb-2'>Password</label>
                        <input type="password" placeholder='Enter new password min: 8 characters' className='p-4 border border-teal-900 rounded w-full'
                            autoComplete='off'
                            value={password}
                            onChange={e=> setPassword(e.target.value)}
                        />
                    </div>
                    <div className="mb-4">
                        <label className='block text-black mb-2'>Confirm Your Password</label>
                        <input type="password" placeholder='Both Passwords Should Match'    className='p-4 border border-teal-900 rounded w-full'
                            autoComplete='off'
                            value={confirmPassword}
                            onChange={e=> setConfirmPassword(e.target.value)}
                        />
                    </div>
                    <div className="flex justify-between">
                        <button type='submit' 
                            className='border bg-teal-500 text-white py-2 px-4 rounded hover:bg-teal-700'
                            disabled={isLoading}
                        >
                            Update
                        </button>
                        <Link to='/user-orders' 
                            className='border bg-teal-500 text-white py-2 px-4 rounded hover:bg-teal-700'>
                            My Orders
                        </Link>
                    </div>
                </form>
                {isLoading && <Loader/>}
            </div>
        </div>
    )
}

export default Profile