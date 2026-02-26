import { Card, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function Dashmenu() {
  const navigate = useNavigate();

  return (
    <Card className="shadow-sm p-3 h-100">
      <Button
        className="w-100 mt-2"
        variant="outline-primary"
        onClick={() => navigate("/")}
      >
        Dashboard
      </Button>

      <Button
        className="w-100 mt-2"
        variant="outline-success"
        onClick={() => navigate("/teammember")}
      >
        Team-Member
      </Button>

      <Button
        className="w-100 mt-2"
        variant="outline-success"
        onClick={() => navigate("/courses")}
      >
        Courses
      </Button>

      <Button
        className="w-100 mt-2"
        variant="outline-warning"
        onClick={() => navigate("/invoice")}
      >
        Invoice
      </Button>
    </Card>
  );
}

export default Dashmenu;