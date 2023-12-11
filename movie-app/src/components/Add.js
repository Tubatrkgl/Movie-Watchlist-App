import React, { useEffect, useState } from 'react';
import ResultCard from "../components/ResultCard"
import axios from 'axios';

const Add = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const onChange = (e) => {
    e.preventDefault();
    setQuery(e.target.value);
  };

  const fetchData = async () => {
    try {
      const response = await axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${process.env.REACT_APP_TMDB_KEY}&language=en-US&page=1&include_adult=false&query=${query}`);


      const data = response.data;


      if (!data.errors) {
        setResults(data.results);
      } else {
        setResults([]);
      }
    } catch (error) {

      console.error("Error fetching data:", error);
    }
  };
  useEffect(() => {
    fetchData();
  }, [query])


  return (
    <div className="add-page">
      <div className="container">
        <div className="add-content">
          <div className="input-wrapper">
            <input
              type="text"
              placeholder="Search for a movie"
              value={query}
              onChange={onChange}
            />
          </div>
          {
            results.length > 0 && (
              <ul className='results'>
                {results.map((movie) => (
                  <li key={movie.id}>
                    <ResultCard movie={movie} />
                  </li>
                ))}
              </ul>
            )
          }
        </div>
      </div>
    </div>
  );
};

export default Add;
