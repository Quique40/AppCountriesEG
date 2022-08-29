import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import {
  getNameCountries,
  setCurrentPage,
  clearDetail,
} from "../../redux/action";
import { useHistory } from "react-router-dom";

import Styles from "./SearchBar.module.css";

function Validate(name) {
  let error = {};

  if (name.length < 2) error.name = "You must write at least 2 characters";
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
    if (!name) {
      alert("You must write the name of a country");
      return;
    }
    if (Object.values(errors).length === 0) {
      dispatch(getNameCountries(name));
      dispatch(setCurrentPage(1));
      dispatch(clearDetail());
      setName("");
      history.push("/searching");
    }
  }

  return (
    <form onSubmit={(e) => handleSubmit(e)}>
      <div className={Styles.form}>
        <input
          type={"text"}
          placeholder={"Name country..."}
          value={name}
          onChange={(e) => handleInputChange(e)}
          name={"name"}
          className={errors.name ? Styles.danger : Styles.input}
        />

        <input type="submit" className={Styles.btn} value="Find" />
      </div>
      <div className={Styles.divError}>
        {errors.name && <p>{errors.name}</p>}
      </div>
    </form>
  );
}
