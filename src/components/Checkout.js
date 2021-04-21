import React,{useState, useEffect} from 'react';
import {connect} from 'react-redux';
import {Link, useHistory} from 'react-router-dom';
import Axios from 'axios';
import {updateCart} from '../redux/action/actions';

const Checkout = ({userDetails, updateCart}) => {

    const [checkoutSum, setCheckoutSum] = useState(0);
    const [firstname, setFirstname] = useState(userDetails.name)
    const [lastname, setLastname] = useState('');
    const [phone, setPhone] = useState('')
    const [country, setCountry] = useState('')
    const [state, setState] = useState('')
    const [address1, setAddress1] = useState('')
    const [address2, setAddress2] = useState('')
    const [pincode, setPincode] = useState('');
    const [paymentMode, setPaymentMode] = useState(null)
    const history = useHistory();

    const sumTotal = () => {
        var price = 0
        userDetails.cart.map((product, index) => {
            price = price + parseInt(product.sale_price) * parseInt(product.qty);
        })
        setCheckoutSum(price);
    }

    const checkoutSubmitHandler = (e) => {
        e.preventDefault();
        Axios.post(process.env.REACT_APP_API_URL + '/order/', {
            user_id : userDetails._id,
            products: userDetails.cart,
            firstname,
            lastname,
            phone,
            country,
            state,
            address1,
            address2,
            pincode,
            paymentMode,
            totalAmount:checkoutSum,
        })
        .then((response) => {
            console.log(response.data)
            Axios.post(process.env.REACT_APP_API_URL + '/user/updateCart', {
                user_id:userDetails._id,
                cart:[],
            })
            .then((response) => {
                console.log(response.data)
                let newuserDetails = userDetails;
                newuserDetails.cart = [];
                updateCart(newuserDetails);
            })
        })
        history.push('/thank-you');
    }
    
    useEffect(() => {
        sumTotal();
    },[])

    return (
        <div>
            <div className="breadcrumbs">
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <div className="bread-inner">
                                <ul className="bread-list">
                                    <li><Link to="index1.html">Home<i className="ti-arrow-right"></i></Link></li>
                                    <li className="active"><Link to="blog-single.html">Checkout</Link></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <section className="shop checkout section">
                <div className="container">
                    <form className="form" method="post" action="#" onSubmit={(e) => checkoutSubmitHandler(e)}>
                        <div className="row"> 
                            <div className="col-lg-8 col-12">
                                <div className="checkout-form">
                                    <h2>Make Your Checkout Here</h2>
                                    <p>Please register in order to checkout more quickly</p>
                                
                                    <div className="row">
                                        <div className="col-lg-6 col-md-6 col-12">
                                            <div className="form-group">
                                                <label>First Name<span>*</span></label>
                                                <input type="text" name="fname" onChange={(e) => setFirstname(e.target.value) } placeholder="" value={firstname} required="required" />
                                            </div>
                                        </div>
                                        <div className="col-lg-6 col-md-6 col-12">
                                            <div className="form-group">
                                                <label>Last Name<span>*</span></label>
                                                <input type="text" name="lname" placeholder="" onChange={(e) => setLastname(e.target.value)} value={lastname} required="required" />
                                            </div>
                                        </div>
                                        <div className="col-lg-6 col-md-6 col-12">
                                            <div className="form-group">
                                                <label>Email Address<span>*</span></label>
                                                <input type="email" name="email" placeholder="" value={userDetails.email} required="required" disabled="disabled" />
                                            </div>
                                        </div>
                                        <div className="col-lg-6 col-md-6 col-12">
                                            <div className="form-group">
                                                <label>Phone Number<span>*</span></label>
                                                <input type="number" name="number" placeholder="" value={phone} onChange={(e) => setPhone(e.target.value)} required="required" />
                                            </div>
                                        </div>
                                        <div className="col-lg-6 col-md-6 col-12">
                                            <div className="form-group">
                                                <label>Address Line 1<span>*</span></label>
                                                <input type="text" name="address" placeholder="" value={address1} onChange={(e) => setAddress1(e.target.value)} required="required" />
                                            </div>
                                        </div>
                                        <div className="col-lg-6 col-md-6 col-12">
                                            <div className="form-group">
                                                <label>Address Line 2<span>*</span></label>
                                                <input type="text" name="address" placeholder="" value={address2} onChange={(e) => setAddress2(e.target.value)} required="required" />
                                            </div>
                                        </div>
                                        <div className="col-lg-6 col-md-6 col-12">
                                            <div className="form-group">
                                                <label>Country<span>*</span></label>
                                                <input type="text" name="country" value={country} onChange={(e) => setCountry(e.target.value)} required="required" />
                                            </div>
                                        </div>
                                        <div className="col-lg-6 col-md-6 col-12">
                                            <div className="form-group">
                                                <label>State / Divition<span>*</span></label>
                                                <input type="text" name="state" value={state} onChange={(e) => setState(e.target.value)} required="required" />
                                            </div>
                                        </div>
                                        
                                        <div className="col-lg-6 col-md-6 col-12">
                                            <div className="form-group">
                                                <label>Postal Code<span>*</span></label>
                                                <input type="text" name="pincode" placeholder="" value={pincode} onChange={(e) => setPincode(e.target.value)} required="required" />
                                            </div>
                                        </div>                                        
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-4 col-12">
                                <div className="order-details">
                                    <div className="single-widget">
                                        <h2>CART  TOTALS</h2>
                                        <div className="content">
                                            <ul>
                                                <li>Sub Total<span>${checkoutSum}</span></li>
                                                <li>(+) Shipping<span>$10.00</span></li>
                                                <li className="last">Total<span>${checkoutSum + 10}</span></li>
                                            </ul>
                                        </div>
                                    </div>
                                    <div className="single-widget">
                                        <h2>Payments</h2>
                                        <div className="content">
                                            <div className="p-4">
                                                <div>
                                                    <label className="checkbox-inline" for="1"><input name="payment" id="1" type="radio" onChange={(e) => setPaymentMode(e.target.value)} value="card" required="required" /> Credit/Debit card</label>
                                                </div>
                                                <div>
                                                    <label className="checkbox-inline" for="3"><input name="payment" id="3" type="radio" onChange={(e) => setPaymentMode(e.target.value)} value="paypal" required="required" /> PayPal</label>
                                                </div>
                                                <div>
                                                    <label className="checkbox-inline" for="2"><input name="payment" id="2" type="radio" onChange={(e) => setPaymentMode(e.target.value)} value="COD" required="required" /> Cash On Delivery</label>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="single-widget payement">
                                        <div className="content">
                                            <img src="images/payment-method.png" alt="#" />
                                        </div>
                                    </div>
                                    <div className="single-widget get-button">
                                        <div className="content">
                                            <div className="button">
                                                <input type="submit" className="btn" value="proceed to checkout" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </section>
        </div>
    )
}

const mapStateToProps = state => ({
    userDetails:state.reducer1.userDetails,
})

const mapDispatchToProps = {
    updateCart: (userDetails) => updateCart(userDetails),
}

export default connect(mapStateToProps, mapDispatchToProps)(Checkout);