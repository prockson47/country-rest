import React from "react";
import { Link } from "react-router-dom";

type CountryCardProps = {
  countryData: {
    name: string;
    flag: string;
    population: number;
    region: string;
    capital: string;
  };
};

const CountryCard: React.FC<CountryCardProps> = ({ countryData }) => {
  return (
    <Link to={`/country/${countryData.name}`}>
      <div className="country-card">
        <img src={countryData.flag} alt="Flag" />
        <h3>{countryData.name}</h3>
        <p>Population: {countryData.population.toLocaleString()}</p>
        <p>Region: {countryData.region}</p>
        <p>Capital: {countryData.capital}</p>
      </div>
    </Link>
  );
};

export default CountryCard;
