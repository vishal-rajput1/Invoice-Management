import "../App.css";
import { useState, useEffect } from "react";
import { Table, Button, Modal, Form, Card } from "react-bootstrap";
// import Navbar from "react-bootstrap/Navbar";
// import { useNavigate} from "react-router-dom";
import Dashmenu from "./dashmenu";
import Header from "./Header";

function Teammember() {
  // let navigate = useNavigate();


  const [showModal, setShowModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [selectedmember, setselectedmember] = useState({
  id: "",
  membername: "",
  email: "",
  phone: ""
});
  const [isEditing, setIsEditing] = useState(false);
  const [member, setmember] = useState([]);

  // ================= FETCH Member =================
  const fetchmember = () => {
    fetch("https://invoice-management-2-s4qi.onrender.com/getteamdata")
      .then((res) => res.json())
      .then((data) => {
  if (Array.isArray(data.message)) {
    setmember(data.message);
  } else {
    setmember([]);
  }
})

      .catch((err) => console.error("Fetch Error:", err));
  };

  useEffect(() => {
    fetchmember();
  }, []);

  // ================= ADD Member =================
  const [newMember, setNewMember] = useState({
    id: "",
    membername: "",
    email: "",
    phone: "",
  });

  const handleChange = (e) => {
    setNewMember({ ...newMember, [e.target.id]: e.target.value });
  };

  const handleAddRecord = () => {
     const memberTosend = {
    ...newMember,
    id: Number(newMember.id)   // convert string → integer
  };
    
    fetch("https://invoice-management-2-s4qi.onrender.com/insertteamdata", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(memberTosend),
    })
      .then((res) => res.json())
      .then((data) => {
        alert(data.message);
        fetchmember();
        setShowModal(false);
        setNewMember({id:"", membername: "", email: "", phone:"" });
      })
      .catch((err) => console.error("Insert Error:", err));
  };

  // ================= DELETE Course =================
const handleDelete = async (id) => {
  if (!window.confirm("Are you sure?")) return;

  try {
    const res = await fetch(
      `https://invoice-management-2-s4qi.onrender.com/deleteteamdata/${id}`,
      { method: "DELETE" }
    );

    const data = await res.json();
    alert(data.message);
    fetchmember();
  } catch (err) {
    console.error("Delete Error:", err);
    alert("Delete failed");
  }
};


  // ================= VIEW Course =================
  const handleView = (member) => {
    setselectedmember(member);
    setShowViewModal(true);
    setIsEditing(false);
  };

  // ================= EDIT Course =================
  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleEditChange = (e) => {
    setselectedmember({ ...selectedmember, [e.target.id]: e.target.value });
  };

  // ================= SAVE UPDATE =================
  const handleSaveEdit = () => {
  const updatemember = {
    ...selectedmember,
    id: Number(selectedmember.id) // convert id to number
  };
    
    console.log("Updating:", selectedmember);

    fetch(`https://invoice-management-2-s4qi.onrender.com/updateteamdata/${updatemember.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
       id: updatemember.id,
       membername: updatemember.membername,
       email: updatemember.email,
       phone: updatemember.phone
    })
    })

 

      .then((res) => res.json())
      .then((data) => {
        alert(data.message);
        fetchmember();
        setShowViewModal(false);
        setIsEditing(false);
      })
      .catch((err) => console.error("Update Error:", err));
  };

  // ================= UI =================
  return (
    <div style={{ backgroundColor: "#f8f9fb", minHeight: "100vh" }}>
      
      {/* HEADER */}
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

  {/* MAIN LAYOUT */}
  <div className="main-layout">
    
    <div className="sidebar">
      <Dashmenu />
    </div>

    <div className="content">
      <Card className="shadow-lg">
        <Card.Body>

          <div className="d-flex justify-content-between mb-3">
            <h3>Member Record</h3>
            <Button variant="success" onClick={() => setShowModal(true)}>
              ➕ Add Record
            </Button>
          </div>

          <Table bordered hover responsive>
            <thead className="table-dark">
              <tr>
                <th>id</th>
                <th>Member Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {member.map((stu) => (
                <tr key={stu.id}>
                  <td>{stu.id}</td>
                  <td>{stu.membername}</td>
                  <td>{stu.email}</td>
                  <td>{stu.phone}</td>
                  <td>
                    <Button size="sm" variant="info" onClick={() => handleView(stu)}>
                      View
                    </Button>{" "}
                    <Button size="sm" variant="danger" onClick={() => handleDelete(stu.id)}>
                      Delete
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Card.Body>
      </Card>
    </div>
</div>

      {/* ADD MODAL */}
      <Modal
  show={showModal}
  onHide={() => setShowModal(false)}
  centered
  size="lg"
  backdrop="static"
  keyboard={false}
  className="custom-modal"
>


        <Modal.Header closeButton>
          <Modal.Title>Add Member</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Control className="mb-3" id="id" type="number" placeholder="id" value={newMember.id} onChange={handleChange} />
            <Form.Control className="mb-3" id="membername" placeholder="Member Name" value={newMember.membername} onChange={handleChange} />
            <Form.Control className="mb-3" id="email" placeholder="Email" value={newMember.email} onChange={handleChange} />
             <Form.Control className="mb-3" id="phone" placeholder="Phone" value={newMember.phone} onChange={handleChange} />
            
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={() => setShowModal(false)}>Cancel</Button>
          <Button variant="success" onClick={handleAddRecord}>Save</Button>
        </Modal.Footer>
      </Modal>

      {/* VIEW / EDIT MODAL */}
      <Modal
  show={showViewModal}
  onHide={() => setShowViewModal(false)}
  centered
  size="lg"
  backdrop="static"
  className="custom-modal"
>

        <Modal.Header closeButton>
          <Modal.Title>member Detail</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedmember && !isEditing ? (
            <>
              <p><b>id:</b> {selectedmember.id}</p>
              <p><b>Member Name:</b> {selectedmember.membername}</p>
              <p><b>Email:</b> {selectedmember.email}</p>
              <p><b>Phone:</b> {selectedmember.phone}</p>
            </>
          ) : selectedmember && (
            <Form>
              <Form.Control className="mb-3" id="id"type="number" value={selectedmember.id} onChange={handleEditChange} />
              <Form.Control className="mb-3" id="membername" value={selectedmember.membername} onChange={handleEditChange} />
              <Form.Control className="mb-3" id="email" value={selectedmember.email} onChange={handleEditChange} />
              <Form.Control className="mb-3" id="phone" value={selectedmember.phone} onChange={handleEditChange}/>
            </Form>
          )}
        </Modal.Body>
        <Modal.Footer>
          {!isEditing ? (
            <>
              <Button variant="warning" onClick={handleEdit}>Edit</Button>
              <Button variant="secondary" onClick={() => setShowViewModal(false)}>Close</Button>
            </>
          ) : (
            <>
              <Button variant="secondary" onClick={() => setIsEditing(false)}>Cancel</Button>
              <Button variant="success" onClick={handleSaveEdit}>Save</Button>
            </>
          )}
        </Modal.Footer>
      </Modal>

    </div>
  );
}

export default Teammember;
