import React from "react";

import styles from "./Card.module.css";

export default function Card({ name, continent, flag }) {
  return (
    <div className={styles.cardContainer}>
      <img className={styles.flag} src={flag} alt={name} />
      <div className={styles.name}>{name}</div>
      <div className={styles.continent}>{continent}</div>
    </div>
  );
}
