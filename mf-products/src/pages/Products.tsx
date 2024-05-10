/* eslint-disable @typescript-eslint/no-explicit-any */
import Menu from "@/components/shared/Menu";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useCartStore } from "cart/stores/cartStore";

const products: any[] = [
  {
    id: 1,
    name: "teste 1",
    price: 10
  },
  {
    id: 2,
    name: "teste 2",
    price: 20
  },
  {
    id: 3,
    name: "teste 3",
    price: 30
  },
];

function App() {
  const { addCart } = useCartStore();

  return (
    <>
      <Menu />
      <div className="py-5">
        <div className="container grid grid-cols-3 gap-4">
          {products.map((item) => (
            <Card key={item.id}>
              <CardHeader>
                <CardTitle>{item.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>Ola mundo</CardDescription>
              </CardContent>
              <CardFooter className="gap-2">
                <Button className="w-full" onClick={() => addCart(item)}>
                  add cart
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </>
  );
}

export default App;
