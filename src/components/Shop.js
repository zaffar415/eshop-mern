import React,{useState,useEffect} from 'react'
import Axios from 'axios';
import { Link } from 'react-router-dom';
import {connect} from 'react-redux';
import {addToCart} from '../redux/action/actions'

const Shop = ({userDetails}) => {

    const [products, setProducts] = useState(null);
    const [cartErr, setCartErr] = useState(null)
    var user = userDetails;

    const getProducts = async() => {
        await Axios.get(process.env.REACT_APP_API_URL + '/product/')
        .then((response) => {
            console.log(response.data)
            setProducts(response.data);
        })
        .catch((err) => {
            console.log(err)
        })
    }

    const addCart = (e, product) => {
        e.preventDefault();    
        setCartErr(null);
        var exists = user.cart.find((value, index) => {
            if(value._id === product._id) {
                return true;
            }
        });
        if(exists) {
            setCartErr('Product Already Exists in Your Cart')
            setTimeout(() => {
                setCartErr(null);
            }, 5000)
        }
        else {
            product.qty = 1;
            user.cart.push(product)
            console.log(user)
            Axios.post(process.env.REACT_APP_API_URL + '/user/addtocart', user )
            .then((response) => {
                console.log(response.data);
                addToCart(user);
                setCartErr('Product Added to cart')
                setTimeout(() => {
                    setCartErr(null);
                }, 5000)
            })
        }
    }

    const deleteProduct = async(e, productID) => {
        e.preventDefault();
        console.log(productID)
        
        await Axios.post(process.env.REACT_APP_API_URL + '/product/delete', { productID })
        .then((response) => {
            // console.log(response)
            getProducts();
        })
        .catch((err) => console.log(err));
    }
        

    useEffect(() => {
        getProducts();
    },[])
    return (
        <div id="shop">
            <section className="product-area shop-sidebar shop section">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-3 col-md-4 col-12">
                            <div className="shop-sidebar">
                                    <div className="single-widget category">
                                        <h3 className="title">Categories</h3>
                                        <ul className="categor-list">
                                            <li><Link to="#">T-shirts</Link></li>
                                            <li><Link to="#">jacket</Link></li>
                                            <li><Link to="#">jeans</Link></li>
                                            <li><Link to="#">sweatshirts</Link></li>
                                            <li><Link to="#">trousers</Link></li>
                                            <li><Link to="#">kitwears</Link></li>
                                            <li><Link to="#">accessories</Link></li>
                                        </ul>
                                    </div>
                                        <div className="single-widget range">
                                            <h3 className="title">Shop by Price</h3>
                                            <div className="price-filter">
                                                <div className="price-filter-inner">
                                                    <div id="slider-range"></div>
                                                        <div className="price_slider_amount">
                                                        <div className="label-input">
                                                            <span>Range:</span><input type="text" id="amount" name="price" placeholder="Add Your Price"/>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <ul className="check-box-list">
                                                <li>
                                                    <label className="checkbox-inline" for="1"><input name="news" id="1" type="checkbox" />$20 - $50<span className="count">(3)</span></label>
                                                </li>
                                                <li>
                                                    <label className="checkbox-inline" for="2"><input name="news" id="2" type="checkbox" />$50 - $100<span className="count">(5)</span></label>
                                                </li>
                                                <li>
                                                    <label className="checkbox-inline" for="3"><input name="news" id="3" type="checkbox" />$100 - $250<span className="count">(8)</span></label>
                                                </li>
                                            </ul>
                                        </div>
                                    <div className="single-widget recent-post">
                                        <h3 className="title">Recent post</h3>
                                        <div className="single-post first">
                                            <div className="image">
                                                <img src="https://via.placeholder.com/75x75" alt="#" />
                                            </div>
                                            <div className="content">
                                                <h5><Link to="#">Girls Dress</Link></h5>
                                                <p className="price">$99.50</p>
                                                <ul className="reviews">
                                                    <li className="yellow"><i className="ti-star"></i></li>
                                                    <li className="yellow"><i className="ti-star"></i></li>
                                                    <li className="yellow"><i className="ti-star"></i></li>
                                                    <li><i className="ti-star"></i></li>
                                                    <li><i className="ti-star"></i></li>
                                                </ul>
                                            </div>
                                        </div>
                                        <div className="single-post first">
                                            <div className="image">
                                                <img src="https://via.placeholder.com/75x75" alt="#" />
                                            </div>
                                            <div className="content">
                                                <h5><Link to="#">Women Clothings</Link></h5>
                                                <p className="price">$99.50</p>
                                                <ul className="reviews">
                                                    <li className="yellow"><i className="ti-star"></i></li>
                                                    <li className="yellow"><i className="ti-star"></i></li>
                                                    <li className="yellow"><i className="ti-star"></i></li>
                                                    <li className="yellow"><i className="ti-star"></i></li>
                                                    <li><i className="ti-star"></i></li>
                                                </ul>
                                            </div>
                                        </div>
                                        <div className="single-post first">
                                            <div className="image">
                                                <img src="https://via.placeholder.com/75x75" alt="#" />
                                            </div>
                                            <div className="content">
                                                <h5><Link to="#">Man Tshirt</Link></h5>
                                                <p className="price">$99.50</p>
                                                <ul className="reviews">
                                                    <li className="yellow"><i className="ti-star"></i></li>
                                                    <li className="yellow"><i className="ti-star"></i></li>
                                                    <li className="yellow"><i className="ti-star"></i></li>
                                                    <li className="yellow"><i className="ti-star"></i></li>
                                                    <li className="yellow"><i className="ti-star"></i></li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="single-widget category">
                                        <h3 className="title">Manufacturers</h3>
                                        <ul className="categor-list">
                                            <li><Link to="#">Forever</Link></li>
                                            <li><Link to="#">giordano</Link></li>
                                            <li><Link to="#">abercrombie</Link></li>
                                            <li><Link to="#">ecko united</Link></li>
                                            <li><Link to="#">zara</Link></li>
                                        </ul>
                                    </div>
                            </div>
                        </div>
                        <div className="col-lg-9 col-md-8 col-12">
                            <div className="row">
                                <div className="col-12">
                                    <div className="shop-top">
                                        <div className="shop-shorter">
                                            <div className="single-shorter">
                                                <label>Show :</label>
                                                <select>
                                                    <option selected="selected">09</option>
                                                    <option>15</option>
                                                    <option>25</option>
                                                    <option>30</option>
                                                </select>
                                            </div>
                                            <div className="single-shorter">
                                                <label>Sort By :</label>
                                                <select>
                                                    <option selected="selected">Name</option>
                                                    <option>Price</option>
                                                    <option>Size</option>
                                                </select>
                                            </div>
                                        </div>
                                        <ul className="view-mode">
                                            <li className="active"><Link to="/shop"><i className="fa fa-th-large"></i></Link></li>
                                            <li><Link to="/shop"><i className="fa fa-th-list"></i></Link></li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            {cartErr && (
                            <div className="py-3">
                                <div className="p-2 text-dark border border-warning">
                                    {cartErr}
                                    <Link className="float-right px-2" onClick={() => setCartErr(null) }>x</Link>
                                </div>
                                
                            </div>
                            )}
                            <div className="row">
                                { products !== null && products.map((product,key) => (
                                    <div className="col-lg-4 col-md-6 col-12" key={key}>
                                        <div className="single-product">
                                            <div className="product-img">
                                                <Link to={`/product/${product._id}`}>
                                                    <img className="default-img" src={process.env.REACT_APP_API_URL + '/product/image/' + product.image[0]} alt="#" />
                                                    <img className="hover-img" src={process.env.REACT_APP_API_URL + '/product/image/' + product.image[0]} alt="#" />
                                                </Link>
                                                <div className="button-head">
                                                    <div className="product-action">
                                                        <Link data-toggle="modal" data-target="#exampleModal" title="Quick View" to="#"><i className=" ti-eye"></i><span>Quick Shop</span></Link>
                                                        <Link title="Wishlist" to="#"><i className=" ti-heart "></i><span>Add to Wishlist</span></Link>
                                                        {/* <Link title="Compare" to="#"><i className="ti-bar-chart-alt"></i><span>Add to Compare</span></Link> */}
                                                        <Link title="Delete" to="#" onClick={(e) => deleteProduct(e, product._id)}><i className="ti-trash" style={{color:'red'}}></i><span>Delete</span></Link>
                                                    </div>
                                                    <div className="product-action-2">
                                                        <Link title="Add to cart" to="#" onClick={(e) => addCart(e, product)}>Add to cart</Link>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="product-content">
                                                <h3><Link to={`/product/${product._id}`}>{product.name}</Link></h3>
                                                <div className="product-price">
                                                    <span>${product.sale_price}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                ))}

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
    addToCart:(userDetails) => addToCart(userDetails)
}

export default connect(mapStateToProps,mapDispatchToProps)(Shop);