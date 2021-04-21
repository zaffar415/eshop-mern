import React,{useState,useEffect} from 'react';
import {Link} from 'react-router-dom'
import {connect} from 'react-redux';
import Axios from 'axios';
import {updateCart} from '../redux/action/actions'


const Cart = ({userDetails, updateCart}) => {

    const [cartItems, setCartItems] = useState([])
    const [subTotal, setSubTotal] = useState(0.0)
    var subtotal = 0;
    var user = userDetails;
    
    const fetchCartItems = () => {
        // setCartItems([]);
        //setSubTotal(0.0);
        // user = userDetails;
        // user.cart.map((value, index) => {
        //     Axios.get(process.env.REACT_APP_API_URL + '/product/' + value._id )
        //     .then((response) => {
        //         console.log(response.data)
        //         setCartItems(cartItems => [...cartItems, response.data]); 
        //         subtotal += parseFloat(response.data.sale_price * parseInt(response.data.qty))
        //         console.log(subtotal);
        //         setSubTotal(subtotal);
        //     })
        // })
        console.log('fetct');
        setSubTotal(0);
        userDetails.cart.map((product, index) => {
            subtotal += parseFloat(product.sale_price) * parseInt(product.qty)
            console.log(subtotal)
            setSubTotal(subtotal)
        })

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

    const productQty = (product, index, quantity) => {
       console.log(index)
       let userToUpdate = userDetails
       userToUpdate.cart[index].qty = quantity;
       Axios.post(process.env.REACT_APP_API_URL +'/user/updateCart', {"user_id" : userDetails._id, "cart": userToUpdate.cart} )
       .then((response) => {
           console.log(userToUpdate)
           updateCart(userToUpdate);
           fetchCartItems();
       })
    }

    useEffect(() => {
        fetchCartItems();
    }, [])

    return (
        <div>
            <div className="breadcrumbs">
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <div className="bread-inner">
                                <ul className="bread-list">
                                    <li><Link to="/">Home<i className="ti-arrow-right"></i></Link></li>
                                    <li className="active"><Link to="/">Cart</Link></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="shopping-cart section">
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <table className="table shopping-summery">
                                <thead>
                                    <tr className="main-hading">
                                        <th>PRODUCT</th>
                                        <th>NAME</th>
                                        <th className="text-center">UNIT PRICE</th>
                                        <th className="text-center">QUANTITY</th>
                                        <th className="text-center">TOTAL</th> 
                                        <th className="text-center"><i className="ti-trash remove-icon"></i></th>
                                    </tr>
                                </thead>
                                <tbody>
                                {userDetails.cart.length == 0 && (
                                    <tr>
                                        <td colspan="6" className="text-center">
                                            <h3>Empty Cart</h3>
                                            <p>Add some products to cart</p>
                                        </td> 
                                    </tr>
                                )} 
                                {userDetails.cart.reverse().map((product, index) => 
                                    <tr key={index}>
                                        <td className="image" data-title="No"><img src={process.env.REACT_APP_API_URL + '/product/image/' + product.image[0]} alt="#" /></td>
                                        <td className="product-des" data-title="Description">
                                            <p className="product-name"><Link to="#">{product.name}</Link></p>
                                            <p className="product-des">{product.small_description}</p>
                                        </td>
                                        <td className="price" data-title="Price"><span>${product.sale_price} </span></td>
                                        <td className="qty" data-title="Qty">
                                            <div className="input-group">
                                                <div className="button minus">
                                                    {product.qty <= 1 ? (
                                                        <button type="button" className="btn btn-primary btn-number" disabled="disabled" data-type="minus" data-field="quant[1]">
                                                            <i className="ti-minus"></i>
                                                        </button>

                                                    ) : (
                                                        <button type="button" className="btn btn-primary btn-number" data-type="minus" data-field="quant[1]" onClick={() => productQty(product, index, parseInt(product.qty)-1)}>
                                                            <i className="ti-minus"></i>
                                                        </button>
                                                    ) } 
                                                </div>
                                                <input type="number" name="quant[1]" className="input-number"  data-min="1" data-max="100" value={product.qty} />
                                                <div className="button plus">
                                                    <button type="button" className="btn btn-primary btn-number" data-type="plus" data-field="quant[1]" onClick={() => productQty(product, index, parseInt(product.qty) + 1)}>
                                                        <i className="ti-plus"></i>
                                                    </button>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="total-amount" data-title="Total"><span>${product.sale_price * parseInt(product.qty)}</span></td>
                                        <td className="action" data-title="Remove"><Link to="#" onClick={(e) => deleteCart(e, product._id)}><i className="ti-trash remove-icon"></i></Link></td>
                                    </tr>
                                    
                                )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-12">
                            <div className="total-amount">
                                <div className="row">
                                    <div className="col-lg-8 col-md-5 col-12">
                                        <div className="left">
                                            <div className="coupon">
                                                <form action="#" target="_blank">
                                                    <input name="Coupon" placeholder="Enter Your Coupon" />
                                                    <button className="btn">Apply</button>
                                                </form>
                                            </div>
                                            <div className="checkbox">
                                                <label className="checkbox-inline" for="2"><input name="news" id="2" type="checkbox" /> Shipping (+10$)</label>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-4 col-md-7 col-12">
                                        <div className="right">
                                            <ul>
                                                <li>Cart Subtotal<span>${subTotal}</span></li>
                                                <li>Shipping<span>Free</span></li>
                                                <li>You Save<span>$10.00</span></li>
                                                <li className="last">You Pay<span>${subTotal}</span></li>
                                            </ul>
                                            <div className="button5">
                                                <Link to="/checkout" className="btn">Checkout</Link>
                                                <Link to="/shop" className="btn">Continue shopping</Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <section className="shop-services section">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-3 col-md-6 col-12">
                            <div className="single-service">
                                <i className="ti-rocket"></i>
                                <h4>Free shiping</h4>
                                <p>Orders over $100</p>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-6 col-12">
                            <div className="single-service">
                                <i className="ti-reload"></i>
                                <h4>Free Return</h4>
                                <p>Within 30 days returns</p>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-6 col-12">
                            <div className="single-service">
                                <i className="ti-lock"></i>
                                <h4>Sucure Payment</h4>
                                <p>100% secure payment</p>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-6 col-12">
                            <div className="single-service">
                                <i className="ti-tag"></i>
                                <h4>Best Peice</h4>
                                <p>Guaranteed price</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            
            <section className="shop-newsletter section">
                <div className="container">
                    <div className="inner-top">
                        <div className="row">
                            <div className="col-lg-8 offset-lg-2 col-12">
                                <div className="inner">
                                    <h4>Newsletter</h4>
                                    <p> Subscribe to our newsletter and get <span>10%</span> off your first purchase</p>
                                    <form action="mail/mail.php" method="get" target="_blank" className="newsletter-inner">
                                        <input name="EMAIL" placeholder="Your email address" required="" type="email" />
                                        <button className="btn">Subscribe</button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>                
        </div>
    )
}

const mapStateToProps = state => ({
    userDetails: state.reducer1.userDetails,
})

const mapDispatchToProps = {
    updateCart:(userDetails) => updateCart(userDetails)
}

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
