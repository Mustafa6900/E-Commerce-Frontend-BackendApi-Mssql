import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { logout, update } from '../actions/userActions';
import { listMyOrders } from '../actions/orderActions';
import { useDispatch, useSelector } from 'react-redux';

function ProfileScreen(props) {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [street, setStreet] = useState('');
  const [zipcode, setZipcode] = useState('');
  const [wallet_name, setWallet_name] = useState('');
  const [wallet_number, setWallet_number] = useState('');
  const dispatch = useDispatch();
  const userSignin = useSelector(state => state.userSignin);
  const { userInfo } = userSignin;
  const userUpdate = useSelector(state => state.userUpdate);
  const { loading, success, error } = userUpdate;
  const myOrderList = useSelector(state => state.myOrderList);
  const { loading: loadingOrders, orders, error: errorOrders } = myOrderList;
  const [pointanddiscount, setPointanddiscount] = useState('');
  const [updateDiscount, setUpdateDiscount] = useState('');
  
  const handleLogout = () => {
    dispatch(logout());
    props.history.push("/signin");
  }
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(update({ id: userInfo[0][0].id, email, name, password }))
  }
  useEffect(() => {
    
    async function fetchData() {
    const response = await fetch('http://localhost:3000/guest/getuser/'+ userInfo[0][0].id);
        const data = await response.json();
        setPointanddiscount(data[0][0]);
        
    }
    fetchData();


console.log(pointanddiscount.point, " point")

    if (userInfo) {
      setEmail(userInfo[0][0].email);
      setName(userInfo[0][0].name);
      setPassword(userInfo[0][0].password);
    
    }
    
    dispatch(listMyOrders());
    return () => {

    };
  } , [userInfo])

  function addAddresses(){
    async function fetchData() {
      try {
        const response = await fetch('http://localhost:3000/addresses/addAddresses', {
          method: 'POST',
          body: JSON.stringify({
            user_id: userInfo[0][0].id,
            address: address,
            city: city,
            street: street,
            zipcode: zipcode,
          }),
          headers: {
            'Content-Type': 'application/json'
          }
        });
        const data = await response.json();
        console.log(data, "data");
  } catch (error) {
    console.log(error, "error");
  }
}
fetchData();
  }

  function addWallets(){
    async function fetchData() {
      try {
        const response = await fetch('http://localhost:3000/wallets/addwallets', {
          method: 'POST',
          body: JSON.stringify({
            user_id: userInfo[0][0].id,
            card_name: wallet_name,
            card_number: wallet_number
          }),
          headers: {
            'Content-Type': 'application/json'
          }
        });
        const data = await response.json();
        console.log(data, "data");
  } catch (error) {
    console.log(error, "error");
  }} fetchData(); }

  function deleteGuest(){
    async function fetchData() {
      try {
        const response = await fetch('http://localhost:3000/guest/guestdelete', {
          method: 'DELETE',
          body: JSON.stringify({
            id: userInfo[0][0].id
          }),
          headers: {
            'Content-Type': 'application/json'
          }
        });
        const data = await response.json();
        console.log(data, "data");
  } catch (error) {
    console.log(error, "error");
  }} fetchData(); }
  

  return <div className="profile">
    <div className="cart-tablex">
    <div className="profile ">
      
        <form onSubmit={submitHandler} >
          <ul className="form-container">
            <li>
              <h2 className='title'>User Profile</h2>
            </li>
            <li>
              {loading && <div>Loading...</div>}
              {error && <div>{error}</div>}
              {success && <div>Profile Saved Successfully.</div>}
            </li>
            <li>
              <label htmlFor="name">
                Name
          </label>
              <input value={name} type="name" name="name" id="name" onChange={(e) => setName(e.target.value)}>
              </input>
            </li>
            <li>
              <label htmlFor="email">
                Email
          </label>
              <input value={email} type="email" name="email" id="email" onChange={(e) => setEmail(e.target.value)}>
              </input>
            </li>
            <li>
              <label htmlFor="password">Password</label>
              <input value={password} type="password" id="password" name="password" onChange={(e) => setPassword(e.target.value)}>
              </input>
            </li>

            <li>
              <button type="submit" className="button primary" >Update </button>
               
            </li>
            <li>
              <button type="button" onClick={handleLogout} className="button secondary full-width">Logout</button>
              
            </li>
            <li>
              <button type="button" onClick={deleteGuest} className="button secondary full-width">Delete Account</button>
            </li>

          </ul>
        </form>
    </div>
    <div className="add-addresses">
      
        <form onSubmit={addAddresses} >
          <ul className="form-container">
            <li>
              <h2>Add Addresses</h2>
            </li>
            <li>
              <label htmlFor="address">
                Address
          </label>
              <input value={address} type="address" name="address" id="address" onChange={(e) => setAddress(e.target.value)}>
              </input>
            </li>
            <li>
              <label htmlFor="city">
                City
          </label>
              <input value={city} type="city" name="city" id="city" onChange={(e) => setCity(e.target.value)}>
              </input>
            </li>
            <li>
              <label htmlFor="street">Street</label>
              <input value={street} type="street" id="street" name="street" onChange={(e) => setStreet(e.target.value)}>
              </input>
            </li>
            <li>
              <label htmlFor="zipcode">Zipcode</label>
              <input value={zipcode} type="zipcode" id="zipcode" name="zipcode" onChange={(e) => setZipcode(e.target.value)}>
              </input>
            </li>
            <li>
              <button type="submit" className="button primary">Add address</button>
            </li>
          </ul>
        </form>
      
    </div>
    <div className="add-wallets">
      <div className="form">
        <form onSubmit={addWallets} >
          <ul className="form-container">
            <li>
              <h2>Add Wallets</h2>
            </li>
            <li>
              <label htmlFor="wallet_name">
                Wallet Name
          </label>
              <input value={wallet_name} type="wallet_name" name="wallet_name" id="wallet_name" onChange={(e) => setWallet_name(e.target.value)}>
              </input>
            </li>
            <li>
              <label htmlFor="wallet_number">
                Wallet Number
          </label>
              <input value={wallet_number} type="wallet_number" name="wallet_number" id="wallet_number" onChange={(e) => setWallet_number(e.target.value)}>
              </input>
            </li>
            <li>
              <button type="submit" className="button primary">Add wallet</button>
            </li>
          </ul>
        </form>
        </div>
    </div>
     <div className="myAddresses-myDiscountPoint">
      <div className="form">
        <form >
          <ul className="form-container">
            <li>
              <h2>My Addresses & Wallets</h2>
            </li>
            <li>
            <Link to="/myaddresseswallets" className="button primary">Show my addresses & wallets</Link>
            </li>
          </ul>
          <div className="pointanddiscount">
      <div className="form">
        <form >
          <ul className="form-container">
            <li>
              <h2>My Points & Discounts</h2>
            </li>
            <li>
                  <h2>Point: {pointanddiscount.point}</h2>
                  <h2>Discount: % {pointanddiscount.discount}</h2>
            </li>
          </ul>
        </form>
      </div>
    </div>
        </form>
        
        </div>
    </div>
    </div>
    <div className="cart-table">
    <div className="profile-orders content-margined">
      {
        loadingOrders ? <div>Loading...</div> :
          errorOrders ? <div>{errorOrders} </div> :
          <div className="cart-table">
            <table className="table">
              <thead>
                <tr>
                  <th>Sipariş Id</th>
                  <th>Adres Adi</th>
                  <th>Tutar</th>
                  <th>Sipariş Tarihi</th>
                   <th>Cüzdan İsmi</th>
                   <th>Sipariş Durumu</th>
                   <th>Sipariş Detaylari</th>
                   
                </tr>
              </thead>
              <tbody>
                {orders.map(order => <tr key={order._id}>
                  
                  <td>{order.id[0]}</td>
                  <td>{order.address}</td>
                  <td>{order.total_price} TL </td>
                  <td>{order.order_date}</td>
                  <td>{order.wallet_name}</td>
                  <td>{order.status}</td>
                  <td>
                  {console.log(order.id[0], "orders")}
                  <Link to={`/myorder/${order.id[0]}`}>View Order Detail</Link>
                  </td>
                </tr>)}
              </tbody>
            </table>
            </div>
      }
    </div>
    </div>
  </div>
  
}

export default ProfileScreen;