import React from "react";

function SearchBar({ setSearchTerm }) {
  return (
    <div className="mb-4">
      <input
        type="text"
        placeholder="Search Pokémon"
        className="w-full p-2 border rounded"
        onChange={(e) => setSearchTerm(e.target.value)}
      />
    </div>
  );
}

export default SearchBar;
