import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router';


const Navbar = ({query, setQuery}) => {
    const navigate = useNavigate();

    useEffect(() => {
        if(query){
            navigate('/');
        }
        navigate('/');
    }, [query]);
    return (
        <div className=''>
            <Link to='/' >Home</Link>
            <div><input type='text' value={query} onChange={setQuery}/></div>
            <hr />
        </div>
    );
};

export default Navbar;