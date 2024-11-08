/* eslint-disable react/style-prop-object */
import React, { useContext, useState } from "react";
import Searchbar from "../../Helpers/Searchbar/Searchbar";
import { filtrationcontext } from "../../../context/Filtercontext";

export default function UsersHead() {
  //const [activeItem, setActiveItem] = useState("All vehicles");
  const { setUsersSearchQuery } = useContext(filtrationcontext);
  const [query, setQuery] = useState("");
  const handleSearch = (e) => {
    setQuery(e.target.value);
    setUsersSearchQuery(e.target.value);
  };

  return (
    <>
      <div className="bg-white p-16">
        <div className="flex-between">
          <Searchbar
            style="search search-dark input-group"
            path="/assets/search.svg"
            placeholder="Search"
            value={query}
            onChange={handleSearch}
          />
        </div>
      </div>
    </>
  );
}
