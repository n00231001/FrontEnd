import { Link } from 'react-router';
import singleMeal from '../pages/SingleMeal.jsx';
 
 export default function CountryCard({ flagImg, name, capital }) {
   return (
     <div className="card bg-base-100 shadow-sm w-full p-4 flex flex-row items-center gap-4">
       {/* Flag section */}
       <Link to={`/country/${name}`} className="flex-shrink-0 w-32 h-20">
         <img
           alt={name}
           src={flagImg}
           className="w-full h-full object-cover rounded-md"
         />
       </Link>
 
       {/* Info section */}
       <div className="flex-1 bg-gray-400 text-zinc-800 p-4 rounded-md border border-red-200">
         <p>
           <b>Name: </b>
           <Link
             to={`/country/${name}`}
             className="text-blue-600 hover:underline"
           >
             {name}
           </Link>
         </p>
         <p>
           <b>Capital: </b> {Array.isArray(capital) ? capital.join(', ') : capital}
         </p>
       </div>
 
       {/* View Recipe Button */}
       <div>
        <Link
          to={`/meal/${name}`}
          className="btn btn-outline btn-primary"
        >
          View {name} Meals
        </Link>
       
       </div>
     </div>
   );
 }
