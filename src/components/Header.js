import React,{useState,useEffect} from 'react';
import { Link, useHistory } from 'react-router-dom';
import {connect} from 'react-redux';
import logo from '../assets/images/logo.png';
import {logoutUser, updateCart} from '../redux/action/actions'
import Axios from 'axios';

const Header = ({userDetails, cart, isAuthenticated, logoutUser, updateCart}) => {
    console.log(userDetails)
    const history = useHistory();
    
    const [subTotal, setSubTotal] = useState(0)

    const logoutHandler = (e) => {
        e.preventDefault();
        logoutUser();
        history.push("/");
    }

    function fetchCartItems() {
        var subtotal = 0;
        if(cart) {
            cart.map((product, index) => {
                subtotal += parseFloat(product.sale_price) * parseInt(product.qty)
            });
        }
        setSubTotal(subtotal);
    }

    const deleteCart = (e, product_id) => {
        e.preventDefault();
        var cart = userDetails.cart.filter((product) => {
            console.log("_id",product)
            return product._id !== product_id;
        })
        console.log(cart);

        Axios.post(process.env.REACT_APP_API_URL +'/user/updateCart', {"user_id": userDetails._id, cart} )
        .then((response) => {
            console.log('response =>', response.data)
            var user = userDetails;
            user.cart = cart;
            updateCart(user);
            fetchCartItems();
        })
    }




    useEffect(() => {
        fetchCartItems();
    },[userDetails]);

    return (
        <header className="header shop">
            <div className="topbar">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-4 col-md-12 col-12">
                            <div className="top-left">
                                <ul className="list-main">
                                    <li><i className="ti-headphone-alt"></i> +060 (800) 801-582</li>
                                    <li><i className="ti-email"></i> support@shophub.com</li>
                                </ul>
                            </div>
                        </div>
                        <div className="col-lg-8 col-md-12 col-12">
                            <div className="right-content">
                                <ul className="list-main">
                                    <li><i className="ti-location-pin"></i> Store location</li>
                                    <li><i className="ti-alarm-clock"></i> <Link to="/daily-deals">Daily deal</Link></li>
                                    <li><i className="ti-user"></i> <Link to="/my-account">My account</Link></li>
                                    {isAuthenticated ? (
                                        <li><i className="ti-power-off"></i><Link to="/logout" onClick={(e) => logoutHandler(e)}>Logout</Link></li>
                                    ) : (
                                        <li><i className="ti-power-off"></i><Link to="/login">Login</Link></li>
                                    )}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="middle-inner">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-2 col-md-2 col-12">
                            <div className="logo">
                                <Link to="/"><img src={logo} alt="logo" /></Link>
                            </div>
                            <div className="search-top">
                                <div className="top-search"><Link to="#0"><i className="ti-search"></i></Link></div>

                                <div className="search-top">
                                    <form className="search-form">
                                        <input type="text" placeholder="Search here..." name="search" />
                                        <button value="search" type="submit"><i className="ti-search"></i></button>
                                    </form>
                                </div>

                            </div>
                            <div className="mobile-nav"></div>
                        </div>
                        <div className="col-lg-8 col-md-7 col-12">
                            <div className="search-bar-top">
                                <div className="search-bar">
                                    <select>
                                        <option selected="selected">All Category</option>
                                        <option>watch</option>
                                        <option>mobile</option>
                                        <option>kid’s item</option>
                                    </select>
                                    <form>
                                        <input name="search" placeholder="Search Products Here....." type="search" />
                                        <button className="btnn"><i className="ti-search"></i></button>
                                    </form>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-2 col-md-3 col-12">
                            <div className="right-bar">

                                <div className="sinlge-bar">
                                    <Link to="/orders" className="single-icon" title="Orders"><i className="fa fa-shopping-bag" aria-hidden="true"></i></Link>
                                </div>
                                <div className="sinlge-bar">
                                    <Link to="#" className="single-icon" title={userDetails && userDetails.name}><i className="fa fa-user-circle-o" aria-hidden="true"></i></Link>
                                </div>
                                <div className="sinlge-bar shopping">









                                    <Link to="#" className="single-icon"><i className="ti-bag"></i> <span className="total-count">{userDetails ? userDetails.cart.length : '0' }</span></Link>
    
                                    <div className="shopping-item">
                                        <div className="dropdown-cart-header">
                                            <span>{userDetails ? userDetails.cart.length : '0' } Items</span>
                                            <Link to="/cart">View Cart</Link>
                                        </div>
                                        {cart && 
                                            <ul className="shopping-list">
                                                {cart.reverse().map((product,index) => (
                                                    <li>
                                                        <Link to="#" onClick={(e) => deleteCart(e, product._id)} className="remove" title="Remove this item"><i className="fa fa-remove"></i></Link>
                                                        <Link className="cart-img" to="#"><img src={`${process.env.REACT_APP_API_URL}/product/image/${product.image[0]}`} alt={product._id} /></Link>
                                                        <h4><Link to={'/product' + product._id}>{product.name}</Link></h4>
                                                        <p className="quantity">{product.qty}x - <span className="amount">${product.sale_price}</span></p>
                                                    </li>
                                                ))}
                                            </ul>
                                        }
                                        <div className="bottom">
                                            <div className="total">
                                                <span>Total</span>
                                                <span className="total-amount">${subTotal}</span>
                                            </div>
                                            <Link to="/checkout" className="btn animate">Checkout</Link>
                                        </div>
                                    </div>
    
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="header-inner">
                <div className="container">
                    <div className="cat-nav-head">
                        <div className="row">
                            <div className="col-lg-9 col-12">
                                <div className="menu-area">
                                    <nav className="navbar navbar-expand-lg">
                                        <div className="navbar-collapse">	
                                            <div className="nav-inner">	
                                                <ul className="nav main-menu menu navbar-nav">
                                                    <li className="active"><Link to="/">Home</Link></li>
                                                    <li><Link to="#">Admin</Link>
                                                        <ul className="dropdown">   
                                                            <li><Link to="/add-product">Add Product</Link></li>
                                                            <li><Link to="/admin-orders">Orders</Link></li>
                                                        </ul>
                                                    </li>												
                                                    <li><Link to="#">Service</Link></li>
                                                    <li><Link to="/shop" >Shop<i className="ti-angle-down"></i><span className="new">New</span></Link>
                                                        <ul className="dropdown">
                                                            <li><Link to="shop-grid.html">Shop Grid</Link></li>
                                                            <li><Link to="/cart">Cart</Link></li>
                                                            <li><Link to="/checkout">Checkout</Link></li>
                                                        </ul>
                                                    </li>
                                                    <li><Link to="#">Pages</Link></li>									
                                                    <li><Link to="#">Blog<i className="ti-angle-down"></i></Link>
                                                        <ul className="dropdown">
                                                            <li><Link to="blog-single-sidebar.html">Blog Single Sidebar</Link></li>
                                                        </ul>
                                                    </li>
                                                    <li><Link to="contact.html">Contact Us</Link></li>
                                                </ul>
                                            </div>
                                        </div>
                                    </nav>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    )
}

const mapStateToProps = state => ({
    userDetails : state.reducer1.userDetails,
    isAuthenticated : state.reducer1.isAuthenticated,
    cart : state.reducer1.cart,
})

const mapDispatchToProps = {
    updateCart:(userDetails) => updateCart(userDetails),
    logoutUser:() => logoutUser(),
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);