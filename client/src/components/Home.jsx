import React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import * as action from "../redux/action";

import { bindActionCreators } from "redux";
import {
  getAllCountries,
  filterCountriesByContinents,
  orderBy,
  clearDetail,
  getCountriesActivities,
  filterCountriesByActivities,
  getAllActivities,
} from "../redux/action";
import Card from "./Card";
import Paginado from "./Paginado";
import SearchBar from "./SearchBar";

import styles from "./Home.module.css";

export default function Home() {
  const dispatch = useDispatch(); //despacho las actions
  // const countries = useSelector(state => state.countries);  //traemos todo lo que está en estado de countries
  // const activities = useSelector((state) => state.activities);
  const { setCurrentPage } = bindActionCreators(action, dispatch);
  const countriActiv = useSelector((state) => state.allCountries);

  const currentPage = useSelector((state) => state.currentPage);
  console.log(currentPage);
  // const [currentPage, setCurrentPage] = useState(1);

  // const [countriesPerPage, setCountriesPerPage] = useState(10);

  const [orderName, setOrderName] = useState("");

  let indexOfLastCountry = currentPage * 10;
  let indexOfFirstCountry = indexOfLastCountry - 10;
  let currentCountries = countriActiv.slice(
    indexOfFirstCountry,
    indexOfLastCountry
  );

  const activities = useSelector((state) => state.activities);

  useEffect(() => {
    // dispatch(setCurrentPage());
    dispatch(clearDetail());
    dispatch(getAllCountries());
    dispatch(getAllActivities());
    dispatch(getCountriesActivities());
  }, [dispatch]);

  function handleFilterContinent(e) {
    e.preventDefault();
    dispatch(filterCountriesByContinents(e.target.value));
    setCurrentPage(1);
    // setCountriesPerPage(9);
    //

    if (orderName) {
      dispatch(orderBy(orderName));
    }
  }

  function handleFilterActivities(e) {
    e.preventDefault();
    dispatch(filterCountriesByActivities(e.target.value));
    setCurrentPage(1);
    // setCountriesPerPage(9);

    if (orderName) {
      dispatch(orderBy(orderName));
    }
  }

  function handleSortName(e) {
    e.preventDefault();
    dispatch(orderBy(e.target.value));

    setOrderName(e.target.value);

    setCurrentPage(1);
    // setCountriesPerPage(9);
  }

  let handleReload = (e) => {
    e.preventDefault();
    setCurrentPage(1);
    // setCountriesPerPage(9);
    dispatch(getCountriesActivities());
  };

  return (
    <div>
      <div className={styles.buttons}>
        <Link to="/">
          <button className={styles.btn2}>Intro</button>
        </Link>
        <Link to="/home">
          <button className={styles.btn2}>Home</button>
        </Link>
        <Link to="/activities">
          <button className={styles.btn2}>Create tourist activity</button>
        </Link>
      </div>
      <div>
        <SearchBar
        // setCurrentPage={setCurrentPage}
        // setCountriesPerPage={setCountriesPerPage}
        />
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
      <div className={styles.ordFilter}>
        <select defaultValue={"default"} onChange={(e) => handleSortName(e)}>
          <option value={"default"} disabled>
            Select type order
          </option>
          <option value={"default"} disabled>
            --------Name---------------
          </option>
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
        <Paginado
        // countries={countriActiv.length}
        // // paginado={paginado}
        // countriesPerPage={countriesPerPage}
        // currentPage={currentPage}
        // setCurrentPage={setCurrentPage}
        />

        {currentCountries &&
          currentCountries.map((e) => {
            return (
              <div className={styles.cards} key={e.id}>
                <Link to={"/home/" + e.id}>
                  <Card name={e.name} flag={e.flag} continent={e.continent} />
                </Link>
              </div>
            );
          })}

        <Paginado
        // countries={countriActiv.length}
        // // paginado={paginado}
        // countriesPerPage={countriesPerPage}
        // currentPage={currentPage}
        // setCurrentPage={setCurrentPage}
        />
      </div>
    </div>
  );
}
