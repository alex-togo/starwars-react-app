import React from "react";
import { useState, useEffect } from "react";
import People from "../components/People";
import { fetchData } from "../helpers/fetchData";
import { Link } from "react-router-dom";

const ListPage = () => {
  const [people, setPeople] = useState(null);
  const [url, setUrl] = useState(`https://swapi.dev/api/people/`);
  const [loading, setLoading] = useState(true);

  let pageRegex = /(?<=page=).*/;

  useEffect(() => {
    let isChanged = true;
    fetchData(url).then((data) => {
      if (isChanged) {
        setPeople(data);
        setLoading(false);
      }
    });
    return () => {
      isChanged = false;
    };
  }, [url]);

  return (
    <>
      <div>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <div>
            <People people={people} />
            {/* when pressing back button on char page, need to load that specific page */}
            <Link
              to={
                people.previous === null
                  ? `/`
                  : `/page/${people.previous.match(pageRegex)}`
              }
            >
              <button
                onClick={() => {
                  people.previous === null || setUrl(people.previous);
                }}
              >
                Previous Page
              </button>
            </Link>
            <Link to={people.next && `/page/${people.next.match(pageRegex)}`}>
              <button
                onClick={() => {
                  people.next === null || setUrl(people.next);
                }}
              >
                Next Page
              </button>
            </Link>
          </div>
        )}
      </div>
    </>
  );
};

export default ListPage;
