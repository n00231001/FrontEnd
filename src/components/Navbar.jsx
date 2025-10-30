import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = ({query, setQuery}) => {
    const navigate = useNavigate();

    useEffect(() => {
         if (query && query.toString().trim().length > 0) {
            navigate('/');
        };
        navigate('/');
    }, [query]);
    return (
        <div className=''>
            <div className="flex w-full flex-col lg:flex-row">
                <Link to='/' >Home</Link>
                    <div className="divider divider-horizontal"></div>
                     <form className="form flex flex-nowrap items-center gap-2 overflow-x-auto" onSubmit={(e)=>e.preventDefault()}>
                        <input 
                            type="text" 
                            placeholder="Search country..."
                            value={query ?? ''}
                            onChange={(e) => setQuery(e.target.value)}
                            className="input input-bordered input-sm w-auto"
                        />

                            <div className="divider divider-horizontal" ></div>
                        <input className="btn btn-outline btn-primary" type="checkbox" name="europe" aria-label="Europe"/>
                            <div className="divider divider-horizontal"></div>
                        <input className="btn btn-outline btn-error" type="checkbox" name="usa" aria-label="USA"/>
                            <div className="divider divider-horizontal"></div>
                        <input className="btn btn-outline btn-accent" type="checkbox" name="middle-east" aria-label="Middle east"/>
                            <div className="divider divider-horizontal"></div>
                        <input className="btn btn-outline btn-warning" type="checkbox" name="asia" aria-label="Asia"/>
                            <div className="divider divider-horizontal"></div>
                        <input className="btn btn-outline btn-secondary" type="checkbox" name="australia" aria-label="Australia"/>
                            <div className="divider divider-horizontal"></div>
                        <input className="btn btn-outline btn-success" type="checkbox" name="africa" aria-label="Africa"/>
                            <div className="divider divider-horizontal"></div>
                        <input className="btn btn-outline btn-default" type="checkbox" name="antarctica" aria-label="Antarctica"/>
                </form>
            </div>
            <hr />
        </div>
    );
};

export default Navbar;