import { Link } from 'react-router';

export default function CountryCard ({flagImg, name, capital}) {
    return (
        <>
        <Link to={`/country/${name}`} ><img alt={name} src={flagImg}/></Link>
        <p><b>Name: </b> {name}<Link to={`/country/${name}`}>{name}</Link></p>
        <p><b>Capital: </b> {capital.join(' , ')}</p>
        </>
    );
};