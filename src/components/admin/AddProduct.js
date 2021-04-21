import React,{useState} from 'react'
import {connect} from 'react-redux';
import Axios from 'axios';

const AddProduct = () => {

    const [name, setName] = useState('');
    const [smallDescription, setSmallDescription] = useState('')
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('men');
    const [image, setImage] = useState(null);
    const [price, setPrice] = useState(0);
    const [salePrice, setSalePrice] = useState(0);

    const addProduct = () => {
        let formData = new FormData();
        formData.append('name',name);
        formData.append('small_description',smallDescription)
        formData.append('description',description)
        for(var i=0; i < image.length; i++) {
            formData.append(`image[${i}]`,image[i])
        }
        formData.append('category',category)
        formData.append('original_price',price)
        formData.append('sale_price',salePrice)
        console.log(process.env.REACT_APP_API_URL);

        Axios.post(process.env.REACT_APP_API_URL + '/product/add', formData, {
            headers: {
                "Content-Type" : 'multipart/form-data',
            },
        })
        .then((response) => {
            console.log(response.data);
            setName('');
            setSmallDescription('');
            setDescription('')
            setCategory('')
            setImage('')
            setPrice()
            setSalePrice('')
        })
        .catch((error) => console.log(error));
    }

    return (
        <div id="add-product">
            <div className="container p-5">
                <form action="" >
                    <div className="card">
                        <div className="pt-5 px-5 text-center">
                            <h2> Add Product </h2>
                            <p> Add Products Lorem ipsum dolor sit amet, consectetur adipisicing elit. Porro cupiditate labore corrupti unde, consequatur reiciendis minus sit non saepe. Magnam, et nihil sunt quis quaerat exercitationem non labore nisi. Odit? </p>
                        </div>
                        <div className="p-5">
                            <div className="form-group">
                                <label htmlFor="productName"> Product Name </label>
                                <input type="text" name="productName" valie={name} onChange={(e) => setName(e.target.value)} className="form-control" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="productDescription"> Product Small Description </label>
                                <input type="text" name="productDescription" value={smallDescription} onChange={(e) => setSmallDescription(e.target.value)} className="form-control" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="productDescription"> Product Description </label>
                                <input type="text" name="productDescription" value={description} onChange={(e) => setDescription(e.target.value)} className="form-control" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="productCategory"> Product Category </label>
                                <select name="productCategory" onChange={(e) => setCategory(e.target.value)}>
                                    <option value="men">Men</option>
                                    <option value="women">Women</option>
                                    <option value="kids">Kids</option>
                                </select>
                            </div>
                            <div className="form-group">
                                <label htmlFor="productImage"> Product Image </label>
                                <input type="file" name="productImage" className="form-control" onChange={(e)=> {
                                    setImage(e.target.files)
                                }} multiple />
                            </div>
                            <div className="form-group">
                                <label htmlFor="productPrice"> Product Price </label>
                                <input type="number" name="productPrice" value={price} onChange={(e) => setPrice(e.target.value)} className="form-control" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="productSalePrice"> Product Sale Price </label>
                                <input type="number" name="productSalePrice" value={salePrice} onChange={(e) => setSalePrice(e.target.value)} className="form-control" />
                            </div>

                            <div className="form-group text-center pt-3">
                                <button className="btn" type="button" onClick={() => addProduct()}>
                                    Submit
                                </button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default connect()(AddProduct);