import React, { useState } from "react";
import { Button } from "react-bootstrap";
import "./SearchPage.css";
import BasicSearch from "../components/BasicSearch";
import AdvancedSearch from "../components/AdvancedSearch";

function SearchPage(props) {
  const [displayBasic, setDisplayBasic] = useState(true);
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
        {displayBasic ? <BasicSearch /> : <AdvancedSearch />}
      </div>
      <div id="displayResults"></div>
    </div>
  );
}

export default SearchPage;
