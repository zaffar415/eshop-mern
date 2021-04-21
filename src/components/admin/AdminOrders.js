import React,{useState,useEffect} from 'react';
import Axios from 'axios'
import { connect } from 'react-redux';
import {Link} from 'react-router-dom'

const AdminOrders = () => {

    const [orderList, setOrderList] = useState(null)

    const fetchOrders = () => {
        Axios.get(process.env.REACT_APP_API_URL + '/order/')
        .then((response) => {
            setOrderList(response.data)
        })
    }

    const updateStatus = (e, id) => {
        console.log(id, e.target.value);
        Axios.post(process.env.REACT_APP_API_URL + '/order/updateStatus', {
            id,
            "status" : e.target.value,
        })
        .then((response) => {
            console.log(response.data);
        })
    }

    useEffect(() => {
        fetchOrders();
    }, [])

    return(
        <>
            <div className="shopping-cart section">
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <table className="table shopping-summery">
                                <thead>
                                    <tr className="main-hading">
                                        <th>ORDER ID</th>
                                        <th>PRODUCTS</th>
                                        <th>TOTAL</th>
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
                                        {orderList.map((orders, order_index) => (
                                            <>
                                            <tr key={order_index}>
                                                <td><span>{orders._id}</span></td>
                                                <td className="product-des" data-title="Description">
                                                {orders.products.map((product, index) => (
                                                    <>
                                                        {/* <td className="image" data-title="No"><img src={process.env.REACT_APP_API_URL + '/product/image/' + product.image[0] } alt="#" /> <span>{product.name}</span></td> */}
                                                        
                                                            <p className="product-name"><Link to="#"><strong>{product.name}</strong></Link>
                                                            <span className="px-4">${product.sale_price} <small>x {product.qty}</small></span>
                                                            <span className="px-4">${parseInt(product.sale_price) * parseInt(product.qty)}</span>
                                                            </p>                                                       
                                                            
                                                    </>   
                                                ))}
                                                </td>
                                                <td><span>{orders.totalAmount}</span></td>
                                                <td className="payment-mode text-center" data-Title="Payment Mode"><span>{orders.paymentMode}</span></td>
                                                <td className="status text-center" data-title="Status"><span>
                                                    <select name="" id="" onChange={(e) => updateStatus(e, orders._id)}>
                                                        <option value="1" selected={orders.status === "1"}>Processsing</option>
                                                        <option value="2" selected={orders.status === "2"}>Shipping</option>
                                                        <option value="3" selected={orders.status === "3"}>Out for Delivery</option>
                                                        <option value="4" selected={orders.status === "4"}>Delivered</option>
                                                    </select>
                                                </span></td>
                                            </tr>
                                            </>
                                        ))}
                                        </>
                                    )}
                                
                                
                                    
                                
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default connect(null,null)(AdminOrders)