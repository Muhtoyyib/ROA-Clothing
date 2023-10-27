import { useEffect, useState } from "react";
import { useLoaderData} from 'react-router-dom';
import { useSelector } from "react-redux";

import { selectCategoriesMap} from "../../store/categories/categories-selector";

import ProductCard from "../../components/product-card/product-card";
import '../shop/shop.scss';
import './category-shop.scss'

// eslint-disable-next-line react-refresh/only-export-components
export function loader({ params }){
    const categoryName = params.categoryName;

    return { categoryName };
}

export default function CategoryShop (){
    const { categoryName } = useLoaderData();
    const categoriesMap  = useSelector(selectCategoriesMap);
    // const isLoading = useSelector(selectCategoriesIsLoading);
    const [products, setProducts] = useState(categoriesMap[categoryName]);

    useEffect(() => {
        setProducts(categoriesMap[categoryName])
    }, [categoriesMap, categoryName])

    return(
        <>
            <h1 key={ categoryName } className="category-shop-header"> { categoryName.toUpperCase() }</h1>
            <div className='products-container'>
            {products && products.map((product) => (
                <ProductCard key={product.id} product={product} />
            ))}
            </div>
       </>
    )
}