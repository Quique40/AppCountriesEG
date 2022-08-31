import axios from "axios";

const localhost = "http://localhost:3001";
// const render = `https://appcountries.onrender.com`;

axios.defaults.baseURL = localhost;
// axios.defaults.baseURL = "https://appcountries.onrender.com";

export function getAllCountries() {
  return async (dispatch) => {
    const res = await axios("/countries");
    return dispatch({ type: "GET_COUNTRIES", payload: res.data });
  };
}

export function getAllActivities() {
  return async (dispatch) => {
    const act = await axios("/readActivities");
    return dispatch({ type: "GET_ACTIVITIES", payload: act.data });
  };
}

export function getNameCountries(name) {
  return async function (dispatch) {
    try {
      var json = await axios("/countries?name=" + name);

      return dispatch({
        type: "GET_NAME_COUNTRIES",
        payload: json.data,
      });
    } catch (error) {
      if (error.response) {
        alert(error.response.data);
      }
    }
  };
}

export function postActivities(payload) {
  return async function (dispatch) {
    try {
      const response = await axios.post("/activities", payload);

      alert(response.data);
      return response;
    } catch (error) {
      if (error.response) {
        return alert(error.response.data);
      }
    }
  };
}

export function getCountriesActivities() {
  return async (dispatch) => {
    try {
      var response = await axios("/complete");
      return dispatch({
        type: "GET_COUNTRIES_ACTIVITIES",
        payload: response.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export function filterCountriesByContinents(payload) {
  return {
    type: "FILTER_BY_CONTINENT",
    payload,
  };
}

export function filterCountriesByActivities(payload) {
  return {
    type: "FILTER_BY_ACTIVITIES",
    payload,
  };
}

export function orderBy(payload) {
  if (payload === "asc-name" || payload === "des-name") {
    return {
      type: "ORDER_BY_NAME",
      payload,
    };
  }
  if (payload === "asc-pop" || payload === "des-pop") {
    return {
      type: "ORDER_BY_POPULATION",
      payload: payload,
    };
  }
  if (payload === "") {
    return {
      type: "NO_ORDER",
      payload: payload,
    };
  }
}

export function cleanStateCountry() {
  return {
    type: "CLEAN_STATE",
  };
}

export function changeSort(payload) {
  return {
    type: "STATE_SORT",
    payload,
  };
}

export function stateFilterActiv(payload) {
  return {
    type: "STATE_ACTIV",
    payload,
  };
}

export function getDetail(id) {
  return async function (dispatch) {
    try {
      var json = await axios("/countries/" + id);

      return dispatch({
        type: "GET_DETAIL",
        payload: json.data,
      });
    } catch (error) {
      if (error.response) {
        alert(error.response.data);
      }
    }
  };
}

export function clearDetail() {
  return { type: "CLEAR_DETAIL" };
}

export function setCurrentPage(payload) {
  return {
    type: "UPDATE_PAGE",
    payload,
  };
}
