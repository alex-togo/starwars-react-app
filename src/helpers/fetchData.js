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

export const fetchCharacter = async (id) => {
  return fetch(`https://swapi.dev/api/people/${id}`)
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
