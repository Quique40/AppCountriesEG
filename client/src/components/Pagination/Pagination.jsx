import React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import s from "../Pagination/Pagination.module.sass";

import { setCurrentPage } from "../../redux/action";

export default function Paginado() {
  // React:
  let [maxPages, setMaxPages] = useState(1);
  const [localCurrPage, setLocalCurrPage] = useState(1);

  // Redux:
  const dispatch = useDispatch();
  const countriActiv = useSelector((state) => state.allCountries);

  const currentPage = useSelector((state) => state.currentPage);
  const cardsPerPage = useSelector((state) => state.cardsPerPage);
  // const order = useSelector((state) => state.orderName);
  let auxMaxPage = Math.ceil(countriActiv.length / cardsPerPage);

  maxPages = auxMaxPage;

  useEffect(() => {
    setLocalCurrPage(currentPage);
    setMaxPages(maxPages);
  }, [currentPage, cardsPerPage, countriActiv.length, maxPages]);

  const handleChangeInput = (e) => {
    e.preventDefault();
    setLocalCurrPage(e.target.value);
    if (e.target.value >= 1 && e.target.value <= maxPages)
      dispatch(setCurrentPage(e.target.value));
  };

  return (
    <div className={s.pagination}>
      <div>
        <button
          className={currentPage > 1 ? s.pagButton : s.pagButtonDisabled}
          onClick={() => currentPage > 1 && dispatch(setCurrentPage("prev"))}
        >
          {"< Prev"}
        </button>
      </div>
      <div id={s.pageContainer}>
        <input
          id={s.currPage}
          type="number"
          value={localCurrPage}
          onChange={(e) => handleChangeInput(e)}
        ></input>
      </div>
      <p className={s.maxPages}>de {maxPages}</p>
      <div>
        <button
          className={
            currentPage !== maxPages ? s.pagButton : s.pagButtonDisabled
          }
          onClick={() =>
            currentPage !== maxPages && dispatch(setCurrentPage("next"))
          }
        >
          {"Next >"}
        </button>
      </div>
    </div>
  );
}
