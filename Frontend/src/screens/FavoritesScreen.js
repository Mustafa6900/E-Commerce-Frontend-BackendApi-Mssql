import React, { useState, useEffect } from 'react';
import Cookie from 'js-cookie';
function CartScreen() {

const [favorites, setFavorites] = useState([]);

useEffect(() => {

  async function fetchcartData() {
    const userInfo = JSON.parse(Cookie.get('userInfo'));
    console.log(userInfo[0][0].id, "  user id");
    const response = await fetch("http://localhost:3000/favorites", {
      method: 'POST',
      body: JSON.stringify({ 
        user_id: userInfo[0][0].id,
        
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    const data = await response.json();
    setFavorites(data[0]);
  }
  fetchcartData();
}, []);
function deleteFavoritesItem(id){
    async function fetchdeletefavoritesData() {
      const userInfo = JSON.parse(Cookie.get('userInfo'));
      try {
        const response = await fetch('http://localhost:3000/favorites/deletefavorites', {
          method: 'DELETE',
          body: JSON.stringify({
            product_id: id,
            user_id: userInfo[0][0].id,
          }),
          headers: {
            'Content-Type': 'application/json'
          }
        });
        if (response.ok) {
            // İstek başarılı olduğunda bir başarı mesajı gösterin
            alert('Ürün başarıyla silindi!');
          } else {
            // İstek başarısız olduğunda bir hata mesajı gösterin
            alert('Ürün silinirken hata oluştu!');
          }

      } catch (error) {
        console.error(error);
      }
    }
    fetchdeletefavoritesData();
    setFavorites([]);
    window.location.reload();

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
            quantity: 1,
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
      fetchaddcartData();
  }

return (
<div>
<h1 className='title'>Favoriler</h1>
<table>
<thead>
<tr>

<th>Favori Ürünler</th>
</tr>
</thead>
<div  className="cart-table">
<tbody>
{favorites.map(item => (
<tr key={item.user_id}>

<td><img className="cart-product-image"src={item.image} alt={item.product_id} /></td>
<td><button onClick={() => deleteFavoritesItem(item.product_id)}>Sil</button></td>
<td><button onClick={() => handleAddCartClick(item.product_id)}>Sepete Ekle</button></td>
    

</tr>
))}
</tbody>
</div>
</table>
</div>
);
}

export default CartScreen;