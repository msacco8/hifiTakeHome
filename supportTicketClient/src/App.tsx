import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import HandleTickets from "./components/HandleTickets/HandleTickets";
import SubmitTicket from "./components/SubmitTicket/SubmitTicket";
import "./App.css";

function App() {
  return (
    <Router>
      <div>
        <div className="navbar">
          <div className="navContainer">
            <Link to="/" className="navLink">
              Submit Ticket
            </Link>
            <Link to="/tickets" className="navLink">
              Handle Tickets
            </Link>
          </div>
        </div>
        <div className="mainContainer">
          <Routes>
            <Route index element={<SubmitTicket />} />
            <Route path="/tickets" element={<HandleTickets />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
