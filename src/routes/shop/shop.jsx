import { useContext } from "react";
import ProductCard from "../../components/product-card/product-card";
import { ProductsContext } from "../../context/product";
import './shop.scss';

const Shop = () => {
  const {products} = useContext(ProductsContext);

  return (
    <div className='products-container'>
      {
        products.map((product) => {
          return(
            <ProductCard key={product.id} product={product} />
          )
        })
    }
    </div>
  )
}

export default Shop;


