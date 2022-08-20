import axios from "axios";

export function getAllCountries() {
  return async (dispatch) => {
    const res = await axios("http://localhost:3001/countries");
    return dispatch({ type: "GET_COUNTRIES", payload: res.data });
  };
}

export function getAllActivities() {
  return async (dispatch) => {
    const act = await axios("http://localhost:3001/readActivities");
    return dispatch({ type: "GET_ACTIVITIES", payload: act.data });
  };
}

export function getNameCountries(name) {
  return async function (dispatch) {
    try {
      var json = await axios("http://localhost:3001/countries?name=" + name);
      console.log(json.data);

      return dispatch({
        type: "GET_NAME_COUNTRIES",
        payload: json.data,
      });
    } catch (error) {
      if (error.response) {
        console.log(error.response.data);
        alert(error.response.data);
      }
    }
  };
}

export function postActivities(payload) {
  return async function (dispatch) {
    try {
      const response = await axios.post(
        "http://localhost:3001/activities",
        payload
      );

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
      var response = await axios("http://localhost:3001/complete");
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
  console.log(payload);
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

export function getDetail(id) {
  return async function (dispatch) {
    try {
      var json = await axios("http://localhost:3001/countries/" + id);

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
