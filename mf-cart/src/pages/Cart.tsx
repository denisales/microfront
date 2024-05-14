import { Card, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useCartStore, useCartStoreTotalPrice } from "@/store/cartStore";
import { Link } from "react-router-dom";

const Cart = () => {
  const { products } = useCartStore();
  const total = useCartStoreTotalPrice();

  return (
    <div className="py-5">
      <div className="container">
        <div className="grid gap-4 md:grid-cols-[1fr_300px]">
          <div className="flex flex-col gap-4">
            <div>
              <h1 className="mb-4 text-2xl font-bold leading-none tracking-tight text-gray-900 dark:text-white">
                Carrinho novo
              </h1>
              <hr />
            </div>
            {products.map((item) => (
              <Card>
                <CardHeader>
                  <CardTitle>{item.name}</CardTitle>
                </CardHeader>
                <CardFooter>Preço: {item.price}</CardFooter>
              </Card>
            ))}
          </div>
          <div>
            <Card className="min-h-96">
              <CardHeader>
                <CardTitle>Valor total: R$ {total}</CardTitle>
                <Link to="/checkout">Checkout</Link>
              </CardHeader>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
