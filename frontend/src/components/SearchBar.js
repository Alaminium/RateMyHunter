import React, { useState } from "react";
import "./SearchBar.css";
import { useGetRatingsByProfessorQuery } from "../slices/ratingsSlice";

import { FaSearch } from "react-icons/fa";

export default function SearchBar({ onSearch, onSearchBarSearch }) {
    const [professorName, setProfessorName] = useState('');

    const handleSearch = () => {
      if (professorName !== '') {
        onSearch(professorName);
        onSearchBarSearch();
      }
    };

    const enterKey = (e) =>{
        if(e.key == 'Enter'){
            handleSearch(e);
        }
    };

    return (
      <div className="search-input">
        <input
          placeholder="Type Professor's Name"
          value={professorName}
          onChange={(e) => setProfessorName(e.target.value)}
          onKeyDown={enterKey}
        />
        <FaSearch id="search-icon" onClick={handleSearch} />
      </div>
    );
}