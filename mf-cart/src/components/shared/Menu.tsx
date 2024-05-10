import { Button } from "@/components/ui/button";
import { useCartStore } from "@/store/cartStore";
import { Link } from "react-router-dom";

const Menu = () => {
  const { products } = useCartStore();
  return (
    <div className="py-4 bg-secondary">
      <div className="container flex justify-end">
        <Button asChild className="flex gap-2">
          <Link to="/cart">Items: {products.length}</Link>
        </Button>
      </div>
    </div>
  );
};

export default Menu;
