import React from "react";
import { useHistory } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchCharacter } from "../helpers/fetchData";

const CharacterPage = ({ match }) => {
  const [person, setPerson] = useState(null);
  let history = useHistory();

  useEffect(() => {
    let isChanged = true;

    fetchCharacter(match.params.id).then((data) => {
      if (isChanged) {
        setPerson(data);
        console.log(data);
      }
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
          <li>{person.name}</li>
        </ul>
      )}
      <button onClick={() => history.goBack()}>Back</button>
    </>
  );
};

export default CharacterPage;
