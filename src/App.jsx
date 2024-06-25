
import { Outlet, useNavigate } from 'react-router-dom';
import Layout from './views/layouts/Layout';
import { useEffect } from 'react';


const App = () => {



    return (
        <Layout>
            <Outlet />
        </Layout>
    );
};

export default App;