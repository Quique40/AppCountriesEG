const initialState = {
  countries: [],

  allCountries: [],
  countryActivities: [],
  countryActBackup: [],

  activities: [],

  detail: [],

  currentPage: 1,
  cardsPerPage: 10,
};

function reducer(state = initialState, { type, payload }) {
  switch (type) {
    case "GET_COUNTRIES":
      return {
        ...state,
        countries: payload,
      };

    case "GET_ACTIVITIES":
      return {
        ...state,
        activities: payload,
      };

    case "GET_DETAIL":
      return {
        ...state,
        detail: payload,
      };

    case "CLEAR_DETAIL":
      return {
        ...state,
        detail: [],
      };

    case "GET_NAME_COUNTRIES":
      return {
        ...state,

        allCountries: payload,
      };

    case "POST_NEW_ACTIVITIES":
      return {
        ...state,
      };

    case "GET_COUNTRIES_ACTIVITIES":
      return {
        ...state,
        countryActivities: payload,
        allCountries: payload,
        countryActBackup: payload,
      };

    case "FILTER_BY_CONTINENT":
      const allCountries = state.countryActivities;
      const continentFilter =
        payload === "All Continent"
          ? allCountries
          : allCountries.filter((el) => el.continent === payload);

      return {
        ...state,
        allCountries: continentFilter,
        countryActBackup: continentFilter,
      };

    case "FILTER_BY_ACTIVITIES":
      const allCountriesActiv = state.countryActBackup;

      const activFilter =
        payload === "All Activities"
          ? allCountriesActiv.filter((all) => all.activities.length > 0)
          : allCountriesActiv.filter(
              (el) =>
                el.activities &&
                el.activities.map((fil) => fil.name).includes(payload)
            );

      return {
        ...state,
        countryActivities: activFilter,
        allCountries: activFilter,
      };

    case "ORDER_BY_NAME":
      const nameOrder =
        payload === "asc-name"
          ? state.allCountries.sort(function (a, b) {
              if (a.name > b.name) return 1;
              if (b.name > a.name) return -1;
              return 0;
            })
          : state.allCountries.sort(function (a, b) {
              if (a.name > b.name) return -1;
              if (b.name > a.name) return 1;
              return 0;
            });

      return {
        ...state,
        allCountries: nameOrder,
      };
    case "ORDER_BY_POPULATION":
      const popOrder =
        payload === "asc-pop"
          ? state.allCountries.sort(function (a, b) {
              if (a.population > b.population) return 1;
              if (b.population > a.population) return -1;
              return 0;
            })
          : state.allCountries.sort(function (a, b) {
              if (a.population > b.population) return -1;
              if (b.population > a.population) return 1;
              return 0;
            });
      return {
        ...state,
        allCountries: popOrder,
      };

    case "UPDATE_PAGE":
      let countriesUpDate = state.allCountries;
      let currentPage = state.currentPage;

      if (payload === "next") currentPage++;
      if (payload === "prev") currentPage--;
      if (payload !== "prev" && payload !== "next")
        currentPage = parseInt(payload);

      return {
        ...state,
        currentPage: currentPage,
        allCountries: countriesUpDate,
      };

    default:
      return state;
  }
}

export default reducer;
