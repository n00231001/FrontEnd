import { useState } from 'react';
import './styles/App.css'

import { BrowserRouter as Router, Routes, Route} from 'react-router';

//import components
import Navbar from './components/Navbar';


//import pages
import Home from './pages/Home';
import SingleCountry from './pages/SingleCountry';

export default function App () {
    const [query, setQuery] = useState('');
    

    const handleChange = (e) => {
        navigate('/');
        console.log(e.target.value);
        setQuery(e.target.value);
    };

    return (
        <>
            <Router>
                <Navbar query={query} setQuery={handleChange}/>
                <Routes>
                    <Route path='/' element={<Home query={query}/>} />
                    <Route path='/:country/:name' element={<SingleCountry />}/>
                </Routes>
            </Router>
        </>
    );
};
