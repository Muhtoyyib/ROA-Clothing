import { useContext, useEffect, useState } from "react";
import { useLoaderData} from 'react-router-dom';

import ProductCard from "../../components/product-card/product-card";
import { CategoriesContext } from "../../context/categories-map";
import '../shop/shop.scss';
import './category-shop.scss'

// eslint-disable-next-line react-refresh/only-export-components
export function loader({ params }){
    const categoryName = params.categoryName;
    console.log(categoryName);

    return { categoryName };
}

export default function CategoryShop (){
    const { categoryName } = useLoaderData();
    const { categoriesMap } = useContext( CategoriesContext);
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