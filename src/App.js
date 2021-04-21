import React from 'react';
import {BrowserRouter, Switch, Route, Redirect} from 'react-router-dom';
import {connect} from 'react-redux'
/* Admin Components */
import AddProduct from './components/admin/AddProduct'
import AdminOrders from './components/admin/AdminOrders';

/* User Components */
import Header from './components/Header';
import Home from './components/Home';
import Footer from './components/Footer'
import Shop from './components/Shop';
import Product from './components/Product'
import Register from './components/Register';
import Login from './components/Login';
import Cart from './components/Cart';
import Checkout from './components/Checkout'
import Thankyou from './components/Thankyou'
import Orders from  './components/Orders'


function App({isAuthenticated}) {
  return (  
    <BrowserRouter>
      <Header />
      <Switch>
        <Route path="/" component={Home} exact />
        <Route path="/shop" component={Shop} />
        <Route path="/product/:id" component={Product} />
        <Route path="/register" component={Register} />
        <Route path="/login" component={Login} />
        {isAuthenticated ? (
          <>
            <Route path="/add-product" component={AddProduct} />
            <Route path="/admin-orders" component={AdminOrders} />
            <Route path="/cart" component={Cart} />
            <Route path="/checkout" component={Checkout} />
            <Route path="/thank-you" component={Thankyou} />
            <Route path="/orders" component={Orders} />
          </>
        ) : (
          <Redirect to="/login" />
        )}
      </Switch>
      <Footer />
    </BrowserRouter>
  );  
}

const mapStateToProps = state => ({
  isAuthenticated:state.reducer1.isAuthenticated
})

export default connect(mapStateToProps)(App);
