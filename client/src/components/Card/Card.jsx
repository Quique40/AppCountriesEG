import React from "react";

import styles from "./Card.module.css";

export default function Card({ name, continent, flag }) {
  return (
    <div className={styles.cardContainer}>
      <img src={flag} alt={name} width="200px" height="140px" />
      <div className={styles.name}>{name}</div>
      <div className={styles.continent}>{continent}</div>
    </div>
  );
}
