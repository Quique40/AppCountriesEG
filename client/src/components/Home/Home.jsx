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
import Filter from "../Filter/Filter";
import styles from "../Home/Home.module.css";

export default function Home() {
  const dispatch = useDispatch();
  const countriActiv = useSelector((state) => state.allCountries);
  const currentPage = useSelector((state) => state.currentPage);
  // eslint-disable-next-line
  const orderName = useSelector((state) => state.orderName);

  let indexOfLastCountry = currentPage * 10;
  let indexOfFirstCountry = indexOfLastCountry - 10;

  let countriesPage = countriActiv.slice(
    indexOfFirstCountry,
    indexOfLastCountry
  );

  useEffect(() => {
    dispatch(clearDetail());
    dispatch(getAllActivities());
    dispatch(getCountriesActivities());
  }, [dispatch]);
  console.log(countriesPage.length);
  return (
    <div className={styles.container}>
      <div className={styles.cardsCont}>
        <div className={styles.paginationTop}>
          <Pagination />
        </div>
        <div className={styles.selectContain}>
          <Filter />
        </div>
        <div className={styles.cardsComponent}>
          {/* {countriesPage &&
            countriesPage.map((e) => {
              return (
                <div key={e.id} className={styles.singleCard}>
                  <Link to={"/detail/" + e.id}>
                    <Card name={e.name} flag={e.flag} continent={e.continent} />
                  </Link>
                </div>
              );
            })} */}

          {countriesPage.length > 0 ? (
            countriesPage.map((e) => {
              return (
                <div key={e.id} className={styles.singleCard}>
                  <Link to={"/detail/" + e.id}>
                    <Card name={e.name} flag={e.flag} continent={e.continent} />
                  </Link>
                </div>
              );
            })
          ) : (
            // <div className={styles.loading}>
            //   <h1>Loading...</h1>
            // </div>
            <div className={styles.loading} id="contenedor">
              <div className={styles.loader} id="loader">
                Loading...
              </div>
            </div>
          )}
        </div>
        <div className={styles.paginationBottom}>
          <Pagination />
        </div>
      </div>
    </div>
  );
}
