import React from "react";

const People = ({ people }) => {
  return (
    <>
      {people.map((person, i) => {
        return (
          <ul key={i}>
            <li>{person.name}</li>
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
