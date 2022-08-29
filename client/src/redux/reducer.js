const initialState = {
  allCountries: [],
  countryActivities: [],
  countryActBackup: [],
  contryNoAct: [],
  contryNoCont: [],
  notOrder: [],
  continentFilter: "All Continent",
  activState: "",

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
        allCountries: [],
      };

    case "CLEAR_DETAIL":
      return {
        ...state,
        detail: [],
        allCountries: [],
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
        contryNoAct: payload,
        contryNoCont: payload,
        notOrder: payload,
        activState: "",
        continentFilter: "All Continent",
      };

    case "FILTER_BY_CONTINENT":
      const noCont = state.contryNoCont;
      const respCountries = state.countryActivities;
      const continentFilter =
        payload === "All Continent"
          ? noCont
          : respCountries.filter((el) => el.continent === payload);

      return {
        ...state,
        allCountries: continentFilter,
        countryActBackup: continentFilter,
        continentFilter: payload,
      };
    case "STATE_ACTIV":
      return {
        ...state,
        activState: payload,
      };

    case "FILTER_BY_ACTIVITIES":
      const noActiv = state.contryNoAct;
      const allCountriesActiv = state.countryActBackup;

      const activFilter =
        payload === ""
          ? noActiv
          : payload === "All Activities"
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
      let currentPage = state.currentPage;

      if (payload === "next") currentPage++;
      if (payload === "prev") currentPage--;
      if (payload !== "prev" && payload !== "next")
        currentPage = parseInt(payload);

      return {
        ...state,
        currentPage: currentPage,
      };

    default:
      return state;
  }
}

export default reducer;
