// import "./resources/css/custom.css";
import { useContext, useEffect } from "react";
import Form from "./Components/Form";
import LogImg from "./Components/LogoImg";
import Table from "./Components/Table";
import { ExpensessContext } from "./Context/ExpensessContext";
function App() {
  const context = useContext(ExpensessContext);
  const getData = async () => {
    const data = await (
      await fetch(
        "https://expenses-app-4d59b-default-rtdb.firebaseio.com/expenses.json",
        {
          method: "GET",
        }
      )
    ).json();

    const fetchedData = [];

    for (let key in data) {
      const expense = data[key];
      expense.id = key;
      fetchedData.push(expense);
    }
    context.setExpenses(fetchedData);
  };
  useEffect(() => {
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-sm-6">
          <LogImg />
        </div>
        <Form />
      </div>

      <div className="row mt-5 mb-5">
        <div className="custom-card ">
          <Table />
        </div>
      </div>
    </div>
  );
}

export default App;
