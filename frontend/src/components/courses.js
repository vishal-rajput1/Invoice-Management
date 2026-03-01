import "../App.css";
import { useState, useEffect } from "react";
import { Table, Button, Modal, Form, Card } from "react-bootstrap";
// import Navbar from "react-bootstrap/Navbar";
// import { useNavigate} from "react-router-dom";
import Dashmenu from "./dashmenu";
import Header from "./Header";

function Courses() {
  // let navigate = useNavigate();

  // function handleSubmit() {
  //   navigate("/Login");
  // }

  const [showModal, setShowModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [selectedcourses, setselectedcourses] = useState({
  id: "",
  course: "",
  fee:"",
  description:""
});
  const [isEditing, setIsEditing] = useState(false);
  const [courses, setcourses] = useState([]);

  // ================= FETCH Courses =================
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

  // ================= ADD Course =================
  const [newcourse, setNewcourse] = useState({
    id: "",
    course: "",
    fee: "",
    description: "",
  });

  const handleChange = (e) => {
    setNewcourse({ ...newcourse, [e.target.id]: e.target.value });
  };

  const handleAddRecord = () => {
    console.log("Save button clicked");
     const coursetosend = {
    ...newcourse,
    id: Number(newcourse.id)   // convert string → integer
  };
    
    fetch("https://invoice-management-2-s4qi.onrender.com/insertcoursetdata", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(coursetosend),
    })
      .then((res) => res.json())
      .then((data) => {
        alert(data.message);
        fetchcourses();
        setShowModal(false);
        setNewcourse({id:"", course: "", fee: "", description:"" });
      })
      .catch((err) => console.error("Insert Error:", err));
  };

  // ================= DELETE Course =================
const handleDelete = async (id) => {
  if (!window.confirm("Are you sure?")) return;

  try {
    const res = await fetch(
      `https://invoice-management-2-s4qi.onrender.com/deletecoursedata/${id}`,
      { method: "DELETE" }
    );

    const data = await res.json();
    alert(data.message);
    fetchcourses();
  } catch (err) {
    console.error("Delete Error:", err);
    alert("Delete failed");
  }
};


  // ================= VIEW Course =================
  const handleView = (course) => {
    setselectedcourses(course);
    setShowViewModal(true);
    setIsEditing(false);
  };

  // ================= EDIT Course =================
  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleEditChange = (e) => {
    setselectedcourses({ ...selectedcourses, [e.target.id]: e.target.value });
  };

  // ================= SAVE UPDATE =================
  const handleSaveEdit = () => {
  const updatecourse = {
    ...selectedcourses,
    id: Number(selectedcourses.id) // convert id to number
  };
    
    console.log("Updating:", selectedcourses);

    fetch(`https://invoice-management-2-s4qi.onrender.com/updatecoursedata/${updatecourse.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
       id: updatecourse.id,
       course: updatecourse.course,
       fee: updatecourse.fee,
       description: updatecourse.description
    })
    })
      .then((res) => res.json())
      .then((data) => {
        alert(data.message);
        fetchcourses();
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

       <div className="main-layout">
  
  <div className="sidebar">
    <Dashmenu />
  </div>

  <div className="content">

            <Card className="shadow-lg">
              <Card.Body>
                <div className="d-flex justify-content-between mb-3">
                  <h3>Courses Record</h3>
                  <Button variant="success" onClick={() => setShowModal(true)}>
                    ➕ Add Record
                  </Button>
                </div>

                <Table bordered hover responsive>
                  <thead className="table-dark">
                    <tr>
                      <th>id</th>
                      <th>Course Name</th>
                      <th>Fee</th>
                      <th>Description</th>
                      <th>Action</th>

                    </tr>
                  </thead>

                  <tbody>
                    {courses.map((stu, index) => (
                      <tr key={stu.id}>
                        <td>{stu.id}</td>
                        <td>{stu.course}</td>
                        <td>{stu.fee}</td>
                        <td>{stu.description}</td>
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
        </div>  {/* content */}
</div>  {/* main-layout */}

      {/* ADD MODAL */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Add Courses</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Control className="mb-3" id="id" type="number" placeholder="id" value={newcourse.id} onChange={handleChange} />
            <Form.Control className="mb-3" id="course" placeholder="Course" value={newcourse.course} onChange={handleChange} />
            <Form.Control className="mb-3" id="fee" placeholder="fee" value={newcourse.fee} onChange={handleChange} />
             <Form.Control className="mb-3" id="description" placeholder="description" value={newcourse.description} onChange={handleChange} />
            
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={() => setShowModal(false)}>Cancel</Button>
          <Button variant="success" onClick={() => handleAddRecord()}> Save </Button>
        </Modal.Footer>
      </Modal>

      {/* VIEW / EDIT MODAL */}
      <Modal show={showViewModal} onHide={() => setShowViewModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Courses Detail</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedcourses && !isEditing ? (
            <>
              <p><b>id:</b> {selectedcourses.id}</p>
              <p><b>Course Name:</b> {selectedcourses.course}</p>
              <p><b>Fee:</b> {selectedcourses.fee}</p>
              <p><b>Description:</b> {selectedcourses.description}</p>
            </>
          ) : selectedcourses && (
            <Form>
              <Form.Control className="mb-3" id="id"type="number" value={selectedcourses.id} onChange={handleEditChange} />
              <Form.Control className="mb-3" id="course" value={selectedcourses.course} onChange={handleEditChange} />
              <Form.Control className="mb-3" id="fee" value={selectedcourses.fee} onChange={handleEditChange} />
              <Form.Control className="mb-3" id="description" value={selectedcourses.description} onChange={handleEditChange}/>
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

export default Courses;
