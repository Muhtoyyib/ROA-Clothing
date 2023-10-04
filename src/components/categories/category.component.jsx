import { useNavigate } from 'react-router-dom'
// import { Link } from 'react-router-dom'
import './category.styles.scss'

const Category = () => {

    const directories = [
        {
          "id": 1,
          "title": "hats",
          "imageUrl": "https://i.ibb.co/cvpntL1/hats.png"
        },
        {
          "id": 2,
          "title": "jackets",
          "imageUrl": "https://i.ibb.co/px2tCc3/jackets.png"
        },
        {
          "id": 3,
          "title": "sneakers",
          "imageUrl": "https://i.ibb.co/0jqHpnp/sneakers.png"
        },
        {
          "id": 4,
          "title": "womens",
          "imageUrl": "https://i.ibb.co/GCCdy8t/womens.png"
        },
        {
          "id": 5,
          "title": "mens",
          "imageUrl": "https://i.ibb.co/R70vBrQ/men.png"
        }
    ]

    const navigate = useNavigate();

  return (
     <>
      {directories.map(({title, id, imageUrl})=>(
        <div className='category-container' key={id}>
        
        <div className='category-background' style={{backgroundImage: `url(${imageUrl})` }} /> 
        <div onClick={() => navigate(`shop/${title}`)} className='category-body'>
            <h2>{title}</h2>
            <p>   Shop now
            </p>
        </div>

        </div>
            
        ))}
    </>
  )
}

export default Category;
