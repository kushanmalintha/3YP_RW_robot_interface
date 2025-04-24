import { useParams } from "react-router-dom";
import OrderForm from "../components/OrderForm.jsx";
import "../styles/order.css";

const OrderDetailsPage = () => {
  const { itemId } = useParams();
  const orderNumber = Math.floor(1000 + Math.random() * 9000);
  const tableNumber = Math.floor(1 + Math.random() * 10);

  return (
    <div className="order-container">
      <h1>Order Details</h1>
      <p><strong>Order Number:</strong> #{orderNumber}</p>
      <p><strong>Table Number:</strong> {tableNumber}</p>
      <OrderForm itemId={itemId} />
    </div>
  );
};

export default OrderDetailsPage;
