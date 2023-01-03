import React, { useState, useEffect } from 'react';
import Cookie from 'js-cookie';
function CartScreen() {

const [cart, setCart] = useState([]);
const [quantity, setQuantity] = useState('');
const [address, setAddress] = useState([]);
const [wallets, setWallets] = useState([]);
const [selectedAddress, setSelectedAddress] = useState('');
const [selectedWallet, setSelectedWallet] = useState('');
const [order_id, setOrder_id] = useState('');
const [discount, setDiscount] = useState('');
const [isTrue, setIsTrue] = useState(false);
console.log(cart, " cart")
console.log(order_id , " order id")
useEffect(() => {

  async function fetchxData() {
    const userInfo = JSON.parse(Cookie.get('userInfo'));
    const response = await fetch('http://localhost:3000/guest/getuser/'+ userInfo[0][0].id);
        const data = await response.json();
        setDiscount(data[0][0].discount);
    }
    fetchxData();
  async function fetchcartData() {
    const userInfo = JSON.parse(Cookie.get('userInfo'));
    console.log(userInfo[0][0].id, "  user id");
    const response = await fetch("http://localhost:3000/cart", {
      method: 'POST',
      body: JSON.stringify({ 
        user_id: userInfo[0][0].id
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    const data = await response.json();
    setCart(data[0]);
  }
  fetchcartData();
  async function fetchData() {
    const userInfo = JSON.parse(Cookie.get('userInfo'));
    const response = await fetch('http://localhost:3000/myAddresses',{
        method: 'POST',
        body: JSON.stringify({
            user_id: userInfo[0][0].id
        }),
        headers: {
            'Content-Type': 'application/json'
            
    }
    });
    const data = await response.json();
    setAddress(data[0]);
    console.log(data[0], " addreses")
    const response2 = await fetch('http://localhost:3000/myWallets',{
        method: 'POST',
        body: JSON.stringify({
            user_id: userInfo[0][0].id
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    });
    const data2 = await response2.json();
    setWallets(data2[0]);
    console.log(data2[0], " wallets")
}
fetchData();
}, []);
function updateDiscount() {
  const userInfo = JSON.parse(Cookie.get('userInfo'));
  async function fetchData() {
  try {
    const response = await fetch('http://localhost:3000/guest/updatediscount', {
      method: 'PUT',
      body: JSON.stringify({
        id: userInfo[0][0].id,
        discount: 0
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
fetchData();
}

function deleteCartItem(id){
  async function fetchdeletecartData() {
    const userInfo = JSON.parse(Cookie.get('userInfo'));
    try {
      const response = await fetch('http://localhost:3000/cart/deleteCart', {
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
  fetchdeletecartData();
  setCart([]);
  window.location.reload();

}

function updateCartItem(id,quantity){
  async function fetchupdatecartData() {
    const userInfo = JSON.parse(Cookie.get('userInfo'));
    try {
      const response = await fetch('http://localhost:3000/cart/updateCart', {
        method: 'PUT',
        body: JSON.stringify({
          product_id: id,
          user_id: userInfo[0][0].id,
          quantity: quantity
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      });
      if (response.ok) {
          // İstek başarılı olduğunda bir başarı mesajı gösterin
          alert('Ürün başarıyla güncellendi!');
        } else {
          // İstek başarısız olduğunda bir hata mesajı gösterin
          alert('Ürün güncellenirken hata oluştu!');
        }
    } catch (error) {
      console.error(error);
    }
  }
  fetchupdatecartData();
  setQuantity([]);
  window.location.reload();

}
console.log(selectedAddress, " selected address")
  async function buyProduct() {
    let date = new Date();
    let dateString = date.toISOString().substring(0, 10);
    const userInfo = JSON.parse(Cookie.get('userInfo'));
    if(isTrue){
      updateDiscount();
    }
      const orderresponse = await fetch('http://localhost:3000/order/buyproduct', {
        method: 'POST',
        body: JSON.stringify({
          user_id: userInfo[0][0].id,
          address_id: selectedAddress,
          wallet_name: selectedWallet,
          total_price: endtotalprice,
          order_date: dateString,
          status: "Siparis Verildi",
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      });
      const data = await orderresponse.json();
      const orderId = data[0][0].id;     
      for(let i = 0 ; i < cart.length ; i++){
        const product = cart[i];   
         console.log(product," product dataitem")
         console.log(product.product_id, " product id dataitem")
        const response = await fetch('http://localhost:3000/order/addorderitem', {
          method: 'POST',
          body: JSON.stringify({
            order_id : orderId,
            product_id: product.product_id,
            quantity: product.quantity,
            price: product.price,
            is_returned: 0
          }),
          headers: {
            'Content-Type': 'application/json'
          }
        });
        if (response.ok) {
          // İstek başarılı olduğunda bir başarı mesajı gösterin
          alert('Ürün başarıyla satın alındı!');
          window.location.reload();
        }
        else {
          // İstek başarısız olduğunda bir hata mesajı gösterin
          alert('Ürün satın alınırken hata oluştu!');
      }}
      function deletecartresponse() { 
        fetch('http://localhost:3000/cart/deletemyCart', {
         method: 'DELETE',
         body: JSON.stringify({
           user_id: userInfo[0][0].id,
         }),
         headers: {
           'Content-Type': 'application/json'
         }
       });
     }
    deletecartresponse();
    setCart([]);
  }
  
var totalPrice=0;
cart.forEach(item => {
  totalPrice += item.quantity * item.price;
});

var discounttotalPrice=0;
discounttotalPrice = totalPrice - (totalPrice * 1*discount/100);

var endtotalprice=0;
if(isTrue){
  endtotalprice = discounttotalPrice;
}
else{
  endtotalprice = totalPrice;
}
return (
<div className="profile">

<div className="cart-table">
<h1 className='title'>Sepet</h1>
<table>
<thead>
<tr >
<th>Urun</th>
<th>Adet</th>
<th>Toplam Fiyat</th>
</tr>
</thead>
<tbody>
{cart.map(item => (

<tr key={item.user_id}>

<td><img className="cart-product-image" src={item.image} alt="" /></td>
<td>{item.quantity}</td>
<td>{item.quantity*item.price} TL</td>

{
  <li className="cart-button">
  <button onClick={() => deleteCartItem(item.product_id)}>Sil</button>
  </li>
}
{
  <li className="cart-button" >
    
    <input type="text" name="quantity" onChange={(e) => setQuantity(e.target.value)} />
    <br />
    <button className="cart-buttonx" onClick={() => updateCartItem(item.product_id,quantity)}>
      Güncelle
      </button>
   </li>
}
</tr>
))}
</tbody>
</table>
</div>
<div className="cart-table">
<h3 className='title'>Satin Al</h3>
<div className='cart-adresswalletbutton'>
<select onChange={(e) => setSelectedAddress(e.target.value)}>
  <option value="0">Adres Seçiniz</option>
  {address.map(item => (
    <option value={item.id}>{item.address}</option>
  ))}
</select>
<select className='cart-adresswalletbutton' onChange={(e) => setSelectedWallet(e.target.value)}>
  <option value="0">Cüzdan Seçiniz</option>
  {wallets.map(item => (
    <option value={item.card_name}>{item.card_name}</option>
  ))}
</select>
</div>
<br />
<button className="cart-button"onClick={buyProduct}>Satın Al</button>

<h2 className="title">Toplam Tutar: {totalPrice} TL</h2>
</div>

<div className="cart-table">
<div className="titlex">
      {isTrue ? ' İndirim uygulanacak ! ' : '  İndirim uygulanmayacak !  '}
      <button className="cart-button"onClick={() => setIsTrue(!isTrue)}> İndirim uygula </button>
    </div>
<h3 className="title">İndirim Oranı: {discount}%</h3>
<h3 className="title">İndirimli Tutar: {discounttotalPrice} TL</h3>
</div>
</div>
);
}

export default CartScreen;  