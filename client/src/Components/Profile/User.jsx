import React, { useRef, useState, useContext } from 'react';
import { UserRound } from 'lucide-react';
import { Context } from '../Context';
import { USER_API_URL } from '../../config';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import Spinner from '../Spinner';
import { formatDistanceToNow } from 'date-fns';
import { Info, Trash2 } from 'lucide-react';
import DeleteConfirmationModal from './DeleteConfirmationModal';

function User() {
    const storedUser = localStorage.getItem('user');
    const [user, setUserState] = useState(JSON.parse(storedUser) || {});
    const [selectedFile, setSelectedFile] = useState(null);
    const [email, setEmail] = useState(user.email || '');
    const [title, setTitle] = useState(user.about || '');
    const [fullName, setFullName] = useState(user.fullName || '');
    const inputRef = useRef(null);
    const [isPhotoUploaded, setIsPhotoUploaded] = useState('');
    const { setIsOpen, setPassOpen } = useContext(Context);
    const [loading, setLoading] = useState(false);
    const formattedUpdatedAt = formatDistanceToNow(new Date(user.updatedAt), { addSuffix: true });

    // handle delete modal
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

    // Function to open the delete confirmation modal
    const openDeleteModal = (product) => {
        setIsDeleteModalOpen(true);
    };

    // Function to close the delete confirmation modal
    const closeDeleteModal = () => {
        setIsDeleteModalOpen(false);
    };

    // Function to handle product deletion
    const handleDelete = async () => {
        try {
            axios.delete(`${USER_API_URL}/delete/${user._id}`, {
                headers: {
                    Authorization: `Bearer ${user.token}`,
                },
            });
            localStorage.removeItem('user');
            window.location.href = '/';
        } catch (error) {
            console.log(error);
        }
    };
    const passModal = () => {
        setPassOpen(true);
    }

    const handleChange = (e) => {
        if (e.target.files[0]) {
            const selectedFile = e.target.files[0];
            const reader = new FileReader();

            reader.onloadend = () => {
                setSelectedFile(selectedFile);
                setIsPhotoUploaded(reader.result);
            };

            reader.readAsDataURL(selectedFile);
        }
    };

    const uploadImage = async () => {
        const data = new FormData();
        data.append("file", selectedFile);
        data.append("upload_preset", "hamzacloud");
        data.append("cloud_name", "daeapkeh9");

        try {
            if (!selectedFile) {
                return toast.error("Please upload an image");
            }

            const res = await axios.post('https://api.cloudinary.com/v1_1/daeapkeh9/image/upload', data);

            return res.data.secure_url;

        } catch (error) {
            console.error('Error uploading image:', error);
            // toast.error('Error uploading image. Please try again.');
            return null;
        }
    };

    const onClose = () => setIsOpen(false);



    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            if (!fullName || !email || !title) {
                return toast.error('Please fill in all fields.');
            }
            // check if the user has uploaded a new image
            let uploadedImageUrl = user.profilePic;
            if (selectedFile) {
                uploadedImageUrl = await uploadImage();
            }

            // check if there is no changes in the user data and do not request an api call

            if (fullName === user.fullName && email === user.email && title === user.about && uploadedImageUrl === user.profilePic) {
                toast('No Changes were made!', {
                    icon: <Info />,
                });
                setLoading(false);
                onClose();
            } else {
                const updatedUserData = {
                    fullName: fullName,
                    email: email,
                    profilePic: uploadedImageUrl,
                    about: title || '',
                };

                const response = await axios.put(
                    `${USER_API_URL}/${user._id}`,
                    updatedUserData,
                    {
                        headers: {
                            Authorization: `Bearer ${user.token}`,
                        },
                    }
                );
                const updatedUserState = {
                    ...response.data,
                    ...updatedUserData,
                };

                // Only update local storage with the fields that have changed
                localStorage.setItem('user', JSON.stringify(updatedUserState));


                toast.success('User updated successfully!'); // Show success message
                setLoading(false); // Stop loading
                onClose(); // Close modal
            }


        } catch (error) {
            setLoading(false);
            console.error('Error updating user:', error);
            if (error.response && error.response.status === 400) {
                return toast.error(error.response.data.error);
            }
        }
    };

    return (
        <div className="p-6 flex items-center justify-center">
            <div className="relative container max-w-screen-lg mx-auto">
                <button className='float-right text-rose-500' onClick={() => openDeleteModal()}>
                    <Trash2 />
                </button>
                <form className="mt-10" onSubmit={handleSubmit}>
                    <div className="flex flex-col justify-between h-auto p-5">
                        <div className="flex justify-center items-center">
                            {selectedFile ? (
                                <img
                                    className="bg-white shadow-lg absolute border w-40 h-40 rounded-full object-contain"
                                    src={isPhotoUploaded || URL.createObjectURL(selectedFile)}
                                    alt="User"
                                />
                            ) : user.profilePic ? (
                                <img
                                    className="bg-white shadow-lg absolute border w-40 h-40 rounded-full object-contain"
                                    src={user.profilePic}
                                    alt="User"
                                />
                            ) : (
                                <UserRound className="text-gray-400 shadow-lg absolute border w-40 h-40 p-5 rounded-full object-cover" />
                            )}

                            <input
                                type="file"
                                className="hidden"
                                onChange={handleChange}
                                ref={inputRef}
                                accept=".jpg, .jpeg, .png"
                            />
                            <button
                                type="button"
                                className="relative top-28 px-4 py-1.5 bg-white border border-gray-300 rounded-md"
                                onClick={() => inputRef.current.click()}
                            >
                                {isPhotoUploaded
                                    ? 'Change Photo'
                                    : selectedFile
                                        ? selectedFile.name
                                        : 'Change Photo'}
                            </button>
                        </div>

                        <div className="grid grid-cols-2 gap-4 mt-32">
                            <div className="w-full">
                                <label htmlFor="" className="text-base font-medium text-gray-900">
                                    Full Name
                                </label>
                                <div className="mt-2">
                                    <input
                                        className="form-inputs"
                                        type="text"
                                        value={fullName}
                                        onChange={(e) => setFullName(e.target.value)}
                                    />
                                </div>
                            </div>

                            <div className="w-full">
                                <label htmlFor="" className="text-base font-medium text-gray-900">
                                    Email
                                </label>
                                <div className="mt-2">
                                    <input
                                        className="form-inputs"
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </div>
                            </div>

                            <div className="w-full">
                                <label htmlFor="" className="text-base font-medium text-gray-900">
                                    Title
                                </label>
                                <div className="mt-2">
                                    <input
                                        className="form-inputs"
                                        type="text"
                                        value={title}
                                        onChange={(e) => setTitle(e.target.value)}
                                    />
                                </div>
                            </div>
                            <div className="w-full mt-10">
                                <button
                                    type='button'
                                    onClick={passModal}
                                    className='underline text-blue-800 font-medium text-sm'>Change Password</button>
                            </div>
                        </div>
                        <div className="flex justify-between items-center mt-5">
                            <div className="flex flex-col gap-1 text-xs">
                                <span className='text-gray-800 font-medium'>last Update : </span>
                                <span className='text-gray-500'>{formattedUpdatedAt}</span></div>
                            <div className="bg-gray-50 sm:flex sm:flex-row-reverse">
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className={`${loading && 'cursor-not-allowed py-2'} w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 sm:ml-3 sm:w-auto sm:text-sm`}
                                >
                                    {
                                        loading ? (
                                            <Spinner />) : (
                                            'Save Changes'
                                        )
                                    }
                                </button>
                                <button
                                    onClick={onClose}
                                    type="button"
                                    className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 sm:mt-0 sm:w-auto sm:text-sm"
                                >
                                    Cancel
                                </button>
                            </div>

                        </div>
                    </div>
                </form>
            </div>
            <DeleteConfirmationModal
                isOpen={isDeleteModalOpen}
                onClose={closeDeleteModal}
                onDelete={handleDelete}
            />
        </div >
    );
}

export default User;
