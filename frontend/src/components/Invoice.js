import "../App.css";
import { useState, useEffect } from "react";
import jsPDF from "jspdf";
import { Table, Button, Modal, Form, Card } from "react-bootstrap";
// import { useNavigate } from "react-router-dom";
import Dashmenu from "./dashmenu";
import Header from "./Header";

function Invoice() {
  // let navigate = useNavigate();

  const [showModal, setShowModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

const handleDownload = (inv) => {
  const doc = new jsPDF({
    orientation: "portrait",
    unit: "mm",
    format: [80, 200] // Thermal receipt size
  });

  let y = 10;

  const line = () => {
    doc.line(5, y, 75, y);
    y += 4;
  };

  const centerText = (text) => {
    doc.text(text, 40, y, { align: "center" });
    y += 5;
  };

  const leftText = (text) => {
    doc.text(text, 5, y);
    y += 5;
  };

  // const rightText = (text) => {
  //   doc.text(text, 75, y, { align: "right" });
  //   y += 5;
  // };

  // ===============================
  // STORE HEADER
  // ===============================
  doc.setFontSize(12);
  centerText("Softech Infoways");
  doc.setFontSize(9);
  centerText("Agrasain colony,Sirsa-Haryana");
  centerText("Phone: 99966-70050");
  centerText("GSTIN: 06XXXXX1234Z1Z");
  line();

  // ===============================
  // CUSTOMER + BILL INFO
  // ===============================
  doc.setFontSize(9);
  leftText(`Customer: ${inv.studentName}`);
  leftText(`Bill No: ${inv.invoiceNumber}`);
  leftText(`Date: ${new Date().toLocaleDateString()}`);
  leftText(`Time: ${new Date().toLocaleTimeString()}`);
  line();

  // ===============================
  // TABLE HEADER
  // ===============================
doc.setFontSize(8);

doc.text("Item", 5, y);
doc.text("Rate", 50, y);
doc.text("Amt", 75, y, { align: "right" });
y += 4;
line();

// ===============================
// ITEMS
// ===============================
const fee = Number(inv.fee || 0);
const discount = Number(inv.discount || 0);
const total = fee - discount;

// Shorten long item names automatically
const itemName =
  inv.course.length > 18
    ? inv.course.substring(0, 18) + "..."
    : inv.course;

doc.text(itemName, 5, y);
doc.text(fee.toFixed(2), 52, y);
doc.text(total.toFixed(2), 75, y, { align: "right" });
y += 5;

line();

  // ===============================
  // TOTAL SECTION
  // ===============================
  leftText(`Sub Total: ${fee.toFixed(2)}`);
  leftText(`Discount: ${discount.toFixed(2)}`);
  line();

  doc.setFontSize(11);
  doc.text(`G.T.: ${total.toFixed(2)}`, 75, y, { align: "right" });
  y += 6;

  line();

  // ===============================
  // FOOTER
  // ===============================
  centerText("CREDIT");
  centerText("Thank You Visit Again!");

  doc.save(`Receipt_${inv.invoiceNumber}.pdf`);
};
    const [courses, setcourses] = useState([]);
const fetchcourses = () => {
    fetch("https://invoice-management-2-s4qi.onrender.com/getcoursedata")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data.message)) {
    setcourses(data.message);
  } else {
    setcourses([]);
  }
      })
      .catch((err) => console.error("Fetch Error:", err));
  };

  useEffect(() => {
    fetchcourses();
  }, []);

  const [invoice, setinvoice] = useState([]);

  const [selectedinvoice, setselectedinvoice] = useState({
    id: "",
    invoiceNumber: "",
    studentName: "",
    phone: "",
    email: "",
    address: "",
    course: "",
    fee: "",
    referredBy: "",
    discount: ""
  });

  const [newinvoice, setNewinvoice] = useState({
    id:"",
    invoiceNumber: "",
    studentName: "",
    phone: "",
    email: "",
    address: "",
    course: "",
    fee: "",
    referredBy: "",
    discount: ""
  });

  // ================= FETCH =================
  const fetchinvoice = () => {
    fetch("https://invoice-management-2-s4qi.onrender.com/getinvoicedata")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data.message)) {
          setinvoice(data.message);
        } else {
          setinvoice([]);
        }
      })
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    fetchinvoice();
  }, []);

  // ================= HANDLE CHANGE =================
  const handleChange = (e) => {
  const { id, value } = e.target;

  setNewinvoice({
    ...newinvoice,
    [id]: id === "id" ? Number(value) : value
  });
};

  const handleEditChange = (e) => {
   setselectedinvoice({ ...selectedinvoice, [e.target.id]: e.target.value });
};

  // ================= ADD =================
  const handleAddRecord = () => {
    fetch("http://localhost:5000/insertinvoicedata", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newinvoice)
    })
      .then((res) => res.json())
      .then((data) => {
        alert(data.message);
        fetchinvoice();
        setShowModal(false);
        setNewinvoice({
          id:"",
          invoiceNumber: "",
          studentName: "",
          phone: "",
          email: "",
          address: "",
          course: "",
          fee: "",
          referredBy: "",
          discount: ""
        });
      });
  };

  // ================= DELETE =================
  const handleDelete = (id) => {
  console.log("Deleting:", id); // debug

  if (!window.confirm("Are you sure?")) return;

  fetch(`https://invoice-management-2-s4qi.onrender.com/deleteinvoicedata/${id}`, {
    method: "DELETE"
  })
    .then((res) => res.json())
    .then((data) => {
      alert(data.message);
      fetchinvoice();
    })
    .catch((err) => console.error("Delete error:", err));
};

  // ================= VIEW =================
  const handleView = (inv) => {
    setselectedinvoice(inv);
    setShowViewModal(true);
    setIsEditing(false);
  };

  // ================= SAVE EDIT =================
  const handleEdit = () => {
    setIsEditing(true);
  };
  const handleSaveEdit = () => {
    const updateinvoice = {
    ...selectedinvoice,
    id: Number(selectedinvoice.id) // convert id to number
  };
    
    console.log("Updating:",selectedinvoice);
    fetch(
      `https://invoice-management-2-s4qi.onrender.com/${updateinvoice.id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          id:updateinvoice.id,
          invoiceNumber:updateinvoice.invoiceNumber,
          studentName:updateinvoice.studentName,
          phone:updateinvoice.phone,
          email:updateinvoice.email,
          address:updateinvoice.address,
          course:updateinvoice.course,
          fee:updateinvoice.fee,
          referredBy:updateinvoice.referredBy,
          discount:updateinvoice.discount
        })
      }
    )
      .then((res) => res.json())
      .then((data) => {
        alert(data.message);
        fetchinvoice();
        setShowViewModal(false);
        setIsEditing(false);
      })
    .catch((err) => console.error("Update Error:", err));
  };

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
            <Card className="shadow-lg">
              <Card.Body>

                <div className="d-flex justify-content-between mb-3">
                  <h3>Invoice Record</h3>
                  <Button variant="success" onClick={() => setShowModal(true)}>
                    ➕ Add Invoice
                  </Button>
                </div>

                <Table bordered hover responsive>
                  <thead className="table-dark">
                    <tr>
                      <th>Id</th>
                      <th>Invoice No</th>
                      <th>Student Name</th>
                      <th>Phone</th>
                      <th>Email</th>
                      <th>Course</th>
                      <th>Fee</th>
                      <th>Referred By</th>
                      <th>Discount</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {invoice.map((inv) => (
                      <tr key={inv.id}>
                        <td>{inv.id}</td>
                        <td>{inv.invoiceNumber}</td>
                        <td>{inv.studentName}</td>
                        <td>{inv.phone}</td>
                        <td>{inv.email}</td>
                        <td>{inv.course}</td>
                        <td>{inv.fee}</td>
                        <td>{inv.referredBy}</td>
                        <td>{inv.discount}</td>
                       <td>
                          <div className="action-buttons">
                            <Button size="sm" variant="info" onClick={() => handleView(inv)}>
                              View
                           </Button>
                           <Button size="sm" variant="primary" onClick={() => handleDownload(inv)}>
                              Download
                           </Button>
                          <Button size="sm" variant="danger" onClick={() => handleDelete(inv.id)}>
                             Delete
                          </Button>
                       </div>
                      </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </Card.Body>
            </Card>
          </div>
        </div>

{/* VIEW / EDIT MODAL */}
<Modal
  show={showViewModal}
  onHide={() => setShowViewModal(false)}
  centered
  size="lg"
>
  <Modal.Header closeButton>
    <Modal.Title>Invoice Detail</Modal.Title>
  </Modal.Header>

  <Modal.Body>
    {!isEditing ? (
      <>
        <p><b>id:</b> {selectedinvoice.id}</p>
        <p><b>Invoice No:</b> {selectedinvoice.invoiceNumber}</p>
        <p><b>Student Name:</b> {selectedinvoice.studentName}</p>
        <p><b>Phone:</b> {selectedinvoice.phone}</p>
        <p><b>Email:</b> {selectedinvoice.email}</p>
        <p><b>Address:</b> {selectedinvoice.address}</p>
        <p><b>Course:</b> {selectedinvoice.course}</p>
        <p><b>Fee:</b> {selectedinvoice.fee}</p>
        <p><b>Referred By:</b> {selectedinvoice.referredBy}</p>
        <p><b>Discount:</b> {selectedinvoice.discount}</p>
      </>
    ) : (
      <Form>
        <Form.Control className="mb-2" id="id" type="number" value={selectedinvoice.id} onChange={handleEditChange}/>
        <Form.Control className="mb-2" id="invoiceNumber" value={selectedinvoice.invoiceNumber} onChange={handleEditChange} />
        <Form.Control className="mb-2" id="studentName" value={selectedinvoice.studentName} onChange={handleEditChange} />
        <Form.Control className="mb-2" id="phone" value={selectedinvoice.phone} onChange={handleEditChange} />
        <Form.Control className="mb-2" id="email" value={selectedinvoice.email} onChange={handleEditChange} />
        <Form.Control className="mb-2" id="address" value={selectedinvoice.address} onChange={handleEditChange} />
        <Form.Select
  className="mb-2"
  id="course"
  value={selectedinvoice.course}
  onChange={handleEditChange}
>
  <option value="">Select Course</option>

  {courses.map((c) => (
    <option key={c.id} value={c.course}>
      {c.course}
    </option>
  ))}
</Form.Select>
        <Form.Control className="mb-2" id="fee" value={selectedinvoice.fee} onChange={handleEditChange} />
        <Form.Control className="mb-2" id="referredBy" value={selectedinvoice.referredBy} onChange={handleEditChange} />
        <Form.Control className="mb-2" id="discount" value={selectedinvoice.discount} onChange={handleEditChange} />
      </Form>
    )}
  </Modal.Body>

  <Modal.Footer>
    {!isEditing ? (
      <>
        <Button variant="warning" onClick={handleEdit}>
          Edit
        </Button>
        <Button variant="secondary" onClick={() => setShowViewModal(false)}>
          Close
        </Button>
      </>
    ) : (
      <>
        <Button variant="secondary" onClick={() => setIsEditing(false)}>
          Cancel
        </Button>
        <Button variant="success" onClick={handleSaveEdit}>
          Save
        </Button>
      </>
    )}
  </Modal.Footer>
</Modal>

      {/* ADD MODAL */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Add Invoice</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
             <Form.Control className="mb-2" id="id" type="number" placeholder="id" onChange={handleChange}/>
            <Form.Control className="mb-2" id="invoiceNumber" placeholder="Invoice Number" onChange={handleChange} />
            <Form.Control className="mb-2" id="studentName" placeholder="Student Name" onChange={handleChange} />
            <Form.Control className="mb-2" id="phone" placeholder="Phone" onChange={handleChange} />
            <Form.Control className="mb-2" id="email" placeholder="Email" onChange={handleChange} />
            <Form.Control className="mb-2" id="address" placeholder="Address" onChange={handleChange} />
            <Form.Select  className="mb-2"id="course" value={newinvoice.course} onChange={handleChange}> 
              <option value="">Select Course</option> 
              {courses.map((c) => ( 
                <option key={c.id} value={c.course}> {c.course}   </option> 
                ))}
                </Form.Select>
            <Form.Control className="mb-2" id="fee" placeholder="Fee" onChange={handleChange} />
            <Form.Control className="mb-2" id="referredBy" placeholder="Referred By" onChange={handleChange} />
            <Form.Control className="mb-2" id="discount" placeholder="Discount" onChange={handleChange} />
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={() => setShowModal(false)}>Cancel</Button>
          <Button variant="success" onClick={handleAddRecord}>Save</Button>
        </Modal.Footer>
      </Modal>

    </div>
  );
}

export default Invoice;
