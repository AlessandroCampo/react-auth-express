import { Link } from 'react-router-dom';
import notFoundImage from '../assets/images/404.png';
import { useLocation } from 'react-router-dom';

export default () => {
    const location = useLocation();
    const { notFoundMessage } = location.state || {};
    const defaultMessage = 'Sorry, Could not find the page you were looking for!';

    return (
        <div className="h-screen w-2/3 mx-auto flex items-center justify-between gap-12">
            <img src={notFoundImage} alt="" />
            <div className='text-gray-300 text-5xl uppercase text-center w-2/5 flex flex-col gap-24 items-center'>
                <span>
                    {notFoundMessage || defaultMessage}
                </span>
                <Link
                    to="/">
                    <button className='text-3xl uppercase px-6 py-2'>
                        Back Home
                    </button>
                </Link>
            </div>
        </div>
    )
};