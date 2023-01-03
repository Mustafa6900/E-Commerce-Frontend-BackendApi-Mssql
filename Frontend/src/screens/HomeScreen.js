import React, { useState, useEffect } from 'react';
import Cookie from 'js-cookie';
function HomeScreen() {

  const [subProduct, setsubProducts] = useState([]);
  const [selectedProduct, setSelectedCategory] = useState([]);
  const [products, setProducts] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [rating, setRating] = useState('');
  const [comment, setComment] = useState('');
  const [quantity, setQuantity] = useState('');
  const [filterproducts, setFilterProducts] = useState([]);
  const [selectSize, setSelectSize] = useState('');
  const [selectColor, setSelectColor] = useState('');
  const [filterBarcode, setFilterBarcode] = useState('');
  const [filterName, setFilterName] = useState('');

  useEffect(() => {
    async function fetchData() {
      const response = await fetch('http://localhost:3000/products');
      const data = await response.json();
      setProducts(data[0]);
    }
    fetchData();}, []);
  function handleCategoryClick(id) {
      setSelectedCategory(id);
      async function fetchsubData() {
        const response = await fetch('http://localhost:3000/products/'+ id);
        const data = await response.json();
        setsubProducts(data[0]);
      }
      fetchsubData();
    setsubProducts([]);}
  function handleReviewClick(id) { setSelectedCategory(id);
          async function fetchreviewData() {
          const response = await fetch('http://localhost:3000/reviews/'+ id);
          const data = await response.json();
    setReviews(data[0]); }fetchreviewData();setReviews([]); }
  function handlePostReviewClick(id) { 
       setSelectedCategory(id);
       async function fetchpostreviewData() {
        const userInfo = JSON.parse(Cookie.get('userInfo'));
        try {
          const response = await fetch('http://localhost:3000/reviews/addreview/', {
            method: 'POST',
            body: JSON.stringify({
              product_id: id,
              user_id: userInfo[0][0].id,
              comment: comment,
              rating: rating
            }),
            headers: {
              'Content-Type': 'application/json'
            }
          });
          const data = await response.json();
          console.log(data);
        } catch (error) {
          console.error(error);
        }
      }
        fetchpostreviewData();
        setReviews([]);
  }
  function handleAddCartClick(id){
    console.log(id, "  id");
    async function fetchaddcartData() {
      const userInfo = JSON.parse(Cookie.get('userInfo'));
      try {
        const response = await fetch('http://localhost:3000/cart/addCart', {
          method: 'POST',
          body: JSON.stringify({
            product_id: id,
            user_id: userInfo[0][0].id,
            quantity: quantity,
          }),
          headers: {
            'Content-Type': 'application/json'
          }
        });
        const data = await response.json();
        console.log(data);
        if(response.ok)
        {
          alert("Added to Cart");
          window.location.reload();
        }

      } catch (error) {
        console.error(error);
      }
    }
      fetchaddcartData();
      setReviews([]);
  }
  function handleAddFavoritesClick(id){
    setSelectedCategory(id);
    async function fetchaddfavoritesData() {
      const userInfo = JSON.parse(Cookie.get('userInfo'));
      try {
        const response = await fetch('http://localhost:3000/favorites/addfavorites', {
          method: 'POST',
          body: JSON.stringify({
            product_id: id,
            user_id: userInfo[0][0].id,
          }),
          headers: {
            'Content-Type': 'application/json'
          }
        });
        const data = await response.json();
        console.log(data);
        if(response.ok)
        {
          alert("Added to Favorites");
          window.location.reload();
        }
      } catch (error) {
        console.error(error);
      }
    }
      fetchaddfavoritesData();
      setReviews([]);
  }

  async function filterCategoriesBarcode() {
    let barcodex = filterBarcode;
    let namex = filterName;
if (filterBarcode=== '') {
  barcodex = null;
  }
  if (filterName === '') {
    namex = null;
  }
    const response = await fetch('http://localhost:3000/filter/categoriesandbarcode', {
      method: 'POST',
      body: JSON.stringify({
        barcode: barcodex,
        name: namex,
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    const data = await response.json();
    setFilterProducts(data[0]);
  }

  async function filterSizeColor(){
    const response = await fetch('http://localhost:3000/filter/SizeColor', {
      method: 'POST',
      body: JSON.stringify({
        size: selectSize,
        color: selectColor}),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    const data = await response.json();
    setFilterProducts(data[0]);
  }

return (
<div >
  <div className="row">
    <div className="col-3">
      <div className="card">
        <div className="card-header">
          <h3 className='title'>Products</h3>
          <div className='filter-Categories-barcode-Size-Color'>
            <div className='filter-Categories-Barcode'>
            <input
              className='filter-input'
              type="text"
              placeholder="Barcode"
              value={filterBarcode}
              onChange={(e) => setFilterBarcode(e.target.value)}
            />
            <input
              className='filter-input'
              type="text"
              placeholder="Product Name"
              value={filterName}
              onChange={(e) => setFilterName(e.target.value)}
            />
            <button className="filter-button" onClick={filterCategoriesBarcode}>Filter</button>
            </div>
            <div className='filter-Size-Color'>
            <select
              className='filter-options'
              value={selectSize}
              onChange={(e) => setSelectSize(e.target.value)}
            >
              <option value="">Size</option>
              <option value="XS">XS</option>
              <option value="S">S</option>
              <option value="M">M</option>
              <option value="L">L</option>
              <option value="XL">XL</option>
            </select>
            <select
              className='filter-options'
              value={selectColor}
              onChange={(e) => setSelectColor(e.target.value)}
            >
              <option value="">Color</option>
              <option value="Black">Black</option>
              <option value="White">White</option>
              <option value="Red">Red</option>
              <option value="Blue">Blue</option>
              <option value="Green">Green</option>
            </select>
            <button className="filter-button" onClick={filterSizeColor}>Filter</button>
           </div>
          
          </div>
          <div className="filtered-Products">
            <ul className="list-group">
              {filterproducts.map((product) => (
                <li className = "icerik" key={product.id}>
                  <button
                   className="list-group-item"
                    onClick={() => handleReviewClick(product.id)}
             >
                    <img className="productss-image" src={product.image} alt="" />
                  </button>
                  <li className='icerik-detay'>
                {product.name}
                <br />
                <br />
                Size : {product.size}
                <br />
                <br />
                Color : {product.color}
                <br />
                <br />
                Fiyat : {product.price}
                 <br />
                 <br />
                    <input type="number" className="form-control" id="quantity" placeholder="Adet giriniz"onChange={(e) => setQuantity(e.target.value)}></input>
                    <br />
                <button className="btn btn-primary" onClick={() => handleAddCartClick(product.id)}>Sepete Ekle</button>
                <br />
                <button className="btn btn-primary" onClick={() => handleAddFavoritesClick(product.id)}>Favorilere Ekle</button>
                </li>
                </li>
    
              ))}
            </ul>
          </div>
        </div>
        <div className="card-body">
          <ul className="list-group">
              {products.map((product) => (
                <li className = "product_item"key= {product.id}>
                <button
                  type="button"
                  className="list-group-item"
                  onClick={() => { handleCategoryClick(product.id); handleReviewClick(product.id); } } >
                  <img className="productss-image"src={product.image} alt={product.id}  />
                </button>
               
                  
                  
                <br />
                {product.name}
                <br />
                Fiyat: {product.price} TL
                {product.id === selectedProduct && (
                  <div>      
                    {reviews.map((review) => (
                    <div>
                      <p>Yorum: {review.comment}</p>
                      <p>Puan: {review.rating}</p>
                    </div>
                  ))}
                  <br />
                    <label htmlFor="quantity">Adet giriniz:</label>
                    <br />
                    <br />
                    <input type="number" className="form-control" id="quantity" onChange={(e) => setQuantity(e.target.value)}></input>
                    <br />
                    <br />
                    <button
                      type="button"
                      className="btn btn-primary"
                      onClick={() => handleAddCartClick(product.id) } >
                      Sepete Ekle
                    </button>
                    <br />
                    <br />
                    <button
                      type="button"
                      className="btn btn-primary"
                      onClick={() => handleAddFavoritesClick(product.id) } >
                      Favorilere Ekle
                    </button>
                    <br />
                    <br />
                    
                
                    <div className="form-group">
                      <label htmlFor="comment">Yorum:</label>
                      <textarea className="form-control" rows="5" id="comment" onChange={(e) => setComment(e.target.value)}></textarea>
                    </div>
                    <br />
                    <label htmlFor="rating">Puan:</label>
                    <div className="form-group">
                     
                      <input type="number" className="form-control" id="rating" onChange={(e) => setRating(e.target.value)}></input>
                    </div>
                    <br />
                    <button
                      type="button"
                      className="btn btn-primary"
                      onClick={() => handlePostReviewClick(product.id) } >
                      Yorum Yap
                    </button>
                    </div>
                )}
              </li>
              
              ))}
          </ul>
        </div>    
      </div>
      </div>
      </div>

</div>
);
}
export default HomeScreen;
