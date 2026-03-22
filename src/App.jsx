import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import CreateEmployee from "./pages/CreateEmployee";
import EmployeeList from "./pages/EmployeeList";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<CreateEmployee />} />
        <Route path="/employee-list" element={<EmployeeList />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
