import React, { useState } from "react";
import { Button } from "react-bootstrap";
import "./SearchPage.css";
import BasicSearch from "../components/BasicSearch";
import AdvancedSearch from "../components/AdvancedSearch";
import DisplayPets from "../components/DisplayPets";


function SearchPage(props) {
  const [displayBasic, setDisplayBasic] = useState(true);
  const [searchResults, setSearchResults] = useState("");
  const [serverErr, setServerErr] = useState("");

  return (
    <div id="searchPage">
      <div id="searchBar">
        <Button
          variant="outline-success"
          size="lg"
          onClick={() => setDisplayBasic(true)}
        >
          Basic Search
        </Button>
        &nbsp; &nbsp;
        <Button
          variant="outline-success"
          size="lg"
          onClick={() => setDisplayBasic(false)}
        >
          Advanced Search
        </Button>
      </div>
      <div id="searchOptions">
        {displayBasic ? (
          <BasicSearch
            setSearchResults={setSearchResults}
            setServerErr={setServerErr}
          />
        ) : (
          <AdvancedSearch />
        )}
      </div>
      <div id="displayResults">
        {searchResults && searchResults.length !== 0 && (
          <DisplayPets petsToDisplay={searchResults} />
        )}
      </div>
    </div>
  );
}

export default SearchPage;
