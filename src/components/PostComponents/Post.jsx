import { useState, useRef, useContext } from "react";
import Avatar from '@mui/material/Avatar';
import { FaRegComment, FaRegHeart } from "react-icons/fa";
import { GrSync } from "react-icons/gr";


import './post.css';
import { formatTimestamp } from "../../utils";
import CustomizedMenus from "./PostDropdown";
import { TextareaAutosize } from '@mui/base/TextareaAutosize';

import { customAxiosInstance } from "../../axiosClient";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { useGlobal } from "../../GlobalState";





export default ({ post, setPostList, width, isLinkClickable = true }) => {



    const { user } = useAuth();
    const { notifyError, notifySuccess } = useGlobal();
    const isUserPost = post?.userId == user?.id;
    const navigate = useNavigate();



    const changePostVisibility = async (boolean) => {

        const token = localStorage.getItem('authTokenReact');
        if (!token) return
        try {

            const data = {
                published: boolean
            }
            const response = await customAxiosInstance.patch(`posts/${post.slug}/change-visibility`, data);
            if (response) {

                setPostList(currList => currList.map(p => {
                    if (p?.id === post?.id) {
                        return { ...p, published: boolean }
                    }
                    return { ...p }
                }));
                notifySuccess(`Your post has been succesfully ${boolean ? 'published' : 'hidden'}`)
            }
        } catch (err) {
            console.error(err);
        }


    }

    const showUserPage = (e) => {
        e.preventDefault()
        navigate(`/${post?.user?.username}`);
    };

    const navigateToPostDetail = (e) => {
        if (isLinkClickable) {
            navigate(`/post/${post?.slug}`);
        } else {
            e.preventDefault();
        }
    };

    return (

        <div className="wrapper" style={{ width: width }}>
            <div className="upper">
                <div className="upper-left flex gap-3">

                    <Avatar
                        sx={{ bgcolor: '#DAA520', color: 'gray', width: 48, height: 48, cursor: 'pointer' }}
                        alt={post?.user?.username}
                        src={post?.user?.avatar || ''}
                        onClick={showUserPage}

                    />


                    <div className="authors-info flex flex-col text-sm">
                        <span className="font-bold">
                            {post?.user?.username}
                        </span>
                        <span>
                            {formatTimestamp(post?.createdAt)}
                        </span>
                    </div>
                </div>
                {
                    <CustomizedMenus
                        setPostList={setPostList}
                        changePostVisibility={(bool) => { changePostVisibility(bool) }}
                        post={post}
                        isUserPost={isUserPost}


                    />
                }

            </div>
            <div className="px-5 cursor-pointer" onClick={navigateToPostDetail}>

                <p className='w-full max-h-[160px]'>
                    {post?.content}
                </p>


            </div>
            {
                post.image &&
                <figure
                    className={`w-full h-[${width / 2}] cursor-pointer`}
                    onClick={navigateToPostDetail}
                >
                    <img
                        alt="post_image"
                        className="preview"
                        src={post.image}
                    />
                </figure>


            }
            <div className="lower">
                <div className="icons-container">
                    <div className="iconandcounter">
                        <FaRegHeart
                            className="icon-common"
                        />
                        <span className="counter">
                            {post?.likes?.length || 0}
                        </span>
                    </div>
                    <div className="iconandcounter">
                        <FaRegComment
                            className="icon-common"
                        />
                        <span className="counter">
                            {post?.comments?.length || 0}
                        </span>
                    </div>
                    <div className="iconandcounter">
                        <GrSync
                            className="icon-common"
                        />
                        <span className="counter">
                            {post?.comments?.length || 0}
                        </span>
                    </div>
                </div>




            </div>
            <div className="add-comment px-6 w-full">
                <input type="text"
                    placeholder="Add your opinion no one asked for here..."
                    className="w-full custom-placeholder"
                />
            </div>
        </div>


    )
};