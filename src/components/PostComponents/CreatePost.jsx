import { useRef, useState } from "react";
import Avatar from '@mui/material/Avatar';
import { IoMdImages } from "react-icons/io";


import gsap from 'gsap';
import { useGSAP } from "@gsap/react";
gsap.registerPlugin(useGSAP);
gsap.registerPlugin("x");
import { customAxiosInstance } from "../../axiosClient";


import './post.css';
import { BeatLoader, CircleLoader, PropagateLoader } from "react-spinners";
import { useAuth } from "../../contexts/AuthContext";

export default ({ notifyError, onPostCreate, notifySuccess }) => {
    const wrapper = useRef();
    const [postContent, setPostContent] = useState('');
    const [creatingPost, setCreatingPost] = useState(false);
    const [postMedia, setPostMedia] = useState(undefined);
    const [imagePreview, setImagePreview] = useState('');
    const [postErrors, setPostErrors] = useState([]);
    const { user } = useAuth();

    const updatePostContent = (e) => {

        setPostContent(e.target.value);
    }


    const errorAnimation = () => {
        return new Promise((resolve) => {
            gsap.to('#createPostWrapper', {
                duration: 0.05,
                x: 10,
                repeat: 6,
                yoyo: true,
                onComplete: () => {
                    gsap.set('#createPostWrapper', { x: 0 });
                    resolve();
                }
            });
            notifyError('Scrivi qualcosa, coglione');
        });
    }


    const handleFileUpload = (e) => {
        const file = e.target.files[0];
        setPostMedia(file);
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                setImagePreview(e.target.result);
            };
            reader.readAsDataURL(file);
        }
    }

    const createPost = async () => {
        // Frontend validation
        if (postContent.trim().length <= 0) {
            await errorAnimation();
            return;
        }

        setCreatingPost(true);

        const headers = {
            'Content-Type': 'multipart/form-data'
        };

        const formData = new FormData();
        formData.append('content', postContent);
        if (postMedia) {
            formData.append('image', postMedia);
        }

        try {
            const response = await customAxiosInstance.post(`posts`, formData);
            if (response.data) {
                console.log(response.data.newPost)
                notifySuccess('Your post has been succesfully created!')
                onPostCreate(response.data?.newPost);
            }
        } catch (err) {
            console.error(err);
            notifyError(err?.response?.data?.errors[0].msg || err.message);
            setCreatingPost(false);
            return
        }

        setPostContent('');
        setImagePreview('')
        setCreatingPost(false);

    }


    return (
        <div className="wrapper w-[350px]" ref={wrapper} id="createPostWrapper">

            <div className="upper">
                <Avatar
                    sx={{ bgcolor: '#DAA520', color: 'gray', width: 48, height: 48 }}
                    alt={user?.username}
                    src={user?.avatar || ''}

                />
                <textarea
                    value={postContent}
                    placeholder="What's on your mind?"
                    className="h-[100px]"
                    onChange={(e) => { updatePostContent(e) }}
                >
                </textarea>
            </div>
            {
                postMedia && imagePreview &&
                <figure
                    className="w-full h-[150px]"
                >
                    <img
                        src={imagePreview}
                        alt="post_preview"
                        className="preview"
                    />
                </figure>

            }
            <div className="lower">
                <label
                    htmlFor="postPic"

                >
                    <IoMdImages
                        className="icon-common"
                    />
                </label>

                <input
                    type="file"
                    id="postPic"
                    onChange={(e) => { handleFileUpload(e) }}
                    className="hidden"
                    accept=".jpg, .png, .jpeg"
                />



                <button onClick={createPost}>
                    {

                        creatingPost ? <BeatLoader color="black" size={10} margin={0} /> : 'Publish'
                    }

                </button>


            </div>
            {
                postErrors.length > 0 && <p className="px-6 errors-container text-red-600 font-semibold flex flex-col gap-2">
                    {
                        postErrors.map(err => {
                            return <div className="error">
                                {err}
                            </div>
                        })
                    }

                </p>
            }

        </div>
    )
};
