import "../App.css";
import { useEffect, useState } from "react";
import { Card, Row, Col, Table } from "react-bootstrap";
import Dashmenu from "./dashmenu";
import Header from "./Header";
import { useNavigate } from "react-router-dom";

function Dashboard() {

  const navigate = useNavigate();

  const [members, setMembers] = useState([]);
  const [courses, setCourses] = useState([]);
  const [invoices, setInvoices] = useState([]);
  const [totalSale, setTotalSale] = useState(0);

  // ================= FETCH ALL DATA =================
  useEffect(() => {
    fetchMembers();
    fetchCourses();
    fetchInvoices();
  }, []);

  const fetchMembers = () => {
    fetch("https://invoice-management-2-s4qi.onrender.com/getteamdata")
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data.message)) {
          setMembers(data.message);
        }
      });
  };

  const fetchCourses = () => {
    fetch("https://invoice-management-2-s4qi.onrender.com/getcoursedata")
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data.message)) {
          setCourses(data.message);
        }
      });
  };

  const fetchInvoices = () => {
    fetch("https://invoice-management-2-s4qi.onrender.com/getinvoicedata")
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data.message)) {
          setInvoices(data.message);

          let sale = 0;
          data.message.forEach(inv => {
            sale += Number(inv.fee || 0) - Number(inv.discount || 0);
          });

          setTotalSale(sale);
        }
      });
  };

  // ================= REFERRAL COUNT LOGIC =================
 // ================= MEMBER PERFORMANCE LOGIC =================

let memberPerformance = {};

invoices.forEach((inv) => {

  if (inv.referredBy) {

    let sale = Number(inv.fee || 0) - Number(inv.discount || 0);

    if (memberPerformance[inv.referredBy]) {

      memberPerformance[inv.referredBy].count += 1;
      memberPerformance[inv.referredBy].totalSale += sale;

    } else {

      memberPerformance[inv.referredBy] = {
        count: 1,
        totalSale: sale
      };

    }
  }

});

// Convert object to array
let referralArray = [];

for (let key in memberPerformance) {
  referralArray.push({
    name: key,
    count: memberPerformance[key].count,
    totalSale: memberPerformance[key].totalSale
  });
}
  // Recent 5
  const recentInvoices = [...invoices].slice(-5).reverse();
  const recentCourses = [...courses].slice(-5).reverse();

  return (
    <div style={{ backgroundColor: "#f8f9fb", minHeight: "100vh" }}>

      <Header 
        title={
          <img
            src={require("../components/computer11.jpg.png")}
            alt="Logo"
            width="45"
            height="45"
            className="rounded-circle"
          />
        }
      />

      <div className="main-layout">
        <div className="sidebar">
          <Dashmenu />
        </div>

        <div className="content">

          {/* ================= CARDS ================= */}
          <Row className="mb-4">

            <Col md={3}>
              <Card className="dashboard-card bg-primary text-white"
                style={{ cursor: "pointer" }}
                onClick={() => navigate("/teammember")}>
                <h6>Total Member</h6>
                <h3>{members.length}</h3>
              </Card>
            </Col>

            <Col md={3}>
              <Card className="dashboard-card bg-info text-white"
                style={{ cursor: "pointer" }}
                onClick={() => navigate("/courses")}>
                <h6>Total Category</h6>
                <h3>{courses.length}</h3>
              </Card>
            </Col>

            <Col md={3}>
              <Card className="dashboard-card bg-success text-white"
                style={{ cursor: "pointer" }}
                onClick={() => navigate("/invoice")}>
                <h6>Total Sale</h6>
                <h3>₹ {totalSale}</h3>
              </Card>
            </Col>

            <Col md={3}>
              <Card className="dashboard-card bg-warning text-white"
                style={{ cursor: "pointer" }}
                onClick={() => navigate("/invoice")}>
                <h6>Total Invoice</h6>
                <h3>{invoices.length}</h3>
              </Card>
            </Col>

          </Row>

          {/* ================= CHART SECTION ================= */}
          <Row className="mb-4">

            <Col md={6}>
              <Card className="p-3">
                <h5>Member Performance</h5>

                <div className="line-chart">
  {referralArray.slice(0, 6).map((item, index) => (
    <div key={index} className="bar-wrapper">

      <div
        className="line-bar"
        style={{ height: item.totalSale / 100 }}  // adjust divider if too tall
      ></div>

      <span className="bar-label">
        {item.name}
      </span>

      <small>₹ {item.totalSale}</small>

    </div>
  ))}
</div>

              </Card>
            </Col>

            {/* DONUT CHART */}
            <Col md={6}>
              <Card className="p-3 text-center">
                <h5>Invoice Distribution</h5>

                <div className="donut">
                  <div className="donut-center">
                    {invoices.length}
                  </div>
                </div>

                <p className="mt-2">Total Invoices</p>

              </Card>
            </Col>

          </Row>

          {/* ================= RECENT TABLES ================= */}
          <Row>

            <Col md={6}>
              <Card className="p-3">
                <h5>Recent 5 Invoices</h5>

                <Table bordered size="sm">
                  <thead className="table-dark">
                    <tr>
                      <th>Invoice No</th>
                      <th>Name</th>
                      <th>Fee</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentInvoices.map(inv => (
                      <tr key={inv.id}>
                        <td>{inv.invoiceNumber}</td>
                        <td>{inv.studentName}</td>
                        <td>{inv.fee}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </Card>
            </Col>

            <Col md={6}>
              <Card className="p-3">
                <h5>Recent 5 Products Added</h5>

                <Table bordered size="sm">
                  <thead className="table-dark">
                    <tr>
                      <th>Course</th>
                      <th>Fee</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentCourses.map(course => (
                      <tr key={course.id}>
                        <td>{course.course}</td>
                        <td>{course.fee}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </Card>
            </Col>

          </Row>

        </div>
      </div>
    </div>
  );
}

export default Dashboard;