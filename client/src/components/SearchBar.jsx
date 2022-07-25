import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { getNameCountries } from "../redux/action";

import Styles from "./SearchBar.module.css";

function Validate(name) {
  let error = {};

  if (name.length < 2)
    error.name = "Se deben ingresar mas de 2 caracteres como mínimo";
  return error;
}

export default function SearchBar({ setCurrentPage, setCountriesPerPage }) {
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [errors, setErrors] = useState({});

  let handleInputChange = (e) => {
    e.preventDefault();
    setName(e.target.value);

    setErrors(Validate(e.target.value));
  };

  function handleSubmit(e) {
    e.preventDefault();
    console.log(name);
    if (!name) {
      alert("You must write the name of a country");
      return;
    }

    if (Object.values(errors).length === 0) {
      dispatch(getNameCountries(name));
      setCurrentPage(1);
      setCountriesPerPage(9);
      setName("");
    }
  }

  return (
    <div className={Styles.form}>
      <form onSubmit={(e) => handleSubmit(e)}>
        <input
          type={"text"}
          placeholder={"Name country..."}
          value={name}
          onChange={(e) => handleInputChange(e)}
          name={"name"}
          className={errors.name && Styles.danger}
        />

        <input className={Styles.btn} type="submit" value="Find" />
      </form>
      {errors.name && <p>{errors.name}</p>}
    </div>
  );
}
