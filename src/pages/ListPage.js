import React from "react";
import { useState, useEffect } from "react";
import People from "../components/People";

const fetchPeople = async () => {
  return fetch(`https://swapi.dev/api/people/`)
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

  useEffect(() => {
    fetchPeople().then((data) => {
      setPeople(data.results);
    });
  }, []);

  return (
    <>
      <div>
        {people === null ? <p>Loading...</p> : <People people={people} />}
      </div>
    </>
  );
};

export default ListPage;
