import React from 'react';
import Layout from './components/Layout';
import Main from './pages/Main';
import "./App.css"


function App() {
  return (
    <div className="App">
        <Layout>
            <Main />
        </Layout>
    </div>
  );
}

export default App;
