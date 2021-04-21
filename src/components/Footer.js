import React from 'react'
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';

const Footer = () => {
    return (
        <div>
            {/* Modal Start */}
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
                                                    <img src="images/modal1.jpg" alt="#" />
                                                </div>
                                                <div className="single-slider">
                                                    <img src="images/modal2.jpg" alt="#" />
                                                </div>
                                                <div className="single-slider">
                                                    <img src="images/modal3.jpg" alt="#" />
                                                </div>
                                                <div className="single-slider">
                                                    <img src="images/modal4.jpg" alt="#" />
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
            {/* Modal End */}
        <footer className="footer">        
            <div className="footer-top section">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-5 col-md-6 col-12">                        
                            <div className="single-footer about">
                                <div className="logo">
                                    <Link to="/"><img src="images/logo2.png" alt="/" /></Link>
                                </div>
                                <p className="text">Praesent dapibus, neque id cursus ucibus, tortor neque egestas augue,  magna eros eu erat. Aliquam erat volutpat. Nam dui mi, tincidunt quis, accumsan porttitor, facilisis luctus, metus.</p>
                                <p className="call">Got Question? Call us 24/7<span><Link to="tel:123456789">+0123 456 789</Link></span></p>
                            </div>                        
                        </div>
                        <div className="col-lg-2 col-md-6 col-12">                        
                            <div className="single-footer links">
                                <h4>Information</h4>
                                <ul>
                                    <li><Link to="/">About Us</Link></li>
                                    <li><Link to="/">Faq</Link></li>
                                    <li><Link to="/">Terms & Conditions</Link></li>
                                    <li><Link to="/">Contact Us</Link></li>
                                    <li><Link to="/">Help</Link></li>
                                </ul>
                            </div>                        
                        </div>
                        <div className="col-lg-2 col-md-6 col-12">                        
                            <div className="single-footer links">
                                <h4>Customer Service</h4>
                                <ul>
                                    <li><Link to="/">Payment Methods</Link></li>
                                    <li><Link to="/">Money-back</Link></li>
                                    <li><Link to="/">Returns</Link></li>
                                    <li><Link to="/">Shipping</Link></li>
                                    <li><Link to="/">Privacy Policy</Link></li>
                                </ul>
                            </div>                        
                        </div>
                        <div className="col-lg-3 col-md-6 col-12">                        
                            <div className="single-footer social">
                                <h4>Get In Tuch</h4>                            
                                <div className="contact">
                                    <ul>
                                        <li>NO. 342 - London Oxford Street.</li>
                                        <li>012 United Kingdom.</li>
                                        <li>info@eshop.com</li>
                                        <li>+032 3456 7890</li>
                                    </ul>
                                </div>                            
                                <ul>
                                    <li><Link to="/"><i className="ti-facebook"></i></Link></li>
                                    <li><Link to="/"><i className="ti-twitter"></i></Link></li>
                                    <li><Link to="/"><i className="ti-flickr"></i></Link></li>
                                    <li><Link to="/"><i className="ti-instagram"></i></Link></li>
                                </ul>
                            </div>                        
                        </div>
                    </div>
                </div>
            </div>        
            <div className="copyright">
                <div className="container">
                    <div className="inner">
                        <div className="row">
                            <div className="col-lg-6 col-12">
                                <div className="left">
                                    <p>Copyright © 2020 <Link to="http://www.wpthemesgrid.com" target="_blank">Wpthemesgrid</Link>  -  All Rights Reserved.</p>
                                </div>
                            </div>
                            <div className="col-lg-6 col-12">
                                <div className="right">
                                    <img src="images/payments.png" alt="/" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    </div>
    )
}

export default connect()(Footer);