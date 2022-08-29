import React from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import styles from "./Footer.module.css";
import linkedin from "../../images/linkedin_01.png";
import github from "../../images/github_01.png";

export default function Footer() {
  const dispatch = useDispatch();

  useEffect(() => {}, [dispatch]);

  return (
    <footer className={styles.foot}>
      <div className={styles.contain}>
        <div className={styles.divName}>
          <h3>Enrique Martín Garay</h3>
        </div>
        <div className={styles.divLinkedin}>
          <a
            target="_blank"
            rel="noreferrer"
            href="https://www.linkedin.com/in/enrique-garay-fullstack/"
          >
            <img className={styles.linkedin} src={linkedin} alt="Linkedin" />
          </a>
        </div>
        <div className={styles.divGithub}>
          <a
            target="_blank"
            rel="noreferrer"
            href="https://github.com/Quique40"
          >
            <img className={styles.github} src={github} alt="Github" />
          </a>
        </div>
      </div>
    </footer>
  );
}
