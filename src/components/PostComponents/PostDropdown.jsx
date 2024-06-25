import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import PersonAddSharpIcon from '@mui/icons-material/PersonAddSharp';
import Dialogue from '../Dialogue.jsx';
import { customAxiosInstance } from '../../axiosClient.js';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { useNavigate } from 'react-router';
import { useGlobal } from '../../GlobalState.jsx';
import { useAuth } from '../../contexts/AuthContext.jsx';


const StyledMenu = styled((props) => (
    <Menu
        elevation={0}
        anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
        }}
        transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
        }}
        {...props}
    />
))(({ theme }) => ({
    '& .MuiPaper-root': {
        borderRadius: 6,
        marginTop: theme.spacing(1),
        minWidth: 180,
        color:
            theme.palette.mode === 'light' ? 'rgb(55, 65, 81)' : theme.palette.grey[300],
        boxShadow:
            'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
        '& .MuiMenu-list': {
            padding: '4px 0',
        },
        '& .MuiMenuItem-root': {
            '& .MuiSvgIcon-root': {
                fontSize: 18,
                color: theme.palette.text.secondary,
                marginRight: theme.spacing(1.5),
            },
            '&:active': {
                backgroundColor: alpha(
                    theme.palette.primary.main,
                    theme.palette.action.selectedOpacity,
                ),
            },
        },
    },
}));

export default function CustomizedMenus({ setPostList, changePostVisibility, post, isUserPost }) {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [openDeleteDialogue, setopenDeleteDialogue] = React.useState(false);
    const open = Boolean(anchorEl);
    const navigate = useNavigate()
    const { notifyError, notifySuccess } = useGlobal();
    const { isAdmin } = useAuth();


    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };


    const handleClose = () => {
        setAnchorEl(null);
    };

    const deletePost = async () => {

        try {
            const response = await customAxiosInstance.delete(`posts/${post.slug}`)
            if (response) {
                notifySuccess('Your post has been succesfully deleted');
                setPostList(oldList => (oldList.filter(p => p.id !== post.id)))
            }
        } catch (err) {
            notifyError('An error occurred while deleting your post');
            console.error(err);
        }

        setopenDeleteDialogue(false);
    }

    const hideOrShow = () => {
        changePostVisibility(!post.published);

        handleClose();
        navigate('/');
    }


    const options =
        isUserPost || isAdmin ?
            [
                {
                    label: post?.published ? 'Hide' : 'Show',
                    cb: hideOrShow,
                    icon: post?.published ? <VisibilityOffIcon /> : <VisibilityIcon />
                },
                {
                    label: 'Delete',
                    cb: () => { setopenDeleteDialogue(true), handleClose() },
                    icon: <DeleteIcon />
                }
            ] :
            [
                {
                    label: 'Follow',
                    cb: () => { console.log('to do follow logic') },
                    icon: <PersonAddSharpIcon />
                }
            ]

    return (
        <div>
            {/* delete dialogue */}
            <Dialogue
                open={openDeleteDialogue}
                title={'Are you sure you want to delete your post?'}
                description={"If you delte this post, you won't be able to recover it"}
                onCancel={() => { setopenDeleteDialogue(false) }}
                onConfirm={async () => { await deletePost() }}
                cancelLabel={'No, Keep Post'}
                confirmLabel={'Yes, Delete Post'}
            />
            <Button
                id="demo-customized-button"
                aria-controls={open ? 'demo-customized-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                variant="contained"
                disableElevation
                onClick={handleClick}
                style={{ backgroundColor: 'transparent', color: '#DAA520', zIndex: 10 }}

            >
                <MoreHorizIcon
                    className='icon-common'
                />
            </Button>
            <StyledMenu
                id="demo-customized-menu"
                MenuListProps={{
                    'aria-labelledby': 'demo-customized-button',
                }}
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
            >
                {
                    options.map((opt, index) => (
                        <MenuItem onClick={opt.cb} disableRipple
                            key={`option-${index}`}
                        >
                            {opt.icon}
                            {opt.label}
                        </MenuItem>
                    ))
                }

            </StyledMenu>
        </div>
    );
}