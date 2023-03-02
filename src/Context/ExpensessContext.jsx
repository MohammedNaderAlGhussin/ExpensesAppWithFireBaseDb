import { createContext, useState } from "react";

export const ExpensessContext = createContext({
  expenses: [],
  setExpenses: (value) => {},
});

export const ExpensessContextProvider = ({ children }) => {
  const [expenses, setExpenses] = useState([]);
  return (
    <ExpensessContext.Provider
      value={{
        expenses: expenses,
        setExpenses: setExpenses,
      }}
    >
      {children}
    </ExpensessContext.Provider>
  );
};
