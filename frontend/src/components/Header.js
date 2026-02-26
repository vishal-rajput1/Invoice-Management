// import { Button } from "react-bootstrap";
// import { useNavigate } from "react-router-dom";

function Header({ title }) {
  // const navigate = useNavigate();

  // const handleLogout = () => {
  //   navigate("/Login");
  // };

  return (
    <div className="topbar">
      <h4>{title}</h4>
      <div>
        <span className="me-3">Welcome, Admin</span>
        {/* <Button variant="danger" size="sm" onClick={handleLogout}>
          Logout
        </Button> */}
      </div>
    </div>
  );
}

export default Header;