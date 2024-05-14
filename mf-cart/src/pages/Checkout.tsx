import { Link } from "react-router-dom";
// import { Card, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
// import { useCartStore, useCartStoreTotalPrice } from "@/store/cartStore";

const Checkout = () => {
  return (
    <div className="py-5">
      <div className="container">
        <h1>Checkout</h1>
        <br />
        <br />
        <Link to="/">Cart</Link>
      </div>
    </div>
  );
};

export default Checkout;
