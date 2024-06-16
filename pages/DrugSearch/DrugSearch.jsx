import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const DrugSearch = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSearch = async () => {
    try {
      const response = await axios.get(`https://rxnav.nlm.nih.gov/REST/drugs.json?name=${query}`);
      if (response.data.drugGroup.conceptGroup) {
        setResults(response.data.drugGroup.conceptGroup.flatMap(group => group.conceptProperties || []));
        setError('');
      } else {
        const suggestionResponse = await axios.get(`https://rxnav.nlm.nih.gov/REST/spellingsuggestions.json?name=${query}`);
        if (suggestionResponse.data.suggestionGroup.suggestionList) {
          setResults(suggestionResponse.data.suggestionGroup.suggestionList.suggestion || []);
          setError('');
        } else {
          setError('No results found');
          setResults([]);
        }
      }
    } catch (err) {
      setError('Error fetching data');
    }
  };

  const handleResultClick = (name) => {
    navigate(`/drugs/${name}`);
  };

  return (
    <div>
      <h1>Search for drugs!</h1>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Enter drug name"
      />
      <button onClick={handleSearch}>Search</button>
      {error && <p>{error}</p>}
      <ul>
        {results.map(result => (
          <li key={result.rxcui || result}>
            <button onClick={() => handleResultClick(result.name || result)}>{result.name || result}</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DrugSearch;
