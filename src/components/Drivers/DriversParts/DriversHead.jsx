/* eslint-disable react/style-prop-object */
import React, { useContext, useState } from "react";
import Searchbar from "../../Helpers/Searchbar/Searchbar";
import Button from "../../Helpers/Button/Button";
import { filtrationcontext } from "../../../context/Filtercontext";
export default function DriversHead() {
  const { setSearchQuery } = useContext(filtrationcontext);
  const [query, setQuery] = useState("");
  const handleSearch = (e) => {
    setQuery(e.target.value);
    setSearchQuery(e.target.value);
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
          <div className="flex-between">
            <Button
              style="button fw-400 fs-16 p-4-12 btn-default me-2"
              text="Filter"
              img2="Downarrow.svg"
            />
            <Button style="button btn-default" img2="Preferences.svg" />
          </div>
        </div>
      </div>
    </>
  );
}