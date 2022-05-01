import React, { useState } from "react";
import { Button } from "react-bootstrap";
import "./SearchPage.css";
import BasicSearch from "../components/BasicSearch";
import AdvancedSearch from "../components/AdvancedSearch";
import DisplayResults from "../components/DisplayResults";
import PetCard from "../components/PetCard";
import { useNavigate } from "react-router-dom";

function SearchPage(props) {
  const [displayBasic, setDisplayBasic] = useState(true);
  const [searchResults, setSearchResults] = useState("");
  const [serverErr, setServerErr] = useState("");
  const navigate = useNavigate();

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
          <DisplayResults
            elementsToDisplay={searchResults}
            ChildComponent={PetCard}
            action={(element) => navigate("/pet/" + element._id)}
          />
        )}
      </div>
    </div>
  );
}

export default SearchPage;
