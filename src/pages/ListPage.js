import React from "react";
import { useState, useEffect } from "react";
import People from "../components/People";

const fetchPeople = async (url) => {
  return fetch(url)
    .then((res) => {
      if (res.status > 400) {
        throw new Error("Bad response from server");
      }
      return res;
    })
    .then((res) => {
      return res.json();
    });
};

const ListPage = () => {
  const [people, setPeople] = useState(null);
  const [url, setUrl] = useState(`https://swapi.dev/api/people/`);

  useEffect(() => {
    let isChanged = true;
    fetchPeople(url).then((data) => {
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
            console.log(people.previous);
            people.previous === null || setUrl(people.previous);
          }}
        >
          Previous Page
        </button>
        <button
          onClick={() => {
            console.log(people.next);
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
