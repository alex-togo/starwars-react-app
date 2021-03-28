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
        <div>
          <h2 className="charName">{person.name}</h2>
          <ul>
            <li>
              <b>Height: </b>
              {person.height}
            </li>
            <li>
              <b>Mass: </b>
              {person.mass}
            </li>
            <li>
              <b>Hair Color: </b> {person.hair_color}
            </li>
            <li>
              <b>Skin Color: </b> {person.skin_color}
            </li>
            <li>
              <b>Eye Color: </b> {person.eye_color}
            </li>
            <li>
              <b>Birth Year: </b> {person.birth_year}
            </li>
            <li>
              <b>Gender: </b> {person.gender}
            </li>
            <li>
              <b>Homeworld: </b> {person.homeworld.name}
            </li>
            <li>
              <b>Films: </b>
            </li>
            <ul>
              {person.films.map((film, i) => {
                return <li key={i}>{film.title}</li>;
              })}
            </ul>
            <li>
              <b>Species: </b>
            </li>
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
            <li>
              <b>Vehicles: </b>
            </li>
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
            <li>
              <b>Starships: </b>
            </li>
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
        </div>
      )}
      <button className="navButton backButton" onClick={() => history.goBack()}>
        Back
      </button>
    </div>
  );
};

export default CharacterPage;
