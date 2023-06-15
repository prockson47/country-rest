import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import CountryCard from "./Components/CountryCard";
import CountryDetails from "./Components/CountryDetails";

type Country = {
  name: string;
  flag: string;
  population: number;
  region: string;
  capital: string;
};

const App: React.FC = () => {
  const [countries, setCountries] = useState<Country[]>([]);
  const [filteredCountries, setFilteredCountries] = useState<Country[]>([]);
  const [searchValue, setSearchValue] = useState("");
  const [selectedRegion, setSelectedRegion] = useState("");

  useEffect(() => {
    const fetchCountries = async () => {
      const response = await fetch("https://restcountries.com/v2/all");
      const data = await response.json();
      setCountries(data);
      setFilteredCountries(data);
    };

    fetchCountries();
  }, []);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSearchValue(value);
    filterCountries(value, selectedRegion);
  };

  const handleRegionChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    setSelectedRegion(value);
    filterCountries(searchValue, value);
  };

  const filterCountries = (searchValue: string, selectedRegion: string) => {
    let filtered = countries;

    if (searchValue) {
      filtered = filtered.filter((country) =>
        country.name.toLowerCase().includes(searchValue.toLowerCase())
      );
    }

    if (selectedRegion) {
      filtered = filtered.filter(
        (country) => country.region === selectedRegion
      );
    }

    setFilteredCountries(filtered);
  };

  return (
    <Router>
      <div>
        <div className="search-container">
          <span className="search-icon">
            <i className="fa fa-search" aria-hidden="true"></i>
          </span>
          <input
            type="text"
            placeholder="Search by country"
            className="countrySearch"
            value={searchValue}
            onChange={handleSearch}
          />
        </div>

        <div className="dropdown">
          <select
            id="region-select"
            value={selectedRegion}
            onChange={handleRegionChange}
          >
            <option value="">Filter by Region</option>
            <option value="Africa">Africa</option>
            <option value="Americas">Americas</option>
            <option value="Asia">Asia</option>
            <option value="Europe">Europe</option>
            <option value="Oceania">Oceania</option>
          </select>
        </div>

        <div className="country-grid">
          {filteredCountries.map((country) => (
            <Link key={country.name} to={`/country/${country.name}`}>
              <CountryCard countryData={country} />
            </Link>
          ))}
        </div>

        <Switch>
          <Route path="/country/:name">
            <CountryDetails />
          </Route>
        </Switch>
      </div>
    </Router>
  );
};

export default App;
