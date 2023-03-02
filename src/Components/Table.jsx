import { useContext } from "react";
import { ExpensessContext } from "../Context/ExpensessContext";
import TableRow from "./TableRow";

const Table = () => {
  const context = useContext(ExpensessContext);
  return (
    <table className="table ">
      <thead>
        <tr>
          <th> Title</th>
          <th> Date</th>
          <th>value</th>
          <th>Description</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr id="addRow"></tr>
        {context.expenses.map((element) => {
          return <TableRow key={element.id} element={element} />;
        })}
      </tbody>
    </table>
  );
};
export default Table;
