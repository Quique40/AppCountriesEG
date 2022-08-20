import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import SearchBar from "../SearchBar/SearchBar";
import styles from "./Nav.module.css";

import {
  orderBy,
  changeSort,
  setCurrentPage,
  getCountriesActivities,
  filterCountriesByContinents,
  filterCountriesByActivities,
  getAllActivities,
  // cleanStateCountry,
} from "../../redux/action";

export default function Nav() {
  const dispatch = useDispatch();
  const activities = useSelector((state) => state.activities);
  const orderName = useSelector((state) => state.orderName);
  const contFilter = useSelector((state) => state.continentFilter);
  // const countries = useSelector((state) => state.allCountries);
  // activState: "Not activities",
  const activityState = useSelector((state) => state.activState);

  async function handleFilterContinent(e) {
    e.preventDefault();
    dispatch(filterCountriesByContinents(e.target.value));
    dispatch(setCurrentPage(1));
    dispatch(changeSort(orderName));
    dispatch(orderBy(orderName));
  }

  async function handleFilterActivities(e) {
    e.preventDefault();
    dispatch(filterCountriesByActivities(e.target.value));
    dispatch(setCurrentPage(1));

    if (orderName) {
      dispatch(orderBy(orderName));
    }
  }

  async function handleSortName(e) {
    e.preventDefault();
    if (e.target.value === "") {
      await dispatch(getCountriesActivities());
      dispatch(changeSort(""));
      dispatch(orderBy(""));
      console.log(activityState);
      dispatch(filterCountriesByContinents(contFilter));
      if (activityState !== "Not activities") {
        console.log("hi");
        await dispatch(filterCountriesByActivities(activityState));
      }

      dispatch(setCurrentPage(1));
    } else {
      dispatch(changeSort(e.target.value));
      dispatch(orderBy(e.target.value));
      dispatch(setCurrentPage(1));
    }
  }
  let handleReload = (e) => {
    e.preventDefault();
    dispatch(setCurrentPage(1));
    dispatch(getCountriesActivities());
  };
  useEffect(() => {
    // dispatch(getCountriesActivities());
    // dispatch(getAllActivities());
  }, [dispatch]);

  return (
    <div className={styles.contain}>
      <Link to="/">
        <button className={styles.btnIntro}>Intro</button>
      </Link>
      <Link to="/activities">
        <button className={styles.btnActivity}>Tourist activities</button>
      </Link>

      <button
        className={styles.reload}
        onClick={(e) => {
          handleReload(e);
        }}
      >
        Reload Countries
      </button>
      <div className={styles.select}>
        <select
          className={styles.order}
          defaultValue={"default"}
          onChange={(e) => handleSortName(e)}
        >
          <option value="">Select Order</option>
          <option value="asc-name">Ascendente-Nombre</option>
          <option value="des-name">Descendente-Nombre</option>

          <option value="asc-pop">Ascendente-Poblacion</option>
          <option value="des-pop">Descendente-Poblacion</option>
        </select>

        <select
          name="continents"
          className={styles.continent}
          defaultValue={"default"}
          onChange={(e) => handleFilterContinent(e)}
        >
          <option value="All Continent">Filter By Continent</option>
          <option value="Africa">Africa</option>
          <option value="Americas">Americas</option>
          <option value="Antarctic">Antarctic</option>
          <option value="Asia">Asia</option>
          <option value="Europe">Europe</option>
          <option value="Oceania">Oceania</option>
        </select>
        <select
          name="activities"
          className={styles.activity}
          defaultValue={"default"}
          onChange={(e) => handleFilterActivities(e)}
        >
          <option value="Not Activities">Filter By Activities</option>
          <option value="All Activities">All Activities</option>
          {activities &&
            activities.map((el) => (
              <option value={el.name} key={el.name}>
                {el.name}
              </option>
            ))}
        </select>
      </div>
      <div className={styles.searchBar}>
        <SearchBar />
      </div>
    </div>
  );
}
