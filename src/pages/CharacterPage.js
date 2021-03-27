import React from "react";
import { useHistory } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchCharacter, fetchData } from "../helpers/fetchData";

const CharacterPage = ({ match }) => {
  const [person, setPerson] = useState(null);
  const [starships, setStarships] = useState(null);
  let history = useHistory();

  useEffect(() => {
    let isChanged = true;
    let allStarships = [];

    fetchCharacter(match.params.id)
      .then((data) => {
        if (isChanged) {
          setPerson(data);
          return data;
        }
      })
      .then((data) => {
        for (const s of data.starships) {
          fetchData(s).then((starship) => {
            allStarships.push(starship.name);
          });
        }
        setStarships(allStarships);
      });

    return () => {
      isChanged = false;
    };
  }, [match]);

  return (
    <>
      {person === null ? (
        <p>Loading...</p>
      ) : (
        <ul>
          <li>Name: {person.name}</li>
          <li>Height: {person.height}</li>
          <li>Mass: {person.mass}</li>
          <li>Hair Color: {person.hair_color}</li>
          <li>Skin Color: {person.skin_color}</li>
          <li>Eye Color: {person.eye_color}</li>
          <li>Birth Year: {person.birth_year}</li>
          <li>Gender: {person.gender}</li>
          <li>Homeworld: {person.homeworld}</li>
          <li>Films: {person.films}</li>
          <li>Species: {person.species}</li>
          <li>Starships:</li>
          <ul>
            {starships !== null &&
              starships.map((ship, i) => {
                return <li key={i}>{ship}</li>;
              })}
          </ul>
        </ul>
      )}
      <button onClick={() => history.goBack()}>Back</button>
    </>
  );
};

export default CharacterPage;
