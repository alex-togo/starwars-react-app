export const fetchData = async (url) => {
  return fetch(url)
    .then((res) => {
      if (res.status > 400) {
        throw new Error("Bad response from server");
      }
      return res;
    })
    .then((res) => {
      return res.json();
    });
};

// export const fetchCharacter = async (id) => {
//   return fetch(`https://swapi.dev/api/people/${id}`)
//     .then((res) => {
//       if (res.status > 400) {
//         throw new Error("Bad response from server");
//       }
//       return res;
//     })
//     .then((res) => {
//       return res.json();
//     });
// };

export const fetchAllCharacterData = async (id) => {
  const res = await fetch(`https://swapi.dev/api/people/${id}`);
  if (res.status > 400) {
    throw new Error("Bad response from server");
  }
  const resJson = await res.json();
  //homeworld
  const charHomeworld = await fetch(resJson.homeworld)
    .then((data) => {
      return data.json();
    })
    .then((world) => {
      return world;
    });
  //films
  const charFilms = resJson.films.map(async (url) => {
    return fetch(url)
      .then((data) => {
        return data.json();
      })
      .then((film) => {
        return film;
      });
  });

  const charSpecies = resJson.species.map(async (url) => {
    return fetch(url)
      .then((data) => {
        return data.json();
      })
      .then((species) => {
        return species;
      });
  });

  //vehicles
  const charVehicles = resJson.vehicles.map(async (url) => {
    return fetch(url)
      .then((data) => {
        return data.json();
      })
      .then((vehicle) => {
        return vehicle;
      });
  });

  //starships
  const charStarships = resJson.starships.map(async (url) => {
    return fetch(url)
      .then((data) => {
        return data.json();
      })
      .then((ship) => {
        return ship;
      });
  });

  const films = await Promise.all(charFilms);
  const species = await Promise.all(charSpecies);
  const vehicles = await Promise.all(charVehicles);
  const starships = await Promise.all(charStarships);

  const data = {
    name: resJson.name,
    height: resJson.height,
    mass: resJson.mass,
    hair_color: resJson.hair_color,
    skin_color: resJson.skin_color,
    eye_color: resJson.eye_color,
    birth_year: resJson.birth_year,
    gender: resJson.gender,
    homeworld: charHomeworld,
    films,
    species,
    vehicles,
    starships,
  };
  return data;
};
