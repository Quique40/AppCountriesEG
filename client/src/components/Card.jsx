import React from 'react';

import styles from './Card.module.css'

export default function Card({ name, continent, flag }){
    return(
        <div className={styles.card}>            
            <img src={flag} alt={name} width="200px" height="140px"/>
            <h1>{name}</h1>
            <h3>{continent}</h3>
        </div>
    )
}

                                