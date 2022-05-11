import "../CSS/SearchPage.css";
import React, { useState } from "react";
import { Button } from "react-bootstrap";
import BasicSearch from "../components/BasicSearch";
import AdvancedSearch from "../components/AdvancedSearch";
import DisplayPetsCards from "../components/DisplayPetsCards";

function SearchPage() {
  const [displayBasic, setDisplayBasic] = useState(true);
  const [searchResults, setSearchResults] = useState("");
  const [serverErr, setServerErr] = useState("");

  return (
    <div id="searchPage">
      <div id="searchPageBtns">
        <Button
          variant="primary"
          size="lg"
          onClick={() => {
            setSearchResults("");
            setDisplayBasic(true);
          }}
        >
          Basic Search
        </Button>
        &nbsp; &nbsp;
        <Button
          variant="primary"
          size="lg"
          onClick={() => {
            setSearchResults("");
            setDisplayBasic(false);
          }}
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
          <AdvancedSearch
            setSearchResults={setSearchResults}
            setServerErr={setServerErr}
          />
        )}
      </div>

      <div id="searchDisplayResults">
        {searchResults && searchResults.length !== 0 && (
          <DisplayPetsCards pets={searchResults} />
        )}
      </div>
    </div>
  );
}

export default SearchPage;
