import { useContext } from "react";

import ProductCard from "../../components/product-card/product-card";
import { CategoriesContext } from "../../context/categories-map";
import './shop.scss';
import { Link } from "react-router-dom";

const Shop = () => {
  const { categoriesMap } = useContext( CategoriesContext);
  const currentPath = window.location.pathname;

  return (
   <>
    {
      Object.keys(categoriesMap).map( title => (
        <>
        <h2 className="category-name" key={title}>
          <Link to={ currentPath === '/shop' ? `${title}`: `shop/${title}` } key={title}> 
            { title.toUpperCase() }
          </Link>
        </h2>

        <div className='products-container'>
          {categoriesMap[title].slice(0,4).map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
       </>
      ))
    }
   </>
  )
}

export default Shop;


