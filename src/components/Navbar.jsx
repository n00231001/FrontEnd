import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = ({ query = '', setQuery = () => {}, regionFilters = [], setRegionFilters = () => {} }) => {
  const navigate = useNavigate();

  // remove unconditional navigation to avoid stealing focus;
  // navigate only when you explicitly need it (e.g. on submit)
  useEffect(() => {
    // no-op here to avoid re-renders that break typing
  }, []);

  const toggleRegion = (region) => {
    setRegionFilters((prev = []) => (prev.includes(region) ? prev.filter((r) => r !== region) : [...prev, region]));
  };

  return (
    <div className=''>
      <div className="flex w-full flex-col lg:flex-row">
        <Link to='/' >Home</Link>
          <div className="divider divider-horizontal" />
           <form className="form flex flex-nowrap items-center gap-2 overflow-x-auto" onSubmit={(e)=>e.preventDefault()}>
              {/* searchBar */}
              <input 
                  type="text" 
                  placeholder="Search country..."
                  value={query ?? ''}
                  onChange={(e) => {
                    if (typeof setQuery === 'function') setQuery(e.target.value);
                  }}
                  className="input input-bordered input-sm w-auto"
                  aria-label="Search countries"
              />

              {/* filterButtons */}
              <div className="divider divider-horizontal" />
              <input
                className="btn btn-outline btn-primary"
                type="checkbox"
                name="europe"
                aria-label="Europe"
                value="Europe"
                checked={Array.isArray(regionFilters) && regionFilters.includes('Europe')}
                onChange={() => toggleRegion('Europe')}
              />
              <div className="divider divider-horizontal" />

              <input
                className="btn btn-outline btn-error"
                type="checkbox"
                name="americas"
                aria-label="Americas"
                value="Americas"
                checked={Array.isArray(regionFilters) && regionFilters.includes('Americas')}
                onChange={() => toggleRegion('Americas')}
              />
              <div className="divider divider-horizontal" />

              <input
                className="btn btn-outline btn-accent"
                type="checkbox"
                name="asia"
                aria-label="Asia"
                value="Asia"
                checked={Array.isArray(regionFilters) && regionFilters.includes('Asia')}
                onChange={() => toggleRegion('Asia')}
              />
              <div className="divider divider-horizontal" />

              <input
                className="btn btn-outline btn-warning"
                type="checkbox"
                name="oceania"
                aria-label="Oceania"
                value="Oceania"
                checked={Array.isArray(regionFilters) && regionFilters.includes('Oceania')}
                onChange={() => toggleRegion('Oceania')}
              />
              <div className="divider divider-horizontal" />

              <input
                className="btn btn-outline btn-secondary"
                type="checkbox"
                name="africa"
                aria-label="Africa"
                value="Africa"
                checked={Array.isArray(regionFilters) && regionFilters.includes('Africa')}
                onChange={() => toggleRegion('Africa')}
              />
              <div className="divider divider-horizontal" />

              <input
                className="btn btn-outline btn-success"
                type="checkbox"
                name="antarctic"
                aria-label="Antarctic"
                value="Antarctic"
                checked={Array.isArray(regionFilters) && regionFilters.includes('Antarctic')}
                onChange={() => toggleRegion('Antarctic')}
              />
          </form>
      </div>
      <hr />
    </div>
  );
};

export default Navbar;