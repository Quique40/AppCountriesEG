const initialState = {
  allCountries: [],
  countryActivities: [],
  countryActBackup: [],
  notOrder: [],
  continentFilter: "All Continent",
  activState: "Not activities",

  activities: [],

  detail: [],

  currentPage: 1,
  cardsPerPage: 10,

  orderName: "",
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
        notOrder: payload,
        activState: "Not activities",
        continentFilter: "All Continent",
      };

    case "FILTER_BY_CONTINENT":
      const respCountries = state.countryActivities;
      const continentFilter =
        payload === "All Continent"
          ? respCountries
          : respCountries.filter((el) => el.continent === payload);

      return {
        ...state,
        allCountries: continentFilter,
        countryActBackup: continentFilter,
        continentFilter: payload,
      };

    case "FILTER_BY_ACTIVITIES":
      const allCountriesActiv = state.countryActBackup;
      console.log(state.countryActBackup);
      console.log(payload);
      // if (payload === "Not Activities") {
      //   console.log("hi");
      //   return {
      //     ...state,
      //     countryActivities: state.countryActBackup,
      //     allCountries: state.countryActBackup,
      //     activState: payload,
      //   };
      // }

      console.log("hi");
      console.log(payload);
      const activFilter =
        payload === "All Activities"
          ? allCountriesActiv.filter((all) => all.activities.length > 0)
          : allCountriesActiv.filter(
              (el) =>
                el.activities &&
                el.activities.map((fil) => fil.name).includes(payload)
            );

      // const activFilter =
      //   payload === "Not Activities"
      //     ? allCountriesActiv
      //     : payload === "All Activities"
      //     ? allCountriesActiv.filter((all) => all.activities.length > 0)
      //     : allCountriesActiv.filter(
      //         (el) =>
      //           el.activities &&
      //           el.activities.map((fil) => fil.name).includes(payload)
      //       );
      console.log(activFilter);
      return {
        ...state,
        countryActivities: activFilter,
        allCountries: activFilter,
        activState: payload,
      };

    case "ORDER_BY_NAME":
      const nameOrder =
        state.orderName === "asc-name"
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
        state.orderName === "asc-pop"
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

    case "NO_ORDER":
      const noOrder = state.countryActBackup;
      return {
        ...state,
        allCountries: noOrder,
        // orderName: payload,
      };

    case "STATE_SORT":
      return {
        ...state,
        orderName: payload,
      };

    case "CLEAN_STATE":
      const cleanState = state.notOrder;
      return {
        ...state,
        allCountries: cleanState,
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
