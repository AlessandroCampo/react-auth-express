import { useState, useRef, useContext } from "react";
import Avatar from '@mui/material/Avatar';
import { FaRegComment, FaRegHeart, FaHeart } from "react-icons/fa";
import { GrSync } from "react-icons/gr";


import './post.css';
import { formatTimestamp } from "../../utils";
import CustomizedMenus from "./PostDropdown";
import { TextareaAutosize } from '@mui/base/TextareaAutosize';
import { FiSend as SendIcon } from "react-icons/fi";

import { customAxiosInstance } from "../../axiosClient";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { useGlobal } from "../../GlobalState";





export default ({ post, setPostList, width, isLinkClickable = true }) => {



    const { user } = useAuth();
    const { notifyError, notifySuccess } = useGlobal();
    const isUserPost = post?.userId == user?.id;
    const navigate = useNavigate();
    const [newComment, setNewComment] = useState('');

    const isLikedByUser = post.likes.find(l => l.userId === user?.id) !== undefined;


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


    const likeOrUnlikePost = async () => {
        try {
            if (isLikedByUser) {

                const response = await customAxiosInstance.delete(`/posts/${post.slug}/like`);
                const removedLike = response.data.removedLike;


                setPostList(oldPostList => {
                    return oldPostList.map(oldPost => {
                        if (oldPost.id === post.id) {
                            const updatedLikes = oldPost.likes.filter(like => like?.id !== removedLike.id);
                            return { ...oldPost, likes: updatedLikes };
                        } else {
                            return oldPost;
                        }
                    });
                });
            } else {

                const response = await customAxiosInstance.post(`/posts/${post.slug}/like`);
                const newLike = response.data.newLike;
                console.log(newLike)
                setPostList(oldPostList => {
                    return oldPostList.map(oldPost => {
                        if (oldPost.id === post.id) {
                            const updatedLikes = [...oldPost.likes, newLike];
                            return { ...oldPost, likes: updatedLikes };
                        } else {
                            return oldPost;
                        }
                    });
                });
            }
        } catch (err) {
            console.error(err);
        }
    };

    const addComment = async () => {
        if (!newComment) return

        const sentData = {
            content: newComment
        }

        try {
            const { data } = await customAxiosInstance.post(`posts/${post.slug}/comment`, sentData);
            if (data) {
                console.log(data.newComment)
                setNewComment('');
                setPostList(oldList => {
                    return oldList.map(p => {
                        if (p.id === post.id) {
                            return { ...p, comments: [data.newComment, ...p.comments] }
                        }
                        return p
                    })
                })
                notifySuccess('Our app is now enriched with your amazing opinion')
            }
        } catch (err) {
            notifyError('An error occurred while adding your comment, but I think the world will survive without your opinion')
            console.error(err);
        }
    };

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
                        {
                            isLikedByUser ?
                                <FaHeart
                                    className="icon-common"
                                    onClick={likeOrUnlikePost}
                                />

                                :
                                <FaRegHeart
                                    className="icon-common"
                                    onClick={likeOrUnlikePost}
                                />

                        }

                        <span className="counter">
                            {post?.likes?.length || 0}
                        </span>
                    </div>
                    <div className="iconandcounter">
                        <FaRegComment
                            className="icon-common"
                            onClick={navigateToPostDetail}
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
            <div className="add-comment px-6 w-full flex items-center">
                <input type="text"
                    placeholder="Add your opinion no one asked for here..."
                    className="w-full custom-placeholder text-sm"
                    value={newComment}
                    onChange={(e) => { setNewComment(e.target.value) }}
                />
                {
                    newComment.length > 0 &&
                    <SendIcon
                        className="text-lg"
                        onClick={addComment}
                    />
                }
            </div>
        </div>


    )
};