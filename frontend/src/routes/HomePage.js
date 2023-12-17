import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import "../App.css";
import "./HomePage.css";
import SearchBar from "../components/SearchBar.js";
import { useGetRatingsByProfessorQuery } from "../slices/ratingsSlice";

const CAMPUS = "https://s29068.pcdn.co/wp-content/uploads/68th-street-campus.jpg.optimal.jpg";
export default function HomePage() {
    const [professorName, setProfessorName] = useState('');
    const { data: ratingArray, error, isLoading, refetch } = useGetRatingsByProfessorQuery(
      professorName,
      { skip: professorName === '' }
    );

    const handleSearch = (searchTerm) => {
      setProfessorName(searchTerm);
    };

    const handleSearchBarSearch = () => {
      if (professorName !== '') {
        refetch({ professor_name: professorName });
      }
    };

    return (
        <div>
        <div className="home">
            <img src={CAMPUS} alt="Image of campus" className = "campus" />
            <div className="content">
                <h2>Search for <span className="purple-text">Professor</span></h2>
                <SearchBar onSearch={handleSearch} onSearchBarSearch={handleSearchBarSearch} />
            </div>
        </div>
        <div className="ratings-section">
            {professorName && (
              <>
                <h2>Ratings for {professorName}:</h2>
                {isLoading && <p>Loading...</p>}
                {error && <p>Error fetching ratings: {error.message}</p>}
                {ratingArray && (
                  <ul>
                    {ratingArray.map((rating) => (
                      <div key={rating._id} className = "rating">
                        <h1 className="profname">{rating.professor_name}</h1>
                        <p className="comment">{rating.comment}</p>
                        <p className="rating">Rating: {rating.professor_rating}/5</p>
                      </div>
                    ))}
                  </ul>
                )}
              </>
            )}
        </div>
        </div>
        
    )
}