import React,{ useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function MyOrderScreen() {

    const  orderId  = useParams();
    const [orderreturn , setOrderreturn] = useState([]);
    const [orders, setOrders] = useState([]);
    let isReturned = 0;
    console.log(orderId.id , " order id")
  useEffect(() => {
   
    async function fetchData() {
      const response = await fetch('http://localhost:3000/myorder/getorder', {
        method: 'POST',
        body: JSON.stringify({
          order_id: orderId.id
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      });
      const data = await response.json();
      setOrders(data[0]);
        console.log(data, " orders")

    }
    fetchData();
  }, []);
   

    async function returnedOrderUpdate(){
        const response = await fetch('http://localhost:3000/order/returned', {
            method: 'POST',
            body: JSON.stringify({
                order_id: orderId.id
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const data = await response.json();
        setOrderreturn(data[0]);
        console.log(data, " orders")
        
    }
    return (
        <div>
            <h1 className='title'>My Order Details </h1>
            <div className='cart-table'>
            <table>
                <tr>
                    <th>Sipariş Id</th>
                    <th></th>
                    <th>Adet</th>
                    <th>Fiyat</th>
                    <th>Sipariş Durumu </th>
                </tr>
                {orders.map(item => (
                    <tr key={item.order_id}>
                        <td>{item.order_id}</td>
                        <td><img className="cart-product-image" src={item.image} alt="" /></td>
                        <td>{item.quantity}</td>
                        <td>{item.price[0]} TL </td>
                        {item.is_returned === 1 ? <td>Ürün İade Edildi</td> : <td>Ürün Teslim Edildi</td>}
                    </tr>
                ))}
            </table>
            <br />
             <div className='cart-button'>
               Tutar: {orders.reduce((a, c) => a + c.price[0] * c.quantity, 0)} TL
             </div>
             <div className='cart-button'>
                   
                    <button onClick={() => returnedOrderUpdate()}>Siparişi İade Et</button>

             </div>
        </div>
        </div>
    );  
}

export default MyOrderScreen;