import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import SingleMeal from './SingleMeal';

export default function SingleCountry() {
  const { name } = useParams();
  const [country, setCountry] = useState(null);
  const [meals, setMeals] = useState([]);
  const [loadingMeals, setLoadingMeals] = useState(false);
  const [loadingCountry, setLoadingCountry] = useState(true);

  const countryToMealArea = {
    Egypt: 'Egyptian',
    France: 'French',
    Italy: 'Italian',
    Spain: 'Spanish',
    Greece: 'Greek',
    Morocco: 'Moroccan',
    Germany: 'German',
    Portugal: 'Portuguese',
    Netherlands: 'Dutch',
    Switzerland: 'Swiss',
    Belgium: 'Belgian',
    Turkey: 'Turkish',
    'United Kingdom': 'British',
    Ireland: 'Irish',
    Sweden: 'Swedish',
    Norway: 'Norwegian',
    Denmark: 'Danish',
    Finland: 'Finnish',
    Austria: 'Austrian',
    Hungary: 'Hungarian',
    Poland: 'Polish',
    Russia: 'Russian',
    Ukraine: 'Ukrainian',
    Czechia: 'Czech',
    Slovakia: 'Slovak',
    Croatia: 'Croatian',
    Serbia: 'Serbian',
    Bulgaria: 'Bulgarian',
    Romania: 'Romanian',
    Lithuania: 'Lithuanian',
    Latvia: 'Latvian',
    Estonia: 'Estonian',
    Belarus: 'Belarusian',
    Slovenia: 'Slovenian',
    Albania: 'Albanian',
    'North Macedonia': 'Macedonian',
    Bosnia: 'Bosnian',
    Montenegro: 'Montenegrin',
    Kosovo: 'Kosovan',
    Cyprus: 'Cypriot',
    Malta: 'Maltese',
    Luxembourg: 'Luxembourgish',
    Iceland: 'Icelandic',
    Andorra: 'Andorran',
    Liechtenstein: 'Liechtensteiner',
    SanMarino: 'Sammarinese',
    VaticanCity: 'Vatican',
    'United States': 'American',
    Canada: 'Canadian',
    Mexico: 'Mexican',
    Brazil: 'Brazilian',
    Argentina: 'Argentine',
    Chile: 'Chilean',
    Peru: 'Peruvian',
    Colombia: 'Colombian',
    Venezuela: 'Venezuelan',
    Cuba: 'Cuban',
    Jamaica: 'Jamaican',
    Haiti: 'Haitian',
    DominicanRepublic: 'Dominican',
    Guatemala: 'Guatemalan',
    Honduras: 'Honduran',
    ElSalvador: 'Salvadoran',
    Nicaragua: 'Nicaraguan',
    CostaRica: 'Costa Rican',
    Panama: 'Panamanian',
    'South Africa': 'South African',
    Nigeria: 'Nigerian',
    Kenya: 'Kenyan',
    Ghana: 'Ghanaian',
    Ethiopia: 'Ethiopian',
    Tanzania: 'Tanzanian',
  };

  useEffect(() => {
    if (!name) return;
    setLoadingCountry(true);
    let cancelled = false;

    axios
      .get(`https://restcountries.com/v3.1/name/${encodeURIComponent(name)}?fullText=true`)
      .then((response) => {
        if (cancelled) return;
        const c = Array.isArray(response.data) ? response.data[0] : response.data;
        setCountry(c || null);
      })
      .catch((error) => {
        if (!cancelled) console.error(error);
        if (!cancelled) setCountry(null);
      })
      .finally(() => {
        if (!cancelled) setLoadingCountry(false);
      });

    return () => {
      cancelled = true;
    };
  }, [name]);

  useEffect(() => {
    if (!country) return;
    const area = countryToMealArea[country.name?.common];
    if (!area) {
      setMeals([]);
      setLoadingMeals(false);
      return;
    }

    setLoadingMeals(true);
    let cancelled = false;

    axios
      .get(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${encodeURIComponent(area)}`)
      .then((response) => {
        if (cancelled) return;
        setMeals(response.data?.meals || []);
      })
      .catch((error) => {
        if (!cancelled) console.error(error);
        if (!cancelled) setMeals([]);
      })
      .finally(() => {
        if (!cancelled) setLoadingMeals(false);
      });

    return () => {
      cancelled = true;
    };
  }, [country]);

  if (loadingCountry) return <p>Loading country...</p>;
  if (!country) return <p>Country not found.</p>;

  const currencyKeys = country.currencies ? Object.keys(country.currencies) : [];

  return (
    <>
      <div style={{ display: 'flex', gap: 16, alignItems: 'flex-start', marginBottom: 12 }}>
        {country.flags?.png && (
          <img src={country.flags.png} alt={`${country.name?.common} flag`} style={{ width: 180, height: 120, objectFit: 'cover' }} />
        )}
        <div>
          <p>
            <b>Name:</b> {country.name?.official || country.name?.common}
          </p>
          <p>
            <b>Capital:</b> {Array.isArray(country.capital) ? country.capital.join(', ') : country.capital || '—'}
          </p>
          <p>
            <b>Region:</b> {country.region || '—'}
          </p>
          <p>
            <b>Population:</b> {country.population ? country.population.toLocaleString() : '—'}
          </p>
        </div>
      </div>

      <section>
        <h3>Currency</h3>
        {currencyKeys.length ? (
          currencyKeys.map((code) => {
            const info = country.currencies[code] || {};
            return (
              <p key={code}>
                <b>Code:</b> {code} <br />
                <b>Name:</b> {info.name || '—'} <br />
                <b>Symbol:</b> {info.symbol || '—'}
              </p>
            );
          })
        ) : (
          <p>No currency data</p>
        )}
      </section>

      {country.coatOfArms?.png && (
        <img src={country.coatOfArms.png} alt={`${country.name?.common} coat of arms`} style={{ width: 120, marginTop: 12 }} />
      )}

      <hr style={{ margin: '16px 0' }} />

      <h2>Meals from {country.name?.common}</h2>
      {loadingMeals && <p>Loading meals...</p>}
      {!loadingMeals && meals.length === 0 && <p>No meals found for this country.</p>}

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 12, marginTop: 12 }}>
        {meals.map((meal) => (
          <div key={meal.idMeal} className="card" style={{ padding: 8 }}>
            <img src={meal.strMealThumb} alt={meal.strMeal} style={{ width: '100%', height: 120, objectFit: 'cover' }} />
            <div style={{ marginTop: 8 }}>
              <strong>{meal.strMeal}</strong>
              <div style={{ marginTop: 8 }}>
                {/* use SingleMeal component for inline details if you want — here we link to the meal page */}
                <a href={`/meal/${meal.idMeal}`} className="btn btn-sm btn-outline">
                  View Recipe
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}