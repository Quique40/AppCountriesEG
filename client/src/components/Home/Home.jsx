import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import {
  clearDetail,
  getCountriesActivities,
  getAllActivities,
} from "../../redux/action";
import Card from "../Card/Card";
import Pagination from "../Pagination/Pagination";
import Nav from "../Nav/Nav";
import styles from "../Home/Home.module.css";

export default function Home() {
  const dispatch = useDispatch();
  const countriActiv = useSelector((state) => state.allCountries);
  const currentPage = useSelector((state) => state.currentPage);
  const orderName = useSelector((state) => state.orderName);

  let indexOfLastCountry = currentPage * 10;
  let indexOfFirstCountry = indexOfLastCountry - 10;

  let currentCountries = countriActiv.slice(
    indexOfFirstCountry,
    indexOfLastCountry
  );

  useEffect(() => {
    dispatch(clearDetail());
    dispatch(getAllActivities());
    dispatch(getCountriesActivities());
  }, [dispatch]);

  return (
    <div className={styles.container}>
      <div>
        <Nav />
      </div>
      <div className={styles.cardsCont}>
        <div className={styles.paginationTop}>
          <Pagination />
        </div>
        <div className={styles.cardsComponent}>
          {currentCountries &&
            currentCountries.map((e) => {
              return (
                <div key={e.id}>
                  <Link to={"/home/" + e.id}>
                    <Card name={e.name} flag={e.flag} continent={e.continent} />
                  </Link>
                </div>
              );
            })}
        </div>
        <div className={styles.paginationBottom}>
          <Pagination />
        </div>
      </div>
    </div>
  );
}
