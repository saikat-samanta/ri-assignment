import React from "react";
import "./App.css";
import { Home, AddEmployee } from "./pages";
import { Route, Routes } from "react-router-dom";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { DBContextProvider } from "./context";

function App(): React.JSX.Element {
  return (
    <div className="App">
      <DBContextProvider>
        <LocalizationProvider dateAdapter={AdapterMoment}>
          <Routes>
            <Route element={<Home />} path="/" />
            <Route element={<AddEmployee />} path="/employee-details/:id?" />
          </Routes>
        </LocalizationProvider>
      </DBContextProvider>
    </div>
  );
}

export default App;
