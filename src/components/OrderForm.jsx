import { useState } from "react";

const OrderForm = ({ itemId }) => {
  const [instructions, setInstructions] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Order placed for Item ID: ${itemId} with instructions: ${instructions}`);
  };

  return (
    <form className="order-form" onSubmit={handleSubmit}>
      <label>Special Instructions:</label>
      <textarea
        value={instructions}
        onChange={(e) => setInstructions(e.target.value)}
        placeholder="Enter any special requests..."
      />
      <button type="submit">Confirm Order</button>
    </form>
  );
};

export default OrderForm;
