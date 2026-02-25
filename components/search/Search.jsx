"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

const Search = ({ fromList }) => {
  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const pathname = usePathname();

  const [serachTerm, setSearchTerm] = useState({
    destination: "",
    checkin: "",
    checkout: "",
  });

  const [allowSearch, setAllowSearch] = useState(true);

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
  };

  const doSearch = () => {
    const params = new URLSearchParams(serachTerm);
  };

  return (
    <>
      <div className="lg:max-h-[250px] mt-6">
        <div id="searchParams" className={fromList && "!shadow-none"}>
          <div>
            <span>Destination</span>
            <h4 className="mt-2">
              <select
                onChange={handleInputs}
                name="destination"
                id="destination"
              >
                <option value="Bali">Bali</option>
                <option value="Bali">Cox's Bazar</option>
                <option value="Bali">Sylhet</option>
                <option value="Bali">Saint Martin</option>
                <option value="Bali">Bali</option>
              </select>
            </h4>
          </div>

          <div>
            <span>Check in</span>
            <h4 className="mt-2">
              <input
                type="date"
                name="checkin"
                id="checkin"
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
                onChange={handleInputs}
              />
            </h4>
          </div>
        </div>
      </div>

      <button
        disabled={!allowSearch}
        className={
          allowSearch
            ? "search-btn"
            : "bg-gray-400 cursor-not-allowed search-btn"
        }
        onClick={doSearch}
      >
        🔍️ {fromList ? "Modify Search" : "Search"}
      </button>
    </>
  );
};

export default Search;
