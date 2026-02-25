"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

const Search = ({ fromList, destination, checkin, checkout }) => {
  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const pathname = usePathname();

  const [serachTerm, setSearchTerm] = useState({
    destination: destination || "Sylhet",
    checkin: checkin,
    checkout: checkout,
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
            <h4 className="mt-2">
              <select
                onChange={handleInputs}
                name="destination"
                id="destination"
                defaultValue={serachTerm.destination}
              >
                <option value="Bali">Bali</option>
                <option value="Cox's Bazar">Cox's Bazar</option>
                <option value="Sylhet">Sylhet</option>
                <option value="Saint Martin">Saint Martin</option>
                <option value="Khulna">Khulna</option>
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
                defaultValue={serachTerm.checkin}
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
                defaultValue={serachTerm.checkout}
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
