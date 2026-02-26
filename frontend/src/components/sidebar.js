import { Link } from "react-router-dom";

function Sidebar() {
  return (
    <div className="sidebar">
      <h2>Invoice App</h2>
      <Link to="/">Dashboard</Link>
      <Link to="/invoices">Invoices</Link>
      <Link to="/create">Create Invoice</Link>
    </div>
  );
}

export default Sidebar;
