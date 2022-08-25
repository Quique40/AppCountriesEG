import React from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import SearchBar from "../SearchBar/SearchBar";
import styles from "./Nav.module.css";

// import // orderBy,
// changeSort,
// setCurrentPage,
// getCountriesActivities,
// filterCountriesByContinents,
// filterCountriesByActivities,
// stateFilterActiv,
// getAllActivities,
// cleanStateCountry,
// "../../redux/action";

export default function Nav() {
  const dispatch = useDispatch();
  // const activities = useSelector((state) => state.activities);
  // const orderName = useSelector((state) => state.orderName);
  // const contFilter = useSelector((state) => state.continentFilter);
  // const countries = useSelector((state) => state.allCountries);
  // activState: "Not activities",
  // const actState = useSelector((state) => state.activState);

  // async function handleFilterContinent(e) {
  //   e.preventDefault();
  //   dispatch(filterCountriesByContinents(e.target.value));
  //   console.log(e.target.value);
  //   console.log(actState);

  //   if (e.target.value === "All Continent") {
  //     console.log("hi");
  //     dispatch(stateFilterActiv(actState));
  //     dispatch(filterCountriesByActivities(actState));
  //   }

  //   dispatch(setCurrentPage(1));
  //   dispatch(changeSort(orderName));
  //   // dispatch(orderBy(orderName));
  //   if (orderName) {
  //     dispatch(orderBy(orderName));
  //   }
  // }

  // async function handleFilterActivities(e) {
  //   e.preventDefault();

  // if (e.target.value === "") {
  //   await dispatch(getCountriesActivities());
  //   // dispatch(stateFilterActiv(e.target.value));
  //   dispatch(setCurrentPage(1));
  //   await dispatch(changeSort(orderName));
  //   await dispatch(orderBy(orderName));

  //   // if (orderName !== "") {
  //   // }
  // } else {
  //   console.log("hi");
  //   dispatch(stateFilterActiv(e.target.value));
  //   dispatch(filterCountriesByActivities(e.target.value));
  //   dispatch(setCurrentPage(1));
  //   dispatch(changeSort(orderName));
  //   if (orderName) {
  //     dispatch(orderBy(orderName));
  //   }
  // }

  //   dispatch(stateFilterActiv(e.target.value));
  //   dispatch(filterCountriesByActivities(e.target.value));

  //   if (e.target.value === "") {
  //     dispatch(filterCountriesByContinents(contFilter));
  //   }

  //   dispatch(setCurrentPage(1));
  //   dispatch(changeSort(orderName));
  //   if (orderName) {
  //     dispatch(orderBy(orderName));
  //   }
  // }

  // async function handleSortName(e) {
  //   e.preventDefault();
  //   if (e.target.value === "") {
  //     await dispatch(getCountriesActivities());
  //     dispatch(changeSort(""));
  //     dispatch(orderBy(""));

  //     dispatch(filterCountriesByContinents(contFilter));
  //     if (actState !== "") {
  //       await dispatch(filterCountriesByActivities(actState));
  //     }

  //     dispatch(setCurrentPage(1));
  //   } else {
  //     dispatch(changeSort(e.target.value));
  //     dispatch(orderBy(e.target.value));
  //     dispatch(setCurrentPage(1));
  //   }
  // }
  // let handleReload = (e) => {
  //   e.preventDefault();
  //   dispatch(setCurrentPage(1));
  //   dispatch(getCountriesActivities());
  // };
  useEffect(() => {}, [dispatch]);

  return (
    <nav className={styles.nav}>
      <div className={styles.contain}>
        <div className={styles.divActivity}>
          <Link to="/activities">
            <button className={styles.btnActivity}>Tourist activities</button>
          </Link>
        </div>
        <div className={styles.searchBar}>
          <SearchBar />
        </div>
      </div>
    </nav>
  );
}
