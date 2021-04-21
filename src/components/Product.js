import React,{useState, useEffect} from 'react'
import {Link} from 'react-router-dom';
import Axios from 'axios'
import {connect} from 'react-redux';
import { addToCart } from '../redux/action/actions';

const Product = ({match, userDetails}) => {

    const product_id = match.params.id;
    const [product, setProduct] = useState(null);
    const [cartErr, setCartErr] = useState(null)

    var user = userDetails;
    const addCart = (product) => {
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
            })
        }
    }

    useEffect(() => {
        async function fetchData() {
            await Axios.get(process.env.REACT_APP_API_URL + '/product/' + product_id)
            .then((response) => {
                setProduct(response.data);
                console.log(response.data)
            })
            .catch((err) => console.log(err))
        }

        fetchData();
    },[ product_id ])

    return(
        <div>
            <div className="breadcrumbs">
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <div className="bread-inner">
                                <ul className="bread-list">
                                    <li><Link to="/">Home<i className="ti-arrow-right"></i></Link></li>
                                    <li className="active"><Link to="/shop">Shop</Link></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {cartErr && (
            <div className="container pt-5">
                <div className="p-2 text-dark border border-warning">
                    {cartErr}
                    <Link className="float-right px-2" onClick={() => setCartErr(null) }>x</Link>
                </div>
                
            </div>
            )}
            { product && (
                <section className="blog-single section">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-6 col-12">
                                <div className="blog-single-main">
                                    <div className="row">
                                        <div className="col-12">
                                            <div className="image">
                                                <img src={process.env.REACT_APP_API_URL + '/product/image/' + product.image[0] } alt="#" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-6 col-12">
                                <div className="summary entry-summary">
                                    <div className="py-3">
                                        <h2>{product.name}</h2>
                                        <p><del>${product.original_price}</del> <big>${product.sale_price}</big></p>
                                        <div className="py-2">
                                            <p>{product.small_description ? ( 
                                                product.small_description
                                             ) : (
                                                product.description.substr(0,150)
                                             )}
                                                </p>
                                            <div className="pt-2">
                                                <button className="btn" onClick={() => addCart(product)}>
                                                    Add to Cart
                                                </button>
                                            </div>
                                        </div>
                                        <div className="pt-3">
                                            <p>Category :</p>
                                            <ul>
                                                <li> {product.category} </li>
                                            </ul>
                                        </div>

                                    </div>

                                </div>
                            </div>

                        </div>
                        <div className="row">
                            <div className="col-12">
                                <div className="blog-detail">
                                    <h2 className="blog-title">{product.name}</h2>
                                    <div className="blog-meta">
                                        <span className="author"><i className="fa fa-calendar"></i>{new Date(product.created_at).toDateString()}</span>
                                    </div>
                                    <div className="content">
                                        <p>{product.description}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            )}
        </div>
    )
}

const mapStateToProps = state => ({
    userDetails:state.reducer1.userDetails,
})

const mapDispatchToProps = {
    addToCart: (userDetails) => addToCart(userDetails)
}


export default connect(mapStateToProps,mapDispatchToProps)(Product);