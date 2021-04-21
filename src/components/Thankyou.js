import React from 'react';
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'

const Thankyou = () => {
    return (
       <div className="container">
            <div className="text-center">
                <div style={{padding:"20vh 0px"}}>
                    <div className="text-success">
                        <h1>Order Successful</h1>
                    </div>
                    <div className="p-3">
                        <p>Thankyou for ordering from Eshop</p>
                        <p>Your Order has been placed Successfully It will be delivered within 3-4 Working Days </p>
                        <p>Track your Order from <Link to="/orders">here</Link> </p>
                        <div className="p-5">
                            <Link to="/shop" className="btn text-white">Continue Shopping</Link>
                        </div>
                    </div>
                </div>
            </div>
       </div>
    )
}

export default connect(null,null)(Thankyou);