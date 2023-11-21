import React, {useState, useEffect} from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {useSelector, useDispatch} from 'react-redux';
import { useLoginMutation } from '../../redux/api/usersApiSlice';
import { setCredentials } from '../../redux/features/auth/authSlice';
import { toast } from 'react-toastify';
import Loader from '../../components/Loader';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [login, {isLoading}] = useLoginMutation();
    const {userInfo} = useSelector(state => state.auth);
    const {search} = useLocation();
    const sp = new URLSearchParams(search);
    const redirect = sp.get('redirect') || '/';
    useEffect(() => {
        if(userInfo) {
            navigate(redirect)
        }
    }, [navigate, redirect, userInfo]);

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            const res = await login({email, password}).unwrap();
            dispatch(setCredentials({...res}));
        } catch (error) {
            toast.error(error?.data?.message || error.message);
        }
    }

    return (
        <>
            <section className='flex flex-wrap w-[100vw] h-[100vh] bg-[url(https://images.unsplash.com/photo-1679136342027-cfec22cc22c2?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)] bg-cover'>
                <div className="w-[40%] pl-[10rem] pt-10">
                    <h1 className='text-2xl font-semibold mb-4'>Sign In</h1>
                    <form onSubmit={submitHandler} className='container w-[40rem]' method='POST'>
                        <div className='my-[2rem]'>
                            <label htmlFor="email" className='block text-black text-lg'>Email</label>
                            <input type="email" id='email' 
                                className='mt-1 p-2 border rounded w-full text-sm' placeholder='example@example.com'
                                value={email}
                                onChange={e=> setEmail(e.target.value)}
                            />
                        </div>
                        <div className='my-[2rem]'>
                            <label htmlFor="password" className='block text-black text-lg'>Password</label>
                            <input type="password" id='password' 
                                className='mt-1 p-2 border rounded w-full text-sm' placeholder='Min 8 characters'
                                autoComplete='off'
                                value={password}
                                onChange={e=> setPassword(e.target.value)}
                            />
                        </div>
                        <button disabled={isLoading} type='submit' 
                            className='bg-teal-500 text-white px-4 py-2 rounded cursor-pointer my-[1rem] hover:bg-teal-700 hover:scale-110 transition-transform'
                        >
                            {isLoading ? 'Signing In...' : 'Sign In'}
                        </button>
                        {isLoading && <Loader/>}
                    </form>
                    <div className='mt-4'>
                        <p className='text-lg text-white'>New Customer? {" "}
                            <Link to={redirect ? `/register?redirect=${redirect}` : '/register'}
                                className='text-teal-500 hover:underline transition-transform'
                            >Register</Link>
                        </p>
                        
                    </div>
                </div>
                
            </section>
        </>
    )
}

export default Login