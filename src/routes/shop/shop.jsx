import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useEffect } from "react";

import { selectCategoriesMap} from "../../store/categories/categories-selector";
import { fetchCategoriesAsync } from "../../store/categories/categories-action";

import ProductCard from "../../components/product-card/product-card";
// import Spinner from "../../components/spinner/spinner.componet";

import './shop.scss';

const Shop = () => {
  const dispatch  = useDispatch();
  useEffect(() => {
  dispatch(fetchCategoriesAsync())
  }, [])
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const categoriesMap = useSelector( selectCategoriesMap );
  console.log(categoriesMap);
  // const isLoading = useSelector( selectCategoriesIsLoading );
  const currentPath = window.location.pathname;

  // isLoading: <Spinner />:

  return (
   <>
    { Object.keys(categoriesMap).map( ( title ) => {
        return(
          <>
          <h2 className="category-name" key={title}>
          <Link to={ currentPath === '/shop' ? `${title}`: `shop/${title}` } key={title}> 
            { title.toUpperCase() }
          </Link>
          </h2>

          <div className='products-container' key={title}>
            {categoriesMap[title].slice(0,4).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
        </div>
          </>
        )
      })
    }
   </>
  )
}

export default Shop;


