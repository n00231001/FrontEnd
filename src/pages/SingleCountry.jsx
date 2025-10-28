import { useEffect, useState} from 'react';
import { useParams } from 'react-router';
import axios from 'axios';
import SingleMeal from './SingleMeal';

export default function SingleCountry(){
    const {name} = useParams();
    const [country, setCountry] = useState(null);
    
    useEffect(() => {
         axios.get(`https://restcountries.com/v3.1/name/${name}?fullText=true`)
             .then(response => {
                console.log(response.data);
                setCountry(response.data[0]);
             })
             .catch(error => console.error(error));
    }, []);

    if(country === null){
        return(
            <p>Loading...</p>
        );
    }

    console.log(country.currencies["EGP"]);
    console.log(Object.keys(country.currencies));


    
    let currencies = Object.keys(country.currencies).map((currency, i) => {
        return (
            <p key={i}>
                <b>Code: </b> {currency} <br/>
                <b>Name: </b> {country.currencies[currency].name}
                <b>Symbol: </b> {country.currencies[currency].symbol}
            </p>
        );
    });

    return (
        <>
            <img src={country.flags.png}/>

            <p><b>Name:</b> {country.name.official}</p>
            <p><b>Name:</b> {country.captial}</p>
            <></>
            {currencies}
            <img src={country.coatOfArms.png}/>
        </>
    );
};