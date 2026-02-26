function InvoiceForm() {
  return (
    <div className="table-container">
      <form>
        <input type="text" placeholder="Client Name" />
        <input type="email" placeholder="Email" />
        <input type="number" placeholder="Amount" />

        <select>
          <option>Paid</option>
          <option>Pending</option>
          <option>Overdue</option>
        </select>

        <button type="submit">Create Invoice</button>
      </form>
    </div>
  );
}

export default InvoiceForm;
