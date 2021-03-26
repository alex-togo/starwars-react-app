import React from "react";
import { useState, useEffect } from "react";
import People from "../components/People";
import { fetchData } from "../helpers/fetchData";

const ListPage = () => {
  const [people, setPeople] = useState(null);
  const [url, setUrl] = useState(`https://swapi.dev/api/people/`);

  useEffect(() => {
    let isChanged = true;
    fetchData(url).then((data) => {
      if (isChanged) {
        setPeople(data);
      }
    });
    return () => {
      isChanged = false;
    };
  }, [url]);

  return (
    <>
      <div>
        {people === null ? <p>Loading...</p> : <People people={people} />}
        <button
          onClick={() => {
            people.previous === null || setUrl(people.previous);
          }}
        >
          Previous Page
        </button>
        <button
          onClick={() => {
            people.next === null || setUrl(people.next);
          }}
        >
          Next Page
        </button>
      </div>
    </>
  );
};

export default ListPage;
