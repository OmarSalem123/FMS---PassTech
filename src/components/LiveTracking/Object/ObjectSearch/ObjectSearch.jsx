/* eslint-disable react/style-prop-object */
import React, { useContext, useEffect, useState } from "react";
import Searchbar from "../../../Helpers/Searchbar/Searchbar";
import ObjectUsers from "../ObjectUsers/ObjectUsers";
import { popupcontext } from "../../../../context/Popupscontext";
import Button from "../../../Helpers/Button/Button";
import { filtrationcontext } from "../../../../context/Filtercontext";
import { useLocation } from "react-router-dom";

export default function ObjectSearch() {
  const { display, handleShow, setDisplay } = useContext(popupcontext);
  const { setObjectSearchQuery, setGeofencesSearchQuery } =
    useContext(filtrationcontext); 
  const [query, setQuery] = useState("");
  let { pathname } = useLocation();
  useEffect(() => {
    
    if (pathname !== "/livetracking") {
      setQuery(""); 
      setObjectSearchQuery(""); 
    }
  }, [pathname, setObjectSearchQuery]);
  useEffect(() => {
    return () => {
      setDisplay(false);
    };
  }, [setDisplay]);

  const handleSearch = (e) => {
    if (pathname === "/livetracking") {
      setQuery(e.target.value);
      setObjectSearchQuery(e.target.value);
    } else {
      setQuery(e.target.value);
      setGeofencesSearchQuery(e.target.value);
    }
  };
  return (
    <>
      <div className="d-flex align-items-center p-8 my-8">
        <div className="object-search w-100">
          <Searchbar
            style="search-dark input-group"
            path="/assets/dark/search.svg"
            placeholder="Search..."
            value={query}
            onChange={handleSearch}
          />
        </div>

        {pathname === "/livetracking" && (
          <Button
            text="Users"
            textstyle="fs-14 neutral-500"
            style="button btn-default object-btn p-8-16 ms-2"
            type="button"
            onClick={() => {
              handleShow("objectUsers");
            }}
          />
        )}
      </div>
      {display && <ObjectUsers />}
    </>
  );
}
