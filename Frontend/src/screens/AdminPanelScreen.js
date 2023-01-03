import React, { useState, useEffect } from 'react';

function AdminPanelScreen() {
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState('');
    const [discount, setDiscount] = useState('');
    const [returnedProducts, setReturnedProducts] = useState([]);
    const [products, setProducts] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState('');
    const [productDiscount, setProductDiscount] = useState('');
    const [reviews, setReviews] = useState([]);
    console.log(selectedProduct, " selected product");
    console.log(selectedProduct.id, " selected product id");
    console.log(productDiscount, " product discount");
    useEffect(() => {
        async function fetchData() {
            const response = await fetch('http://localhost:3000/guest');
            const data = await response.json();
            setUsers(data[0]);
            console.log(data[0], " users");
        }
        fetchData();
        async function fetchReturnedProducts() {
            const response = await fetch('http://localhost:3000/getreturneditems');
            const data = await response.json();
            setReturnedProducts(data[0]);
            console.log(data[0], " returned products");
        }
        fetchReturnedProducts();
        async function fetchProducts() {
            const response = await fetch('http://localhost:3000/products');
            const data = await response.json();
            setProducts(data[0]);
            console.log(data[0], " products");
        }
        fetchProducts();
        async function fetchreviewData() {
            const response = await fetch('http://localhost:3000/reviews');
            const data = await response.json();
            setReviews(data[0]);
            console.log(data[0], " reviews");
        }
        fetchreviewData();
    }, []);
    function updateUserDiscount(){
        async function fetchData() {
            try {
                await fetch('http://localhost:3000/guest/updatediscount', {
                method: 'PUT',
                body: JSON.stringify({
                  id: selectedUser,
                  discount: discount
                }),
                headers: {
                  'Content-Type': 'application/json'
                }
              });
              
            } catch (error) {
              console.error(error);
            }

    }
    fetchData();
}
    function updateDiscountProduct(){
        async function fetchData() {
            try {
                await fetch('http://localhost:3000/updatediscountproduct', {
                method: 'PUT',
                body: JSON.stringify({
                  id: selectedProduct.id,
                  productdiscount:productDiscount
                }),
                headers: {
                  'Content-Type': 'application/json'
                }
              });
              alert ("Discount Updated");
              window.location.reload();
              
            } catch (error) {
              console.error(error);
            }

    }
    fetchData();
}
    function deleteReview(id){
        async function fetchData() {
            try {
                await fetch('http://localhost:3000/deletereview', {
                method: 'DELETE',
                body: JSON.stringify({
                    id: id
                }),
                headers: {
                    'Content-Type': 'application/json'
                }
                });
                alert ("Review Deleted");
                window.location.reload();
            } catch (error) {
                console.error(error);
            }
        }
        fetchData();
    }

    return (
        <div>
            <h1>Admin Panel</h1>
            <select className="form-select" onChange={(e) => setSelectedUser(e.target.value)}>
                {users.map((user) => (
                    <option key={user.id} value={user.id}>{user.id} -- {user.name}</option>
                ))} 
            </select>
            <input className="form-input" type="text" onChange={(e) => setDiscount(e.target.value)}></input>
            <button onClick={updateUserDiscount}>Update Discount</button>
            <div>
                <h2>Users</h2>
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Discount</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user) => (
                            <tr key={user.id}>
                                <td>{user.id}</td>
                                <td>{user.name}</td>
                                <td>{user.discount}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div>
                <h2>Returned Products</h2>
                <table>
                    <thead>
                        <tr>
                            <th>Product ID</th>
                            <th>Total Returned</th>
                        </tr>
                    </thead>
                    <tbody>
                        {returnedProducts.map((products) => (
                            <tr key={products.product_id}>
                                <td>{products.product_id}</td>
                                <td>{products.total_returned}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div>
                <h2>Products</h2>
                <select className="form-select" onChange={(e) => setSelectedProduct(products[e.target.value])}>
                    {products.map((product, index) => (
                        <option key={product.id} value={index}>{product.id} -- {product.name}</option>
                    ))}
                </select>
                <input className="form-input" type="text" onChange={(e) => setProductDiscount(e.target.value)}></input>
                <button onClick={updateDiscountProduct}>Update Discount</button>
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Price</th>
                            <th>Discount</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map((product) => (
                            <tr key={product.id}>
                                <td>{product.id}</td>
                                <td>{product.name}</td>
                                <td>{product.price}</td>
                                <td>{product.discount}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div>
                <h2>Reviews</h2>
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Product ID</th>
                            <th>User ID</th>
                            <th>Rating</th>
                            <th>Comment</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {reviews.map((review) => (
                            <tr key={review.id}>
                                <td>{review.id}</td>
                                <td>{review.product_id}</td>
                                <td>{review.user_id}</td>
                                <td>{review.rating}</td>
                                <td>{review.comment}</td>
                                <td><button onClick={() => deleteReview(review.id)}>Delete</button></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
  


export default AdminPanelScreen;
    