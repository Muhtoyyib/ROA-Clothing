import { useContext } from "react";
import { ProductsContext } from "../../context/product";

const Shop = () => {
  const {products} = useContext(ProductsContext);

  return (
    <>
      {
        products.map(({id, name}) => {
          return (
            <div key={id}>
              <h1>{name}</h1>
            </div>
          )
        })
      }
    </>
  )
}

export default Shop;


