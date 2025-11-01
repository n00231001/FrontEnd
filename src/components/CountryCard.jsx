import { Link } from 'react-router';
 
 export default function CountryCard({ flagImg, name, capital }) {
   return (
     <div className="card bg-[#162455] shadow-sm w-full p-2 flex flex-row items-center gap-4">
       {/* Flag section */}
       <Link to={`/country/${name}`} className="flex-shrink-0 w-32 h-20">
         <img
           alt={name}
           src={flagImg}
           className="w-full h-full object-cover rounded-md"
         />
       </Link>
 
       {/* Info section */}
       <div className="flex-1 text-white p-2 rounded-md">
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
        <div>
       
       </div>
     </div>
   );
 }
