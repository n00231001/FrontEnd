import { useEffect, useState } from 'react';
import axios from 'axios';
import CountryCard from '../components/CountryCard';
import { Link } from 'react-router-dom';

export default function Home({ query }) {
  const [countriesList, setCountriesList] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);

  // 🟢 Fetch countries (once)
  useEffect(() => {
    axios
      .get('https://restcountries.com/v3.1/all?fields=name,flags,capital,cca3')
      .then((response) => {
        setCountriesList(response.data || []);
        setFilteredCountries(response.data || []);
      })
      .catch((error) => console.error(error));
  }, []);

  // 🟡 Filter countries by query
  useEffect(() => {
    if (query && query.length >= 2) {
      const newList = countriesList.filter((country) =>
        country.name.common.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredCountries(newList);
    } else {
      setFilteredCountries(countriesList);
    }
  }, [query, countriesList]);

  // 🧱 Render country cards
  const countryCards = filteredCountries.map((country) => (
    <CountryCard
      key={country.cca3}
      flagImg={country.flags.png}
      name={country.name.common}
      capital={country.capital}
    />
  ));

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Home</h1>

      <h2 className="text-xl font-semibold mt-4 mb-2">Countries</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">{countryCards}</div>
    </div>
  );
}
