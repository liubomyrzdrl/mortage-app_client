import React from 'react';
import Layout from '../components/Layout';
import { Link } from 'react-router-dom'
import Banks from '../components/Banks';

const Main: React.FC<{}>  = ()=> {
    return (
        <Layout>
            <h1>Main</h1>
            <Link to="calculator"> Calculator</Link>
            <Banks />
        </Layout>
    );
};


export default Main;