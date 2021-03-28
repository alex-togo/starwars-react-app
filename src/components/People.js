import React from "react";
import { Link } from "react-router-dom";

const People = ({ people }) => {
  //to get "id" of each character from associated url
  let regex = /\d+/g;

  return (
    <>
      <table style={{ width: "50%" }}>
        <tr>
          <th>Name</th>
          <th>Birth Year</th>
          <th>Height</th>
          <th>Mass</th>
        </tr>
        {people.results.map((person, i) => {
          return (
            <tr>
              <td>
                <Link
                  className="nameLink"
                  to={`/character/${person.url.match(regex)}`}
                >
                  {person.name}
                </Link>
              </td>
              <td>{person.birth_year}</td>
              <td>{person.height}cm</td>
              <td>{person.mass}kg</td>
            </tr>
          );
        })}
      </table>
    </>
  );
};

export default People;
