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
    <>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div>
          <div className="infoBox nameHeader">
            <h2 className="charName">{person.name}</h2>
          </div>

          <div>
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
                  <td>
                    {person.height === "unknown"
                      ? "unknown"
                      : person.height + "cm"}
                  </td>
                  <td>
                    {person.mass === "unknown" ? "unknown" : person.mass + "kg"}
                  </td>
                  <td>{person.hair_color}</td>
                  <td>{person.skin_color}</td>
                  <td>{person.eye_color}</td>
                  <td>{person.birth_year}</td>
                  <td>{person.gender}</td>
                  {person.species.length === 0 ? (
                    <td>unknown</td>
                  ) : (
                    <ul>
                      {person.species.map((species, i) => {
                        return <li key={i}>{species.name}</li>;
                      })}
                    </ul>
                  )}
                  <td>{person.homeworld.name}</td>
                </tr>
              </table>
            </div>
          </div>

          <div className="boxContainer">
            <h3>Vehicles:</h3>
            <div className="infoBox">
              <table>
                <tr>
                  <th>Starships</th>
                  <th>Other Vehicles</th>
                </tr>
                <tr>
                  {person.starships.length === 0 ? (
                    <td>unknown</td>
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
                        <li>unknown</li>
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

            <div>
              <h3>Films:</h3>
              <div className="infoBox">
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
    </>
  );
};

export default CharacterPage;
