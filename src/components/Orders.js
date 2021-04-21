import React,{useState,useEffect} from 'react'
import {connect} from 'react-redux'
import Axios from 'axios'
import {Link} from 'react-router-dom'

const Orders = ({userDetails}) => {

    const [orderList, setOrderList] = useState(null)
    const status = ["", 'Processing', 'Shipping', "Out for Delivery", "Delivered"]
    
    const fetchOrders = () => {
        Axios.get(process.env.REACT_APP_API_URL + '/order/orders/' + userDetails._id)
        .then((response) => {
            setOrderList(response.data);
            console.log(response.data);
        })
    }

    useEffect(() => {
        fetchOrders();
    }, []);
    return(
        <div>
            <div className="breadcrumbs">
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <div className="bread-inner">
                                <ul className="bread-list">
                                    <li><Link to="/">Home<i className="ti-arrow-right"></i></Link></li>
                                    <li><Link to="/account">Account<i className="ti-arrow-right"></i></Link></li>
                                    <li className="active"><Link to="/orders">Orders</Link></li>
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
                                        <th className="text-center">QUANTITY</th>
                                        <th className="text-center">TOTAL</th>
                                        <th className="text-center">PAYMENT MODE</th> 
                                        <th className="text-center">STATUS</th> 
                                    </tr>
                                </thead>
                                <tbody>
                                    {orderList === null ? (
                                        <tr>
                                            <td colspan="6" className="text-center">
                                                <h3>Empty Cart</h3>
                                                <p>Add some products to cart</p>
                                            </td> 
                                        </tr>
                                    ) : (
                                        <>
                                        {orderList.map((orders) => (
                                            orders.products.map((product, index) => (
                                                <tr key={index}>
                                                    <td className="image" data-title="No"><img src={process.env.REACT_APP_API_URL + '/product/image/' + product.image[0] } alt="#" /></td>
                                                    <td className="product-des" data-title="Description">
                                                        <p className="product-name"><Link to="#">{product.name}</Link></p>
                                                        <p className="product-des">{product.small_description}</p>
                                                    </td>
                                                    <td className="quantity" data-title="Quantity"><span>${product.sale_price} x {product.qty}</span></td>
                                                    <td className="total-amount" data-title="Total"><span>${parseInt(product.sale_price) * parseInt(product.qty)}</span></td>
                                                    <td className="payment-mode text-center" data-Title="Payment Mode"><span>{orders.paymentMode}</span></td>
                                                    <td className="status text-center" data-title="Status"><span>{status[orders.status]}</span></td>
                                                </tr>
                                            ))
                                        ))}
                                        </>
                                    )}
                                
                                
                                    
                                
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
            
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

export default connect(mapStateToProps,null)(Orders)