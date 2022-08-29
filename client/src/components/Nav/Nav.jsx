import React from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import SearchBar from "../SearchBar/SearchBar";
import styles from "./Nav.module.css";

export default function Nav() {
  const dispatch = useDispatch();

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
