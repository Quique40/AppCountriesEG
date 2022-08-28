import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import {
  getDetail,
  getAllCountries,
  getCountriesActivities,
} from "../../redux/action";
import styles from "./DetailCountries.module.css";

export default function Detail(props) {
  const myCountry = useSelector((state) => state.detail);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllCountries());
    dispatch(getCountriesActivities());
    dispatch(getDetail(props.match.params.id));
  }, [dispatch, props.match.params.id]);

  console.log(myCountry);
  // console.log(myCountry.activities[0]);

  return (
    <div className={styles.contain}>
      {myCountry ? (
        <div className={styles.cards}>
          <div className={styles.flag_description}>
            <div className={styles.flag}>
              <img
                src={myCountry.flag}
                alt={myCountry.flag}
                width="200px"
                height="140px"
              />
            </div>

            <div className={styles.detailCountry}>
              <h1>Country: {myCountry.name}</h1>
              <p>Country code: {myCountry.id}</p>
              <p>Continent: {myCountry.continent}</p>
              <p>Capital: {myCountry.capital}</p>
              <p>Subregión: {myCountry.subregion}</p>
              <p>Area: {myCountry.area}</p>
              <p>Population: {myCountry.population}</p>
            </div>
            <div className={styles.return}>
              <Link to="/">
                <button className={styles.btn}>Return</button>
              </Link>
            </div>
          </div>

          <div className={styles.detailActivities}>
            <h3 className={styles.titleActivities}>Actividades Turísticas:</h3>

            {myCountry.activities?.map((i) => (
              <div className={styles.infoActiv} key={i.id}>
                <p>Name: {i.name}</p>
                <p>Difficulty: {i.difficulty}</p>
                <p>Duration: {i.duration} hs</p>
                <p>Season: {i.season}</p>
                <p>Description: {i.description}</p>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}
