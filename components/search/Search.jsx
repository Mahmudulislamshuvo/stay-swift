// "use client";

// import { usePathname, useRouter, useSearchParams } from "next/navigation";
// import { useState } from "react";

// const Search = ({ fromList, destination, checkin, checkout }) => {
//   const searchParams = useSearchParams();
//   const { replace } = useRouter();
//   const pathname = usePathname();

//   const [serachTerm, setSearchTerm] = useState({
//     destination: destination,
//     checkin: checkin,
//     checkout: checkout,
//   });

//   const [allowSearch, setAllowSearch] = useState(true);

//   const handleInputs = (e) => {
//     const { name, value } = e.target;

//     const updatedSearchTerm = {
//       ...serachTerm,
//       [name]: value,
//     };

//     if (
//       new Date(updatedSearchTerm.checkin) > new Date(updatedSearchTerm.checkout)
//     ) {
//       setAllowSearch(false);
//     } else {
//       setAllowSearch(true);
//     }

//     setSearchTerm(updatedSearchTerm);
//   };

//   const doSearch = () => {
//     const params = new URLSearchParams(serachTerm);

//     params.set("destination", serachTerm?.destination);

//     if (serachTerm.checkin && serachTerm.checkout) {
//       params.set("checkin", serachTerm?.checkin);
//       params.set("checkout", serachTerm?.checkout);
//     }

//     if (pathname.includes("hotels")) {
//       replace(`${pathname}?${params.toString()}`);
//     } else {
//       replace(`${pathname}hotels?${params.toString()}`);
//     }
//   };

//   return (
//     <>
//       <div className="lg:max-h-[250px] mt-6">
//         <div id="searchParams" className={fromList && "!shadow-none"}>
//           <div>
//             <span>Destination</span>
//             <h4 className="mt-2">
//               <select
//                 onChange={handleInputs}
//                 name="destination"
//                 id="destination"
//                 defaultValue={serachTerm.destination}
//               >
//                 <option value="Bali">Bali</option>
//                 <option value="Puglia">Puglia</option>
//                 <option value="Fethiye">Fethiye</option>
//                 <option value="Saint Martin">Saint Martin</option>
//                 <option value="Khulna">Khulna</option>
//               </select>
//             </h4>
//           </div>

//           <div>
//             <span>Check in</span>
//             <h4 className="mt-2">
//               <input
//                 type="date"
//                 name="checkin"
//                 id="checkin"
//                 defaultValue={serachTerm.checkin}
//                 onChange={handleInputs}
//               />
//             </h4>
//           </div>

//           <div>
//             <span>Checkout</span>
//             <h4 className="mt-2">
//               <input
//                 type="date"
//                 name="checkout"
//                 id="checkout"
//                 defaultValue={serachTerm.checkout}
//                 onChange={handleInputs}
//               />
//             </h4>
//           </div>
//         </div>
//       </div>

//       <button
//         disabled={!allowSearch}
//         className={allowSearch ? "search-btn" : "search-btn-disabled"}
//         onClick={doSearch}
//       >
//         🔍️ {fromList ? "Modify Search" : "Search"}
//       </button>
//     </>
//   );
// };

// export default Search;

"use client";

import { getDestinations } from "@/database/queries";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const Search = ({ fromList, destination, checkin, checkout }) => {
  const { replace } = useRouter();
  const pathname = usePathname();

  const [serachTerm, setSearchTerm] = useState({
    destination: destination,
    checkin: checkin,
    checkout: checkout,
  });

  const [allowSearch, setAllowSearch] = useState(true);
  const [destinations, setDestinations] = useState([]);
  const [showDestinations, setShowDestinations] = useState(false);

  useEffect(() => {
    const fetchDestinations = async () => {
      if (serachTerm.destination) {
        const results = await getDestinations(serachTerm.destination);
        setDestinations(results);
      }
    };
    fetchDestinations();
  }, [serachTerm.destination]);

  const handleInputs = (e) => {
    const { name, value } = e.target;

    const updatedSearchTerm = {
      ...serachTerm,
      [name]: value,
    };

    if (
      new Date(updatedSearchTerm.checkin) > new Date(updatedSearchTerm.checkout)
    ) {
      setAllowSearch(false);
    } else {
      setAllowSearch(true);
    }

    setSearchTerm(updatedSearchTerm);

    if (name === "destination") {
      setShowDestinations(true);
    }
  };

  const selectDestination = (dest) => {
    setSearchTerm({
      ...serachTerm,
      destination: dest,
    });
    setShowDestinations(false);
  };

  const doSearch = () => {
    const params = new URLSearchParams();

    params.set("destination", serachTerm?.destination);

    if (serachTerm.checkin && serachTerm.checkout) {
      params.set("checkin", serachTerm?.checkin);
      params.set("checkout", serachTerm?.checkout);
    }

    if (pathname.includes("hotels")) {
      replace(`${pathname}?${params.toString()}`);
    } else {
      replace(`${pathname}hotels?${params.toString()}`);
    }
  };

  return (
    <>
      <div className="lg:max-h-[250px] mt-6">
        <div id="searchParams" className={fromList && "!shadow-none"}>
          <div>
            <span>Destination</span>
            <h4 className="mt-2 relative">
              <input
                type="text"
                onChange={handleInputs}
                onFocus={() => setShowDestinations(true)}
                onBlur={() => {
                  setTimeout(() => setShowDestinations(false), 200);
                }}
                name="destination"
                id="destination"
                placeholder="Where are you going?"
                value={serachTerm.destination}
                autoComplete="off"
                className="w-full px-4 py-2 rounded-md border border-black/20 bg-transparent"
              />
              {showDestinations && destinations.length > 0 && (
                <ul className="absolute left-0 top-full bg-white w-full shadow-md rounded-md z-10 max-h-48 overflow-y-auto">
                  {destinations.map((d) => (
                    <li
                      key={d}
                      className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-black"
                      onClick={() => selectDestination(d)}
                    >
                      {d}
                    </li>
                  ))}
                </ul>
              )}
            </h4>
          </div>

          <div>
            <span>Check in</span>
            <h4 className="mt-2">
              <input
                type="date"
                name="checkin"
                id="checkin"
                value={serachTerm.checkin}
                onChange={handleInputs}
              />
            </h4>
          </div>

          <div>
            <span>Checkout</span>
            <h4 className="mt-2">
              <input
                type="date"
                name="checkout"
                id="checkout"
                value={serachTerm.checkout}
                onChange={handleInputs}
              />
            </h4>
          </div>
        </div>
      </div>

      <button
        disabled={!allowSearch}
        className={allowSearch ? "search-btn" : "search-btn-disabled"}
        onClick={doSearch}
      >
        🔍️ {fromList ? "Modify Search" : "Search"}
      </button>
    </>
  );
};

export default Search;
