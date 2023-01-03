import React, { useEffect, useState } from 'react';
import { BrowserRouter, Route, Link } from 'react-router-dom';
import './App.css';
import HomeScreen from './screens/HomeScreen';
import CartScreen from './screens/CartScreen';
import SigninScreen from './screens/SigninScreen';
import { useSelector } from 'react-redux';
import RegisterScreen from './screens/RegisterScreen';
import MyOrderScreen from './screens/MyOrderScreen';
import ProfileScreen from './screens/ProfileScreen';
import FavoritesScreen from './screens/FavoritesScreen';
import Myaddresseswallets from './screens/Myaddresseswallets';
import BrachesScreen from './screens/BrachesScreen';
import AdminPanelScreen from './screens/AdminPanelScreen';

function App() {
  
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [subSubCategory, setSubSubCategory] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  useEffect(() => {
    async function fetchData() {
      const response = await fetch('http://localhost:3000/categories/maincategories');
      const data = await response.json();
      setCategories(data[0]);
    }
fetchData();

  }, []);
  function handleCategoryClick(id) {
    setSelectedCategory(id);
    async function fetchsubData() {
      const response = await fetch('http://localhost:3000/categories/subcategories/'+ id);
      const data = await response.json();
      setSubCategories(data[0]);
    }
    fetchsubData();
  }
  function handleSubCategoryClick(id) {
    async function fetchSubSubData() {
      const response = await fetch('http://localhost:3000/categories/subcategories/' + id);
      const data = await response.json();
      setSubSubCategory(data[0]);
    }
    fetchSubSubData();
  }

  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const openMenu = () => {
    document.querySelector('.sidebar').classList.add('open');
  };
  const closeMenu = () => {
    document.querySelector('.sidebar').classList.remove('open');
  };
  
  return (
    <BrowserRouter>
      <div className="grid-container">
        <header className="header">
          <div className="brand">
            <button onClick={openMenu}>&#9776;</button>
            <Link to="/">KTU ONLINE BAZAAR </Link>
                      </div>
          <div className="header-links">
              <a href="branches">Branches</a>
          <a href="myaddresseswallets">My Addresses & Wallets</a>
              <a href="cart">Cart</a>
              <a href="favorites">Favorites</a> 
            {console.log(userInfo)}        
            {userInfo ? (
              <Link to="/profile">{userInfo[0][0].name}</Link>
            ) : (
              <Link to="/signin">Sign In</Link>
            )}
            {userInfo && userInfo[0][0].email==="admin@admin.com" && (
              <div className="dropdown">
                <a href="#">Admin</a>
                <ul className="dropdown-content">
                  <li>
                    <Link to="/adminpanel">AdminPanel</Link>
                  </li>
                </ul>
              </div>
            )}
          </div>
          
        </header>
        <aside className="sidebar">
          <h3>Shopping Categories</h3>
          <button className="sidebar-close-button" onClick={closeMenu}>
            x
          </button>
          <tbody>
          <ul className="categories">
          {categories.map(category => (
    <li key={category.id}>
      <button onClick={() => handleCategoryClick(category.id)}>
        {category.name}
      </button>
      {/* Sadece seçilen kategorinin alt kategorilerini gösterin */}
      {category.id === selectedCategory && (
        <ul className="sub-categories">
          {subCategories.map(subCategory => (
  <li key={subCategory.id}>
    <button onClick={() => handleSubCategoryClick(subCategory.id)}>
      {subCategory.name}
    </button>
    {/* Sadece seçilen alt kategorinin alt alt kategorilerini gösterin */}
    {subCategory.id === 39  && (
      <ul className="sub-sub-categories">
        {subSubCategory.map(subSubCategory => (
          <li key={subSubCategory.id}>
            {subSubCategory.name}
          </li>
        ))}
      </ul>
    )}
    {subCategory.id === 40  && (
      <ul className="sub-sub-categories">
        {subSubCategory.map(subSubCategory => (
          <li key={subSubCategory.id}>
            {subSubCategory.name}
          </li>
        ))}
      </ul>
    )}
    
  </li>
))}
        

</ul>
      )}
    </li>
  ))}
</ul>
        </tbody>

        </aside>
        <main className="main">
          <div className="content">
          <Route path="/adminpanel" component={AdminPanelScreen} />
          <Route path="/branches" component={BrachesScreen} />
          <Route path="/myaddresseswallets" component={Myaddresseswallets} />
            <Route path="/profile" component={ProfileScreen} />
            <Route path="/myorder/:id" component={MyOrderScreen} />
            <Route path="/signin" component={SigninScreen} />
            <Route path="/register" component={RegisterScreen} />
            <Route path="/favorites" component={FavoritesScreen} />
            <Route path="/cart" component={CartScreen} />
            <Route path="/category/:id" component={HomeScreen} />
            <Route path="/" exact={true} component={HomeScreen} />
          </div>
        </main>
        <footer className="footer">All right reserved.</footer>
      </div>
    </BrowserRouter>
  );
}

export default App;
