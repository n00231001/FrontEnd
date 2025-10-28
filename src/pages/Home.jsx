import { useEffect, useState } from 'react';
import axios from 'axios';
import CountryCard from '../components/CountryCard';
import { Link } from 'react-router-dom';

export default function Home({ query }) {
  const [countriesList, setCountriesList] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [meals, setMeals] = useState([]);

  // 🟢 Fetch countries (once)
  useEffect(() => {
    axios
      .get('https://restcountries.com/v3.1/all?fields=name,flags,capital,cca3')
      .then((response) => {
        setCountriesList(response.data);
        setFilteredCountries(response.data);
      })
      .catch((error) => console.error(error));
  }, []);

  // 🟢 Fetch meals (depends on query)
  useEffect(() => {
    const fetchMeals = async () => {
      try {
        const endpoint = query
          ? `https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`
          : 'https://www.themealdb.com/api/json/v1/1/search.php?s=';

        const response = await axios.get(endpoint);
        setMeals(response.data.meals || []);
      } catch (error) {
        console.error('Error fetching meals:', error);
      }
    };

    fetchMeals();
  }, [query]);

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

  // 🧱 Render meal cards
  const mealCards = meals.map((meal) => (
    <div key={meal.idMeal} className="card bg-base-100 shadow-md hover:shadow-lg">
      <figure>
        <img src={meal.strMealThumb} alt={meal.strMeal} className="w-full h-48 object-cover" />
      </figure>
      <div className="card-body">
        <h2 className="card-title text-lg font-semibold">{meal.strMeal}</h2>
        <p className="text-sm text-gray-600">{meal.strArea}</p>
        <Link to={`/meal/${meal.idMeal}`} className="btn btn-primary btn-sm mt-2">
          View Recipe
        </Link>
      </div>
    </div>
  ));

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Home</h1>

      <h2 className="text-xl font-semibold mt-4 mb-2">Countries</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">{countryCards}</div>

      <h2 className="text-xl font-semibold mt-8 mb-2">Meals</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {mealCards.length > 0 ? mealCards : <p>No meals found.</p>}
      </div>
    </div>
  );
}
