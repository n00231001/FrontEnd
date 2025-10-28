// ...existing code...
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

  // 🟢 Fetch meals when query changes
  useEffect(() => {
    const fetchMeals = async () => {
      try {
        const endpoint = query
          ? `https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`
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

  // 🟡 Handle search input
  const handleChange = (e) => {
    setQuery(e.target.value);
  };

  return (
    <Router>
      <Navbar query={query} setQuery={handleChange} />
      <Routes>
        {/* 🏠 Home Page (displays meals) */}
        <Route path="/" element={<Home meals={meals} />} />

        {/* 🔎 Single country route (added) */}
        <Route path="/country/:name" element={<SingleCountry />} />

        {/* 🍳 Single meal details */}
        <Route path="/meal/:id" element={<SingleMeal />} />
      </Routes>
    </Router>
  );
}