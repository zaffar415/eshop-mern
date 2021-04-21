import React,{useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import {connect} from 'react-redux';
import Axios from 'axios'
import { addToCart } from '../redux/action/actions';


const Home = ({userDetails, addToCart}) => {
    var user = userDetails;
    const [cartErr, setCartErr] = useState(null)
    const [products, setProducts] = useState(null)
    const [tab, setTab] = useState(1)

    const getProducts = (e,etab = 1,category = 'Product 1 Category') => {
        setTab(etab)
        if(e) {
            e.preventDefault();
        }
        Axios.get(process.env.REACT_APP_API_URL + '/product/category/' + category)
        .then((response) => {
            setProducts(response.data);
            console.log(response.data);
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
    }, []);

    return(
        <div id="home">
            <section className="hero-slider">
                <div className="single-slider" style={{background: 'url(https://previews.123rf.com/images/houbacze/houbacze1805/houbacze180500053/102545861-banner-eshop.jpg)'}}>
                    <div className="container">
                        <div className="row no-gutters">
                            <div className="col-lg-9 offset-lg-3 col-12">
                                <div className="text-inner">
                                    <div className="row">
                                        <div className="col-lg-7 col-12">
                                            <div className="hero-text">
                                                {/* <h1><span>UP TO 50% OFF </span>Shirt For Man</h1>
                                                <p>Maboriosam in a nesciung eget magnae <br /> dapibus disting tloctio in the find it pereri <br /> odiy maboriosm.</p>
                                                <div className="button">
                                                    <Link to="/shop" className="btn">Shop Now!</Link>
                                                </div> */}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="small-banner section">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-lg-4 col-md-6 col-12">
                            <div className="single-banner">
                                <img src="https://st4.depositphotos.com/3867481/27823/v/1600/depositphotos_278231758-stock-illustration-red-vector-banner-discount.jpg" alt="#"  />
                                <div className="content">
                                    <p>Man's Collectons</p>
                                    <h3>Summer travel <br /> collection</h3>
                                    <Link to="#">Discover Now</Link>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-6 col-12">
                            <div className="single-banner">
                                <img src="https://st4.depositphotos.com/3867481/27823/v/1600/depositphotos_278232650-stock-illustration-red-vector-banner-promotion.jpg" alt="#"  />
                                <div className="content">
                                    <p>Bag Collectons</p>
                                    <h3>Awesome Bag <br /> 2020</h3>
                                    <Link to="#">Shop Now</Link>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4 col-12">
                            <div className="single-banner tab-height">
                                <img src="https://st4.depositphotos.com/3867481/27823/v/1600/depositphotos_278231758-stock-illustration-red-vector-banner-discount.jpg" alt="#" />
                                <div className="content">
                                    <p>Flash Sale</p>
                                    <h3>Mid Season <br /> Up to <span>40%</span> Off</h3>
                                    <Link to="#">Discover Now</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>


            <div className="product-area section">
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <div className="section-title">
                                <h2>Trending Item</h2>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-12">
                            <div className="product-info">
                                <div className="nav-main">
                                    <ul className="nav nav-tabs" id="myTab" role="tablist">
                                        <li className="nav-item"><Link className={tab === 1 ? "nav-link active" : 'nav-link'} onClick={(e) => getProducts(e,1,'men')}>Man</Link></li>
                                        <li className="nav-item"><Link className={tab === 2 ? "nav-link active" : 'nav-link'}  onClick={(e) => getProducts(e,2,'women')}>Woman</Link></li>
                                        <li className="nav-item"><Link className={tab === 3 ? "nav-link active" : 'nav-link'} onClick={(e) => getProducts(e,3,'kids')}>Kids</Link></li>
                                    </ul>
                                </div>
                                <div className="tab-content" id="myTabContent">
                                    <div className="tab-pane fade show active">
                                        <div className="tab-single">
                                        {cartErr && (
                                            <div className="py-3">
                                                <div className="p-2 text-dark border border-warning">
                                                    {cartErr}
                                                    <Link className="float-right px-2" onClick={() => setCartErr(null) }>x</Link>
                                                </div>
                                            </div>
                                            )}
                                            <div className="row">
                                            {products && products.map((product, index) => (
                                                    <div className="col-xl-3 col-lg-4 col-md-4 col-12">
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
                            </div>
                        </div>
                    </div>
                </div>
            </div>


            <section className="midium-banner">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-6 col-md-6 col-12">
                            <div className="single-banner">
                                <img src="https://image.shutterstock.com/image-photo/gentlemens-accessories-top-view-on-600w-1090078850.jpg" alt="#" />
                                <div className="content">
                                    <p>Man's Collectons</p>
                                    <h3>Man's items <br />Up to<span> 50%</span></h3>
                                    <Link to="#">Shop Now</Link>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-6 col-md-6 col-12">
                            <div className="single-banner">
                                <img src="https://cdn1.vectorstock.com/i/1000x1000/42/55/kids-collection-label-or-price-tag-vector-21284255.jpg" style={{height:'345px'}} alt="#" />
                                <div className="content">
                                    <p>Kid's Collection</p>
                                    <h3>mid season <br /> up to <span>70%</span></h3>
                                    <Link to="#" className="btn">Shop Now</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>            

            <section className="shop-services section home">
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

            <div className="modal fade" id="exampleModal" tabindex="-1" role="dialog">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span className="ti-close" aria-hidden="true"></span></button>
                        </div>
                        <div className="modal-body">
                            <div className="row no-gutters">
                                <div className="col-lg-6 col-md-12 col-sm-12 col-xs-12">
                                        <div className="product-gallery">
                                            <div className="quickview-slider-active">
                                                <div className="single-slider">
                                                    <img src="https://via.placeholder.com/569x528" alt="#" />
                                                </div>
                                                <div className="single-slider">
                                                    <img src="https://via.placeholder.com/569x528" alt="#" />
                                                </div>
                                                <div className="single-slider">
                                                    <img src="https://via.placeholder.com/569x528" alt="#" />
                                                </div>
                                                <div className="single-slider">
                                                    <img src="https://via.placeholder.com/569x528" alt="#" />
                                                </div>
                                            </div>
                                        </div>
                                </div>
                                <div className="col-lg-6 col-md-12 col-sm-12 col-xs-12">
                                    <div className="quickview-content">
                                        <h2>Flared Shift Dress</h2>
                                        <div className="quickview-ratting-review">
                                            <div className="quickview-ratting-wrap">
                                                <div className="quickview-ratting">
                                                    <i className="yellow fa fa-star"></i>
                                                    <i className="yellow fa fa-star"></i>
                                                    <i className="yellow fa fa-star"></i>
                                                    <i className="yellow fa fa-star"></i>
                                                    <i className="fa fa-star"></i>
                                                </div>
                                                <Link to="#"> (1 customer review)</Link>
                                            </div>
                                            <div className="quickview-stock">
                                                <span><i className="fa fa-check-circle-o"></i> in stock</span>
                                            </div>
                                        </div>
                                        <h3>$29.00</h3>
                                        <div className="quickview-peragraph">
                                            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Mollitia iste laborum ad impedit pariatur esse optio tempora sint ullam autem deleniti nam in quos qui nemo ipsum numquam.</p>
                                        </div>
                                        <div className="size">
                                            <div className="row">
                                                <div className="col-lg-6 col-12">
                                                    <h5 className="title">Size</h5>
                                                    <select>
                                                        <option selected="selected">s</option>
                                                        <option>m</option>
                                                        <option>l</option>
                                                        <option>xl</option>
                                                    </select>
                                                </div>
                                                <div className="col-lg-6 col-12">
                                                    <h5 className="title">Color</h5>
                                                    <select>
                                                        <option selected="selected">orange</option>
                                                        <option>purple</option>
                                                        <option>black</option>
                                                        <option>pink</option>
                                                    </select>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="quantity">
                                            <div className="input-group">
                                                <div className="button minus">
                                                    <button type="button" className="btn btn-primary btn-number" disabled="disabled" data-type="minus" data-field="quant[1]">
                                                        <i className="ti-minus"></i>
                                                    </button>
                                                </div>
                                                <input type="text" name="quant[1]" className="input-number"  data-min="1" data-max="1000" value="1" />
                                                <div className="button plus">
                                                    <button type="button" className="btn btn-primary btn-number" data-type="plus" data-field="quant[1]">
                                                        <i className="ti-plus"></i>
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="add-to-cart">
                                            <Link to="#" className="btn">Add to cart</Link>
                                            <Link to="#" className="btn min"><i className="ti-heart"></i></Link>
                                            <Link to="#" className="btn min"><i className="fa fa-compress"></i></Link>
                                        </div>
                                        <div className="default-social">
                                            <h4 className="share-now">Share:</h4>
                                            <ul>
                                                <li><Link className="facebook" to="#"><i className="fa fa-facebook"></i></Link></li>
                                                <li><Link className="twitter" to="#"><i className="fa fa-twitter"></i></Link></li>
                                                <li><Link className="youtube" to="#"><i className="fa fa-pinterest-p"></i></Link></li>
                                                <li><Link className="dribbble" to="#"><i className="fa fa-google-plus"></i></Link></li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


        </div>
    )
}

const mapStateToProps = state => ({
    userDetails:state.reducer1.userDetails,
})

const mapDispatchToProps = {
    addToCart: (userDetails) => addToCart(userDetails),
}

export default connect(mapStateToProps,mapDispatchToProps)(Home);