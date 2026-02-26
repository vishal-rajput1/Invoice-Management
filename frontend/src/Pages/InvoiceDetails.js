import { useParams } from "react-router-dom";

function InvoiceDetails() {
  const { id } = useParams();

  return (
    <div className="table-container">
      <h2>Invoice Details</h2>
      <p><strong>Invoice ID:</strong> {id}</p>
      <p><strong>Client:</strong> John Doe</p>
      <p><strong>Amount:</strong> $500</p>
      <p><strong>Status:</strong> Paid</p>
    </div>
  );
}

export default InvoiceDetails;
   