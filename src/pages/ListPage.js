import React from "react";
import { useState, useEffect } from "react";
import People from "../components/People";
import { fetchPeople } from "../helpers/fetchData";
import { Link, useParams } from "react-router-dom";

const ListPage = () => {
  const [people, setPeople] = useState(null);
  let id = useParams();
  const [url, setUrl] = useState(`https://swapi.dev/api/people/`);
  const [loading, setLoading] = useState(true);

  let pageRegex = /(?<=page=).*/;

  useEffect(() => {
    let isChanged = true;
    if (id.id > 1) {
      setUrl(`https://swapi.dev/api/people/?page=${id.id}`);
    }

    fetchPeople(url).then((data) => {
      if (isChanged) {
        setPeople(data);
        setLoading(false);
      }
    });
    return () => {
      isChanged = false;
    };
  }, [url, id]);

  return (
    <div className="container">
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div>
          <h2>Star Wars Character List</h2>
          <People people={people} />
          {/* when pressing back button on char page, need to load that specific page */}
          <Link
            to={
              people.previous === null || people.previous.match(pageRegex) <= 1
                ? `/`
                : `/page/${people.previous.match(pageRegex)}`
            }
          >
            <button
              className="navButton"
              onClick={(e) => {
                people.previous === null
                  ? e.preventDefault()
                  : setUrl(people.previous);
              }}
            >
              Previous Page
            </button>
          </Link>
          <Link to={people.next && `/page/${people.next.match(pageRegex)}`}>
            <button
              className="navButton"
              onClick={(e) => {
                people.next === null ? e.preventDefault() : setUrl(people.next);
              }}
            >
              Next Page
            </button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default ListPage;
