import { faTrashAlt } from "@fortawesome/free-regular-svg-icons";

import "@fortawesome/react-fontawesome";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { useContext } from "react";
import Swal from "sweetalert2";
import { ExpensessContext } from "../Context/ExpensessContext";

const TableRow = (props) => {
  // Destrucuring
  const { element } = props;

  const context = useContext(ExpensessContext);

  const onDeleteHandler = (e) => {
    e.preventDefault();
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#2196f3",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteDataFromDb(element.id);
      }
    });
  };

  const deleteDataFromDb = async (id) => {
    try {
      await axios.delete(
        `https://expenses-app-4d59b-default-rtdb.firebaseio.com/expenses/${id}.json`
      );
      const filteredArray = context.expenses.filter((expense) => {
        return expense.id !== id;
      });
      context.setExpenses(filteredArray);
      Swal.fire("Deleted!", "Your file has been deleted.", "success");
    } catch (error) {
      return error;
    }
  };
  return (
    <tr>
      <td>{element.title}</td>
      <td>{element.date}</td>
      <td>{element.value}$</td>
      <td colSpan="2">{element.desc}</td>
      <td className="text-right">
        <a onClick={onDeleteHandler} href="google.com" className="delete">
          <FontAwesomeIcon icon={faTrashAlt}></FontAwesomeIcon>
        </a>
      </td>
    </tr>
  );
};
export default TableRow;
