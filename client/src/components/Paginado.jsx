import React from "react";

import styles from './Paginado.module.css'


export default function Paginado({ countries, countriesPerPage1, countriesPerPage2, paginado }){
    const pageNumbers = []

    const page1 = countries - countriesPerPage1;
    const restPages = page1/countriesPerPage2;

    for( let i = 1; i<=Math.ceil(restPages+1); i++ ){    
        pageNumbers.push(i);
    }
    
    return(
        <nav>
            <ul className={styles.paginado}>
                { pageNumbers && 
                pageNumbers.map( number => (
                    <li className ={styles.number} key={number} >
                    <a href="#!" onClick={ () => paginado(number) } >{number}</a>                      
                    </li>
                ))}
            </ul>
        </nav>
    )
}