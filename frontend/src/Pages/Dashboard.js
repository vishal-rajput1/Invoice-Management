function Dashboard() {
  return (
    <>
      <div className="card-container">
        <div className="card">
          <h3>Total Invoices</h3>
          <h2>120</h2>
        </div>
        <div className="card">
          <h3>Paid</h3>
          <h2>80</h2>
        </div>
        <div className="card">
          <h3>Pending</h3>
          <h2>30</h2>
        </div>
        <div className="card">
          <h3>Overdue</h3>
          <h2>10</h2>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
