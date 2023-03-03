import axios from "axios";
import { useContext, useRef, useState } from "react";
import Swal from "sweetalert2";
import { ExpensessContext } from "../Context/ExpensessContext";
import classes from "./../resources/css/custom.module.css";

const Form = () => {
  const context = useContext(ExpensessContext);

  const titleRef = useRef();
  const valueRef = useRef();
  const dateRef = useRef();
  const descRef = useRef();

  const [obj, setObj] = useState({
    id: Date.now(),
    title: "",
    value: 0,
    date: "",
    desc: "",
  });

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    if (checkFormInput()) {
      try {
        const response = await axios.post(
          "https://expenses-app-4d59b-default-rtdb.firebaseio.com/expenses.json",
          obj
        );
        setObj({ ...obj, id: response.data.name });
      } catch (error) {
        return error;
      }
      context.setExpenses((prevState) => {
        return [...prevState, obj];
      });
      clearForm();
      Swal.fire({
        icon: "success",
        title: "Added Successfully",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };

  const checkFormInput = () => {
    if (
      titleRef.current.value !== "" &&
      valueRef.current.value !== "" &&
      dateRef.current.value !== "" &&
      descRef.current.value !== ""
    ) {
      return true;
    } else {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Make Sure To Fill The Form",
        showConfirmButton: false,
        timer: 2000,
      });
    }
  };

  const clearForm = () => {
    titleRef.current.value = "";
    valueRef.current.value = "";
    dateRef.current.value = "";
    descRef.current.value = "";
  };
  return (
    <div className="col-sm-6 mt-5">
      <div className="row tit">
        <h4 className="">wellcom to Nader's Expense Manager </h4>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam
        </p>
      </div>
      <form className="row" onSubmit={onSubmitHandler}>
        <div className="mb-3 col-md-6">
          <label className="form-label">Title</label>
          <input
            type="text"
            className="form-control addTitle"
            aria-describedby=""
            onChange={(e) => setObj({ ...obj, title: e.target.value })}
            ref={titleRef}
          />
        </div>

        <div className="mb-3 col-md-6">
          <label className="form-label">Date</label>
          <input
            type="date"
            className="form-control addDate"
            aria-describedby=""
            onChange={(e) => setObj({ ...obj, date: e.target.value })}
            ref={dateRef}
          />
        </div>

        <div className="mb-3 col-md-6">
          <label className="form-label">Value</label>
          <input
            type="number"
            className="form-control addValue"
            aria-describedby=""
            onChange={(e) => setObj({ ...obj, value: e.target.value })}
            ref={valueRef}
          />
        </div>
        <div className="mb-3 col-md-6">
          <label htmlFor="title" className="form-label">
            Description
          </label>
          <input
            type="text"
            className="form-control addDescrption"
            aria-describedby=""
            onChange={(e) => setObj({ ...obj, desc: e.target.value })}
            ref={descRef}
          />
        </div>
        <div className="mb-3 col-md-12 text-right">
          <button type="submit" className={classes.addBtn}>
            Add
          </button>
        </div>
      </form>
    </div>
  );
};
export default Form;
