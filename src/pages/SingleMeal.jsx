import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';

export default function SingleMeal() {
  const { id } = useParams();
  const [meal, setMeal] = useState(null);

  useEffect(() => {
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
      .then((res) => res.json())
      .then((data) => setMeal(data.meals ? data.meals[0] : null))
      .catch((err) => console.error(err));
  }, [id]);

  if (!meal) return <p className="p-4 text-gray-500">Loading meal...</p>;

  return (
    <div className="p-6">
      <Link to="/" className="btn btn-outline btn-primary mb-4">← Back</Link>
      <h1 className="text-2xl font-bold mb-2">{meal.strMeal}</h1>
      <img src={meal.strMealThumb} alt={meal.strMeal} className="w-96 rounded mb-4" />
      <p><strong>Category:</strong> {meal.strCategory}</p>
      <p><strong>Area:</strong> {meal.strArea}</p>
      <h3 className="text-xl font-semibold mt-4 mb-2">Instructions</h3>
      <p className="whitespace-pre-line">{meal.strInstructions}</p>
    </div>
  );
}