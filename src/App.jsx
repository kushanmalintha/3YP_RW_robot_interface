import { Routes, Route } from "react-router-dom";
import MenuPage from "./pages/MenuPage";
import OrderDetailsPage from "./pages/OrderDetailsPage";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<MenuPage />} />
      <Route path="/order/:itemId" element={<OrderDetailsPage />} />
    </Routes>
  );
};

export default App;
