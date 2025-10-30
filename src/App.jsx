import { useState, useEffect } from 'react';
import './styles/App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Import components
import Navbar from './components/Navbar';

// Import pages
import Home from './pages/Home';
import SingleMeal from './pages/SingleMeal';
import SingleCountry from './pages/SingleCountry';

export default function App() {
  const [query, setQuery] = useState('');
  const [meals, setMeals] = useState([]);
  const [regionFilters, setRegionFilters] = useState([]); // e.g. ['Europe','Asia']

  // 🟢 Fetch meals when query changes
  useEffect(() => {
    const fetchMeals = async () => {
      try {
        const endpoint = query
          ? `https://www.themealdb.com/api/json/v1/1/search.php?s=${encodeURIComponent(query)}`
          : 'https://www.themealdb.com/api/json/v1/1/search.php?s=';

        const response = await fetch(endpoint);
        const data = await response.json();
        setMeals(data.meals || []);
      } catch (error) {
        console.error('Error fetching meals:', error);
      }
    };

    fetchMeals();
  }, [query]);

  return (
    <Router>
      {/* pass the actual setter so Navbar can call setQuery(e.target.value) */}
      <Navbar query={query} setQuery={setQuery} regionFilters={regionFilters} setRegionFilters={setRegionFilters} />
      <Routes>
        {/* pass query into Home so it can filter countries */}
        <Route path="/" element={<Home query={query} meals={meals} regionFilters={regionFilters} />} />

        {/* 🔎 Single country route */}
        <Route path="/country/:name" element={<SingleCountry />} />

        {/* 🍳 Single meal details */}
        <Route path="/meal/:id" element={<SingleMeal />} />
      </Routes>
    </Router>
  );
}