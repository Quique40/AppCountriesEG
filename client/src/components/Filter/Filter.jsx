import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

import {
  orderBy,
  changeSort,
  clearDetail,
  getCountriesActivities,
  getAllActivities,
  filterCountriesByContinents,
  filterCountriesByActivities,
  stateFilterActiv,
  setCurrentPage,
} from "../../redux/action";

import styles from "../Filter/Filter.module.css";

export default function Filter() {
  const dispatch = useDispatch();

  // const countriActiv = useSelector((state) => state.allCountries);
  // const currentPage = useSelector((state) => state.currentPage);
  const activities = useSelector((state) => state.activities);

  const actState = useSelector((state) => state.activState);
  const contFilter = useSelector((state) => state.continentFilter);

  // eslint-disable-next-line
  const orderName = useSelector((state) => state.orderName);
  const history = useHistory();

  async function handleFilterContinent(e) {
    e.preventDefault();
    dispatch(filterCountriesByContinents(e.target.value));
    console.log(e.target.value);
    console.log(actState);

    if (e.target.value === "All Continent") {
      console.log("hi");
      dispatch(stateFilterActiv(actState));
      dispatch(filterCountriesByActivities(actState));
    }

    dispatch(setCurrentPage(1));
    dispatch(changeSort(orderName));
    // dispatch(orderBy(orderName));
    if (orderName) {
      dispatch(orderBy(orderName));
    }
  }

  async function handleFilterActivities(e) {
    e.preventDefault();

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

    dispatch(stateFilterActiv(e.target.value));
    dispatch(filterCountriesByActivities(e.target.value));

    if (e.target.value === "") {
      dispatch(filterCountriesByContinents(contFilter));
    }

    dispatch(setCurrentPage(1));
    dispatch(changeSort(orderName));
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

      dispatch(filterCountriesByContinents(contFilter));
      if (actState !== "") {
        await dispatch(filterCountriesByActivities(actState));
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
    history.push("/");
  };

  useEffect(() => {
    // dispatch(clearDetail());
    dispatch(getAllActivities());
    // dispatch(getCountriesActivities());
  }, [dispatch]);

  return (
    <div className={styles.containFilter}>
      <div className={styles.divReload}>
        <button
          className={styles.reload}
          onClick={(e) => {
            handleReload(e);
          }}
        >
          Reload Countries
        </button>
      </div>
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
          <option value="">Filter By Activities</option>
          <option value="All Activities">All Activities</option>
          {activities &&
            activities.map((el) => (
              <option value={el.name} key={el.name}>
                {el.name}
              </option>
            ))}
        </select>
      </div>
    </div>
  );
}
