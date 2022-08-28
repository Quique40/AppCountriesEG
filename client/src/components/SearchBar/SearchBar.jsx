import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { getNameCountries, setCurrentPage } from "../../redux/action";
import { useHistory } from "react-router-dom";

import Styles from "./SearchBar.module.css";

function Validate(name) {
  let error = {};

  if (name.length < 2)
    error.name = "Se deben ingresar mas de 2 caracteres como mínimo";
  return error;
}

export default function SearchBar() {
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [errors, setErrors] = useState({});
  const history = useHistory();

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
      dispatch(setCurrentPage(1));
      setName("");
      history.push("/");
    }
  }

  return (
    <form onSubmit={(e) => handleSubmit(e)}>
      <div className={Styles.form}>
        {/* <div className={Styles.input}> */}
        <input
          type={"text"}
          placeholder={"Name country..."}
          value={name}
          onChange={(e) => handleInputChange(e)}
          name={"name"}
          className={errors.name ? Styles.danger : Styles.input}
        />
        {/* </div> */}
        {/* <div className={Styles.btn}> */}
        <input type="submit" className={Styles.btn} value="Find" />
        {/* </div> */}
      </div>
      {errors.name && <p>{errors.name}</p>}
    </form>
  );
}
