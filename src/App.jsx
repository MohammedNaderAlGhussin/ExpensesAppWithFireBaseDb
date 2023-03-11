import { useContext, useEffect } from "react";
import Form from "./Components/Form";
import { ExpensessContext } from "./Context/ExpensessContext";
import Logo from "./resources/images/m1.png";
import axios from "axios";
import TableRow from "./Components/TableRow";

function App() {
  const context = useContext(ExpensessContext);

  const getData = async () => {
    try {
      const data = await axios.get(
        "https://expenses-app-4d59b-default-rtdb.firebaseio.com/expenses.json"
      );

      const fetchedData = [];

      for (let key in data.data) {
        const expense = data.data[key];
        expense.id = key;
        fetchedData.push(expense);
      }
      context.setExpenses(fetchedData);
    } catch (error) {
      return error;
    }
  };

  useEffect(() => {
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-sm-6">
        <img src={Logo} alt="" className="img-fluid" />
        </div>
        <Form />
      </div>

      <div className="row mt-5 mb-5">
        <div className="custom-card ">
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
        </div>
      </div>
    </div>
  );
}

export default App;
