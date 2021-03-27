import React from "react";
import { useHistory } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchAllCharacterData } from "../helpers/fetchData";

const CharacterPage = ({ match }) => {
  const [person, setPerson] = useState(null);
  const [loading, setLoading] = useState(true);
  let history = useHistory();

  useEffect(() => {
    let isChanged = true;

    const fetchChar = async () => {
      const data = await fetchAllCharacterData(match.params.id);
      if (isChanged) {
        setPerson(data);
        setLoading(false);
      }
    };

    fetchChar();

    return () => {
      isChanged = false;
    };
  }, [match]);

  return (
    <div className="container">
      {loading ? (
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
          <li>Homeworld: {person.homeworld.name}</li>
          <li>Films: </li>
          <ul>
            {person.films.map((film, i) => {
              return <li key={i}>{film.title}</li>;
            })}
          </ul>
          <li>Species:</li>
          {person.species.length === 0 ? (
            <ul>
              <li>No Species Listed</li>
            </ul>
          ) : (
            <ul>
              {person.species.map((species, i) => {
                return <li key={i}>{species.name}</li>;
              })}
            </ul>
          )}
          <li>Vehicles:</li>
          {person.vehicles.length === 0 ? (
            <ul>
              <li>No Vehicles Listed</li>
            </ul>
          ) : (
            <ul>
              {person.vehicles.map((vehicle, i) => {
                return <li key={i}>{vehicle.name}</li>;
              })}
            </ul>
          )}
          <li>Starships:</li>
          {person.starships.length === 0 ? (
            <ul>
              <li>No Starships Listed</li>
            </ul>
          ) : (
            <ul>
              {person.starships.map((starship, i) => {
                return <li key={i}>{starship.name}</li>;
              })}
            </ul>
          )}
        </ul>
      )}
      <button onClick={() => history.goBack()}>Back</button>
    </div>
  );
};

export default CharacterPage;
