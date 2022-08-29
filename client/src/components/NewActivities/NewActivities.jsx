import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  // getAllCountries,
  postActivities,
  getCountriesActivities,
  getAllActivities,
} from "../../redux/action";

import Styles from "./NewActivities.module.css";

function Validate(input) {
  let errors = {};

  if (!input.name) errors.name = "Se requiere un nombre de actividad turistica";
  if (typeof input.name !== "string") errors.name = "debe ser solo letras";
  if (input.name.length > 20)
    errors.name =
      "El nombre de la actividad turística no debe superar de 20 caracteres";
  if (!input.difficulty)
    errors.difficulty = "Debe seleccionar una grado de dificultad";
  if (!input.duration)
    errors.duration = "Se requiere agregar duración de actividad turística";
  if (input.duration < 1 || input.duration > 48)
    errors.duration = "El tiempo de duración es entre 1hs - 48hs";
  if (!input.season)
    errors.season =
      "Se requiere seleccionar la temporada en la que se realiza la actividad turística";
  if (!input.description)
    errors.description =
      "Se requiere agregar descripción de esta actividad turísitica";
  if (input.description.length > 100)
    errors.description =
      "La máxima cantidad de caracteres para escribir la descripción es de 100 caracteres";
  // else if (!input.countries) {
  if (input.countries.length === 0) {
    console.log("hi");
    errors.countries =
      "Se requiere seleccionar el o los países donde se desarrolla esta actividad turística";
  }
  console.log(input.countries.length);
  return errors;
}

export default function NewActivities() {
  const dispatch = useDispatch();

  const countries = useSelector((state) => state.allCountries);
  const history = useHistory();

  const [errors, setErrors] = useState({});

  const [input, setInput] = useState({
    name: "",
    difficulty: "",
    duration: "",
    season: "",
    description: "",
    countries: [],
  });

  function handleChange(e) {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });

    setErrors(
      Validate({
        ...input,
        [e.target.name]: e.target.value,
      })
    );
  }

  function handleSelectSeason(e) {
    setInput({
      ...input,
      season: e.target.value,
    });

    setErrors(
      Validate({
        ...input,
        season: e.target.value,
      })
    );
  }

  function handleDelete(e) {
    setInput({
      ...input,
      countries: input.countries.filter((el) => el !== e),
    });
  }

  function handleSelectCountries(e) {
    if (
      !input.countries.includes(e.target.value) &&
      e.target.value !== "Choose the country"
    ) {
      setInput({
        ...input,
        countries: [...input.countries, e.target.value],
      });
      setErrors(
        Validate({
          ...input,
          countries: [...input.countries, e.target.value],
        })
      );
    } else {
      return alert(
        "You have already added this country to the list. Please select another country or continue filling out the form."
      );
    }
  }

  function handleSelectDificulty(e) {
    setInput({
      ...input,
      difficulty: e.target.value,
    });

    setErrors(
      Validate({
        ...input,
        difficulty: e.target.value,
      })
    );
  }

  async function handleSubmit(e) {
    e.preventDefault();

    setErrors(Validate(input));
    const errors = Validate(input);

    if (Object.values(errors).length !== 0 || input.countries.length < 1) {
      console.log(errors);
      alert("Please, you must complete all fields correctly before submitting");
      history.push("/activities");

      setInput({
        name: "",
        difficulty: "",
        duration: "",
        season: "",
        description: "",
        countries: [],
      });
    } else {
      dispatch(getCountriesActivities());
      dispatch(postActivities(input));
      await dispatch(getAllActivities());

      setInput({
        name: "",
        difficulty: "",
        duration: "",
        season: "",
        description: "",
        countries: [],
      });
      history.push("/");
    }
  }

  useEffect(() => {
    // dispatch(getAllCountries());
    dispatch(getCountriesActivities());
  }, [dispatch]);

  console.log(errors);
  console.log(input.countries);

  return (
    <div className={Styles.containMaster}>
      <div className={Styles.contain}>
        <div className={Styles.description}>
          <form className={Styles.form} onSubmit={(e) => handleSubmit(e)}>
            <div className={Styles.titleActivities}>
              <h2>Creation of tourist activity</h2>
            </div>
            <div className={Styles.divName}>
              <label>Name:</label>
              <input
                type="text"
                value={input.name}
                name="name"
                onChange={(e) => handleChange(e)}
                // className={errors.name && Styles.danger}
                className={errors.name ? Styles.danger : Styles.name}
              />
              {errors.name && <h4>{errors.name}</h4>}
            </div>
            <div className={Styles.divDifficulty}>
              <label>Difficulty:</label>
              <select
                className={errors.difficulty && Styles.danger}
                defaultValue={"default"}
                onChange={(e) => handleSelectDificulty(e)}
              >
                <option value={"default"} disabled>
                  select
                </option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
              </select>
              {errors.difficulty && <h4>{errors.difficulty}</h4>}
            </div>
            <div className={Styles.divName}>
              <label>Duration (48 hs máx):</label>
              <input
                type="number"
                value={input.duration}
                name="duration"
                onChange={(e) => handleChange(e)}
                className={errors.duration && Styles.danger}
              />
              {errors.duration && <h4>{errors.duration}</h4>}
            </div>
            <div className={Styles.divCountry}>
              <label>Country:</label>
              <select
                className={errors.countries && Styles.danger}
                defaultValue={"default"}
                onChange={(e) => handleSelectCountries(e)}
              >
                <option value={"default"} disabled>
                  Choose the country
                </option>
                {countries.map((el) => (
                  <option value={el.name} key={el.id}>
                    {el.name}
                  </option>
                ))}
              </select>
              {errors.countries && <h4>{errors.countries}</h4>}
            </div>
            <div className={Styles.divDescription}>
              <label>Description:</label>
              <input
                type="text"
                value={input.description}
                name="description"
                onChange={(e) => handleChange(e)}
                className={errors.description && Styles.danger}
              />
              {errors.description && <h4>{errors.description}</h4>}
            </div>
            <div className={Styles.divSeason}>
              <label>Season:</label>
              <select
                className={errors.season && Styles.danger}
                defaultValue={"default"}
                onChange={(e) => handleSelectSeason(e)}
              >
                <option value={"default"} disabled>
                  select
                </option>
                <option value="Winter">Winter</option>
                <option value="Fall">Fall</option>
                <option value="Spring">Spring</option>
                <option value="Summer">Summer</option>
              </select>
              {errors.season && <h4>{errors.season}</h4>}
            </div>
            <div className={Styles.divCreate}>
              <input className={Styles.create} type="submit" value="Create" />
            </div>
            <div className={Styles.divReturn}>
              <Link to="/">
                <button className={Styles.btn}>Return</button>
              </Link>
            </div>
          </form>
        </div>
        <div className={Styles.containCountries}>
          {input.countries.map((el) => (
            <div key={el} className={Styles.listCountries}>
              <div>
                <h2>{el}</h2>
              </div>
              <div className={Styles.divDelete}>
                <button
                  className={Styles.btnDelete}
                  onClick={() => handleDelete(el)}
                >
                  X
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
