import {useEffect, useState} from 'react';
import axios from 'axios';
import CountryCard from '../components/CountryCard';

export default function Home ({ query}) {
    const [countriesList, setCountriesList] = useState([]);
    const [filteredCountries, setFilteredCountries] = useState([]);
    
    useEffect(() => {
        axios.get('https://restcountries.com/v3.1/all?fields=name,flags,flag,name,capital')
             .then(response => {
                console.log(response.data);
                setCountriesList(response.data);
                setFilteredCountries(response.data);
             })
             .catch(error => console.error(error));
    }, []);

    useEffect(() => {
        if(query.length >= 2){
            const newList = countriesList.filter((country) => {
                    return country.name.common.toLowerCase().includes(query.toLowerCase());
                });

                setFilteredCountries(newList);
        }
        else{
            setFilteredCountries(countriesList);
        }
    }, [query]);

    let countryCards = filteredCountries.map((country) => {
        return (
                <CountryCard 
                    key={country.cca3}
                    flagImg={country.flags.png}
                    name={country.name.common}
                    capital={country.capital}
                />
                );

    });

    return (
        <div>
            <h1>Home</h1>
            
            {countryCards}
        </div>
    );
};    