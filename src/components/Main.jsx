import { useEffect, useState } from "react";
import Loader from "./Loader.jsx";

export default function Main() {
  const regions = [
    { value: "all", label: "Filter by Region" },
    { value: "Africa", label: "Africa" },
    { value: "Americas", label: "Americas" },
    { value: "Asia", label: "Asia" },
    { value: "Europe", label: "Europe" },
    { value: "Oceania", label: "Oceania" },
  ];

  const [country, setCountry] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData("https://restcountries.com/v3.1/all");
  }, []);

  function fetchData(url) {
    setLoading(true);
    fetch(url)
      .then((response) => response.json())
      .then((data) => setCountry(data))
      .finally(() => setLoading(false));
  }

  function regionn(e) {
    const region = e.target.value;
    const url =
      region === "all"
        ? "https://restcountries.com/v3.1/all"
        : `https://restcountries.com/v3.1/region/${region}`;
    fetchData(url);
  }

  if (loading) {
    return <Loader />;
  }

  return (
    <>
      <div className="flex justify-center my-12">
        <div className="flex max-[800px]:flex-col max-[800px]:items-start justify-between w-[75%]">
          <label className="input input-bordered flex items-center gap-2 max-[800px]:mb-4">
            <input
              type="text"
              className="w-[380px] max-[800px]:w-[200px] rounded-xl"
              placeholder="Search"
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="h-4 w-4 opacity-70"
            >
              <path
                fillRule="evenodd"
                d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                clipRule="evenodd"
              />
            </svg>
          </label>

          <select
            onChange={regionn}
            className="select select-bordered w-[200px] rounded-xl"
          >
            {regions.map((region) => (
              <option key={region.value} value={region.value}>
                {region.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="flex justify-center">
        <div className="grid grid-cols-4 max-[1880px]:grid-cols-3 max-[1400px]:grid-cols-2 max-[800px]:grid-cols-1 gap-32 max-w-[75%]">
          {country?.map((country) => (
            <div
              key={country.name.common}
              className="w-[264px] bg-base-100 rounded-xl shadow-xl"
            >
              <img
                className="w-[264px] max-h-[160px] object-cover"
                src={country.flags.png}
                alt={country.flags.alt || "Flag"}
              />
              <div className="flex flex-col gap-2 py-4 mx-4">
                <h2 className="font-bold">{country.name.common}</h2>
                <p>
                  <span className="font-medium">Population:</span>{" "}
                  {country.population}
                </p>
                <p>
                  <span className="font-medium">Region:</span> {country.region}
                </p>
                <p>
                  <span className="font-medium">Capital:</span>{" "}
                  {country.capital || "N/A"}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
