import { useEffect, useState } from 'react';
import axios from 'axios';
import CountryCard from '../components/CountryCard';

export default function Home({ query = '', regionFilters = [] }) {
  const [countriesList, setCountriesList] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);

  // 🟢 Fetch countries (once)
  useEffect(() => {
    axios
      .get('https://restcountries.com/v3.1/all?fields=name,flags,capital,cca3,region')
      .then((response) => {
        setCountriesList(response.data || []);
        setFilteredCountries(response.data || []);
      })
      .catch((error) => console.error(error));
  }, []);

  // 🟡 Filter countries by query and region
  useEffect(() => {
    const q = (query || '').trim().toLowerCase();

    let results = countriesList;

    if (q.length >= 1) {
      results = results.filter((c) => c?.name?.common?.toLowerCase().includes(q));
    }

    if (regionFilters && regionFilters.length > 0) {
      results = results.filter((c) => regionFilters.includes(c.region));
    }

    setFilteredCountries(results);
  }, [query, countriesList, regionFilters]);

  // 🧱 Render country cards
  const countryCards = filteredCountries.map((country) => (
    <CountryCard
      key={country.cca3}
      flagImg={country.flags?.png}
      name={country.name?.common}
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
