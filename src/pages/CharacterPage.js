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
          <div className="infoBox nameHeader">
            <h2 className="charName">{person.name}</h2>
          </div>

          <div className="boxContainer">
            <h3>Info:</h3>
            <div className="infoBox">
              <table style={{ width: "100%" }}>
                <tr>
                  <th>Height</th>
                  <th>Mass</th>
                  <th>Hair Color:</th>
                  <th>Skin Color</th>
                  <th>Eye Color</th>
                  <th>Birth Year</th>
                  <th>Gender</th>
                  <th>Species</th>
                  <th>Homeworld</th>
                </tr>
                <tr>
                  <td>{person.height}</td>
                  <td>{person.mass}</td>
                  <td>{person.hair_color}</td>
                  <td>{person.skin_color}</td>
                  <td>{person.eye_color}</td>
                  <td>{person.birth_year}</td>
                  <td>{person.gender}</td>
                  <td>
                    {person.species.length === 0 ? (
                      <td>No Species Listed</td>
                    ) : (
                      <ul>
                        {person.species.map((species, i) => {
                          return <td key={i}>{species.name}</td>;
                        })}
                      </ul>
                    )}
                  </td>
                  <td>{person.homeworld.name}</td>
                </tr>
              </table>
            </div>
          </div>

          <div className="boxContainer">
            <h3>Vehicles:</h3>
            <div className="infoBox vehicles">
              <table>
                <tr>
                  <th>Starships</th>
                  <th>Other Vehicles</th>
                </tr>
                <tr>
                  {person.starships.length === 0 ? (
                    <td>No Starships Listed</td>
                  ) : (
                    <ul>
                      {person.starships.map((starship, i) => {
                        return <li key={i}>{starship.name}</li>;
                      })}
                    </ul>
                  )}
                  <td>
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
                  </td>
                </tr>
              </table>
            </div>

            <div className="boxContainer">
              <h3>Films:</h3>
              <div className="infoBox ">
                <table>
                  <tr>
                    <th>Film Name</th>
                  </tr>
                  <tr>
                    <ul>
                      {person.films.map((film, i) => {
                        return <li key={i}>{film.title}</li>;
                      })}
                    </ul>
                  </tr>
                </table>
              </div>
            </div>
          </div>
        </div>
      )}
      <button className="navButton backButton" onClick={() => history.goBack()}>
        Back
      </button>
    </div>
  );
};

export default CharacterPage;
