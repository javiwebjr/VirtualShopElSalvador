import React, {useState, useEffect} from 'react';
import {FaTrash, FaEdit, FaCheck, FaTimes} from 'react-icons/fa';
import Loader from '../../components/Loader';
import {toast} from 'react-toastify';
import Message from '../../components/Message'
import { useGetUsersQuery, useDeleteUserMutation, useUpdateUserMutation } from '../../redux/api/usersApiSlice';
import AdminMenu from './AdminMenu';
import Navigation from '../auth/Navigation';
import Navbar from '../../components/Navbar';

const UserList = () => {
    const {data: users, refetch, isLoading, error} = useGetUsersQuery();
    const [updateUser] = useUpdateUserMutation();
    const [deleteUser] = useDeleteUserMutation();
    const [editableUserId, setEditableUserId] = useState(null);
    const [editUsername, setEditUsername] = useState('');

    const deleteHandler = async (id) => {
        if(window.confirm('Are You Sure To Delete This User?')){
            try {
                await deleteUser(id)
            } catch (error) {
                toast.error(error.data.message || error.error)
            }
        }
    }

    const toggleEdit = async (id, username) => {
        setEditableUserId(id);
        setEditUsername(username);
    }

    const updateHandler = async (id) => {
        try {
            await updateUser({
                userId: id,
                username: editUsername
            });
            setEditableUserId(null);
            refetch();
        } catch (error) {
            toast.error(error.data.message || error.error);
        }
    }

    useEffect(() => {
        refetch();
    }, [refetch]);
    return (
        <>
        <Navbar/>
        <div className=' mt-[130px] p-4 m-auto w-[100vw] h-[100vh] bg-[conic-gradient(at_top_left,_var(--tw-gradient-stops))] from-orange-400 to-sky-400'>
            <h1 className='text-2xl font-semibold mb-4 text-black ml-[10rem]'>Users</h1>
            {isLoading ? (<Loader/>) : error ? 
            (<Message variant="error" >{error?.data?.message || error.message}
            </Message>) 
            : (
                <div className='flex flex-col md:flex-row'>
                    <AdminMenu/>
                    <table className='w-full md:w-4/5 mx-auto'>
                        <thead className='border-2 border-teal-500'>
                            <tr>
                                <th className='px-4 py-2 text-left border-2 border-black'>ID</th>
                                <th className='px-4 py-2 text-left border-2 border-black'>Username</th>
                                <th className='px-4 py-2 text-left border-2 border-black'>Admin</th>
                                <th className='px-4 py-2 text-left border-2 border-black text-red-600'>Delete User</th>
                            </tr>
                        </thead>
                        <tbody >
                            {users.map(user => (
                                <tr key={user._id}>
                                    <td className='px-4 py-2 border-2 border-black'>{user._id}</td>
                                    <td className='px-4 py-2 border-2 border-black'>
                                        {editableUserId === user._id && !user.isAdmin ? (
                                            <div className="flex items-center">
                                                <input type="text" 
                                                    className='w-full p-2 border rounded'
                                                    value={editUsername}
                                                    onChange={e=> setEditUsername(e.target.value)}
                                                />
                                                <button onClick={() => updateHandler(user._id)}
                                                    className='ml-2 bg-orange-500 text-black py-2 px-4 rounded'
                                                >
                                                    <FaCheck />
                                                </button>
                                            </div>
                                        ): ( <div className="flex items-center">
                                                {user.username} {" "}
                                                <button onClick={() => toggleEdit(user._id, user.username)}>
                                                    <FaEdit className='ml-[1rem]' />
                                                </button>
                                            </div>
                                        )}
                                    </td>
                                    <td className='px-4 py-2 border-2 border-black'>
                                        {user.isAdmin ? (
                                            <FaCheck style={{color: 'green'}} />
                                        ): (
                                            <FaTimes style={{color: 'red'}} />
                                        )}
                                    </td>
                                    <td className='px-4 py-2 border-2 border-black'>
                                        {!user.isAdmin && (
                                            <div className="flex items-center">
                                                <button onClick={() => deleteHandler(user._id)}
                                                    className='bg-red-600 hover:bg-red-800 text-white font-bold py-2 px-4 rounded'
                                                >
                                                    <FaTrash/>
                                                </button>
                                            </div>
                                        )}
                                    </td>
                                    
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
        </>
    )
}

export default UserList