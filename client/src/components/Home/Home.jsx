import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import {
  // orderBy,
  // changeSort,
  clearDetail,
  getCountriesActivities,
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
import styles from "../Home/Home.module.css";

export default function Home() {
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

  //   if (orderName) {
  //     dispatch(orderBy(orderName));
  //   }
  // }

  // async function handleFilterActivities(e) {
  //   e.preventDefault();

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

  useEffect(() => {
    dispatch(clearDetail());
    dispatch(getAllActivities());
    dispatch(getCountriesActivities());
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
