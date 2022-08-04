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
} from "../../redux/action";

export default function Nav() {
  const dispatch = useDispatch();
  const activities = useSelector((state) => state.activities);
  const orderName = useSelector((state) => state.orderName);
  const countries = useSelector((state) => state.allCountries);

  function handleFilterContinent(e) {
    e.preventDefault();
    dispatch(filterCountriesByContinents(e.target.value));
    dispatch(setCurrentPage(1));

    if (orderName) {
      dispatch(orderBy(orderName));
    }
  }

  function handleFilterActivities(e) {
    e.preventDefault();
    dispatch(filterCountriesByActivities(e.target.value));
    dispatch(setCurrentPage(1));

    if (orderName) {
      dispatch(orderBy(orderName));
    }
  }

  function handleSortName(e) {
    e.preventDefault();

    dispatch(changeSort(e.target.value));
    dispatch(orderBy(e.target.value));

    dispatch(setCurrentPage(1));
  }
  let handleReload = (e) => {
    e.preventDefault();
    dispatch(setCurrentPage(1));
    dispatch(getCountriesActivities());
  };

  // useEffect(() => {
  //   changeSort(orderName);
  // }, [orderName]);

  return (
    <div>
      <div>
        <Link to="/">
          <button className={styles.btn2}>Intro</button>
        </Link>
      </div>
      <div>
        <Link to="/activities">
          <button className={styles.btn2}>Create tourist activity</button>
        </Link>
      </div>
      <div className={styles.reload}>
        <button
          className={styles.btn}
          onClick={(e) => {
            handleReload(e);
          }}
        >
          Reload Countries
        </button>
      </div>
      <div>
        <select defaultValue={"default"} onChange={(e) => handleSortName(e)}>
          <option value={"default"} disabled>
            Select type order
          </option>
          <option value="not-order">--------Name---------------</option>
          <option value="asc-name">Ascendente-Nombre</option>
          <option value="des-name">Descendente-Nombre</option>
          <option value={"default"} disabled>
            --------Population---------
          </option>
          <option value="asc-pop">Ascendente-Poblacion</option>
          <option value="des-pop">Descendente-Poblacion</option>
        </select>

        <select
          name="continents"
          defaultValue={"default"}
          onChange={(e) => handleFilterContinent(e)}
        >
          <option value={"default"} disabled>
            Filter Continent
          </option>
          <option value="All Continent">All Continents</option>
          <option value="Africa">Africa</option>
          <option value="Americas">Americas</option>
          <option value="Antarctic">Antarctic</option>
          <option value="Asia">Asia</option>
          <option value="Europe">Europe</option>
          <option value="Oceania">Oceania</option>
        </select>
        <select
          name="activities"
          defaultValue={"default"}
          onChange={(e) => handleFilterActivities(e)}
        >
          <option value={"default"} disabled>
            Filter Activities
          </option>
          <option value="All Activities">All Activities</option>
          {activities &&
            activities.map((el) => (
              <option value={el.name} key={el.name}>
                {el.name}
              </option>
            ))}
        </select>
      </div>

      <div>
        <SearchBar />
      </div>
    </div>
  );
}
