/* eslint-disable react/style-prop-object */
import React, { useContext, useState } from "react";
//import Tabs from "../../Helpers/Tabs/Tabs";
import Searchbar from "../../Helpers/Searchbar/Searchbar";
import { filtrationcontext } from "../../../context/Filtercontext";

export default function VehicleHead() {
  //const [activeItem, setActiveItem] = useState("All vehicles");
  const { setVehiclesSearchQuery } = useContext(filtrationcontext);
  const [query, setQuery] = useState("");
  const handleSearch = (e) => {
    setQuery(e.target.value);
    setVehiclesSearchQuery(e.target.value);
  };

  /*const handleActive = (item) => {
    if (item !== activeItem) {
      setActiveItem(item);
    }
  };*/

  return (
    <>
      <div className="bg-white p-16">
        <div className="flex-between">
          {/**<div className="flex-between">
            <Tabs
              title="All vehicles"
              isActive={activeItem === "All vehicles"}
              onClick={() => handleActive("All vehicles")}
            />
            <Tabs
              title="Active"
              isActive={activeItem === "Active"}
              onClick={() => handleActive("Active")}
              style="tabs mx-2"
            />
            <Tabs
              title="Pending"
              isActive={activeItem === "Pending"}
              onClick={() => handleActive("Pending")}
              style="tabs me-2"
            />
            <Tabs
              title="Archived"
              isActive={activeItem === "Archived"}
              onClick={() => handleActive("Archived")}
              style="tabs"
            />
          </div>**/}
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