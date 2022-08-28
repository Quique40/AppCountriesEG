import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import {
  // orderBy,
  // changeSort,
  clearDetail,
  // getCountriesActivities,
  getAllActivities,
  // filterCountriesByContinents,
  // filterCountriesByActivities,
  // stateFilterActiv,
  // setCurrentPage,
} from "../../redux/action";
import Card from "../Card/Card";
import Pagination from "../Pagination/Pagination";
import Filter from "../Filter/Filter";
// import Nav from "../Nav/Nav";
import styles from "../Searching/Searching.module.css";

export default function Searching() {
  const dispatch = useDispatch();
  const countriActiv = useSelector((state) => state.allCountries);
  const currentPage = useSelector((state) => state.currentPage);
  // const activities = useSelector((state) => state.activities);

  // const actState = useSelector((state) => state.activState);
  // const contFilter = useSelector((state) => state.continentFilter);

  // eslint-disable-next-line
  const orderName = useSelector((state) => state.orderName);

  // useEffect(() => {
  //   dispatch(clearDetail());
  //   dispatch(getAllActivities());
  //   dispatch(getCountriesActivities());
  // }, [dispatch]);

  let indexOfLastCountry = currentPage * 10;
  let indexOfFirstCountry = indexOfLastCountry - 10;

  let countriesPage = countriActiv.slice(
    indexOfFirstCountry,
    indexOfLastCountry
  );

  useEffect(() => {
    // dispatch(clearDetail());
    // dispatch(getAllActivities());
    // dispatch(getCountriesActivities());
  }, [dispatch]);
  return (
    <div className={styles.container}>
      {/* <div>
        <Nav />
      </div> */}
      <div className={styles.cardsCont}>
        <div className={styles.paginationTop}>
          <Pagination />
        </div>
        <div className={styles.selectContain}>
          <Filter />
        </div>

        <div className={styles.cardsComponent}>
          {countriesPage &&
            countriesPage.map((e) => {
              return (
                <div key={e.id} className={styles.singleCard}>
                  <Link to={"/detail/" + e.id}>
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
