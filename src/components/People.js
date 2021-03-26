import React from "react";
import { Link } from "react-router-dom";

const People = ({ people }) => {
  //to get "id" of each character from associated url
  let regex = /\d+/g;

  return (
    <>
      {people.results.map((person, i) => {
        return (
          <ul key={i}>
            <li>
              <Link to={`/character/${person.url.match(regex)}`}>
                {person.name}
              </Link>
            </li>
            <ul>
              <li>Birth Year: {person.birth_year}</li>
              <li>Height: {person.height}</li>
              <li>Mass: {person.mass}</li>
            </ul>
          </ul>
        );
      })}
    </>
  );
};

export default People;
