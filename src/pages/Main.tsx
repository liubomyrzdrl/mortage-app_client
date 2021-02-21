import React from 'react';
import Layout from '../components/Layout';
import { Link } from 'react-router-dom'
import BanksList from '../components/BanksList';

const Main: React.FC<{}>  = ()=> {
    return (
        <Layout>
            <h1>Main</h1>
            <Link to="calculator"> Calculator</Link>
            <BanksList />
        </Layout>
    );
};

export default Main;