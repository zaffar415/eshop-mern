import React,{useState} from 'react';
import {Link, useHistory} from 'react-router-dom';
import Axios from 'axios';
import {connect} from 'react-redux';
import {registerUser} from '../redux/action/actions';

const Register = ({registerUser}) => {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password1, setPassword1] = useState('');
    const [password2, setPassword2] = useState('');
    const [image, setImage] = useState(null);
    const [preview, setPreview] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);
    const [successMsg, setSuccessMsg] = useState(null);

    const history = useHistory();

    const submitHandler = (e) => {
        e.preventDefault();
        if(password1 !== password2) {
            setErrorMsg("Password Mismatch");
        } else {
            setErrorMsg(null);
            const password = password1;
            
            const formData = new FormData();
            formData.append('name',name);
            formData.append('email',email);
            formData.append('password',password);
            formData.append('image',image);
            Axios.post(process.env.REACT_APP_API_URL + '/user/add-user', formData,{
                headers: {
                    'Content-Type' :'multipart/formdata',
                }
            })
            .then((response) => {
                if(response.data.email) {
                    setSuccessMsg("Registered Successfully");
                    registerUser(response.data);
                    history.push('/');
                } else {
                    console.log(response.data);
                    setErrorMsg(response.data);
                }
            })
        }
    }

    return (
        <div className="bg-dark">
            <div className="container">
                <div className="p-5">
                    <div className="bg-white m-auto rounded text-dark px-5 py-2 w-md-50 card" >
                        <div className="text-center">
                            <div className="pb-4">
                                <h2><b>Register</b></h2>
                            </div>
                            {preview && (
                                <img src={preview} alt="preview" width="150" height="150" className="rounded-circle text-center" />
                            )}
                        </div>
                        <form onSubmit={(e) => submitHandler(e)}>
                            {errorMsg && (
                                <p className="text-danger"> {errorMsg} </p>
                            )}
                            {successMsg && (
                                <p className="text-success"> {successMsg} </p>
                            )}
                            <div className="form-group">
                                <label htmlFor="">Username</label>
                                <input type="text" className="form-control" placeholder="Enter Username" onChange={(e) => setName(e.target.value)} required="required" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="">Email</label>
                                <input type="email" className="form-control" placeholder="Enter Email" onChange={(e) => setEmail(e.target.value)} required="required" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="">Password</label>
                                <input type="password" className="form-control" placeholder="Enter Password" onChange={(e) => setPassword1(e.target.value)} required="required" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="">Confirm Password</label>
                                <input type="password" className="form-control" placeholder="Re-Enter Password" onChange={(e) => setPassword2(e.target.value)} required="required" />
                            </div>
                        
                            <div className="form-group">
                                <input type="file" 
                                className="form-control" 
                                onChange={(e) => {
                                    setImage(e.target.files[0]) 
                                    if(e.target.files[0]) {
                                        setPreview(URL.createObjectURL(e.target.files[0])) 
                                        setImage(e.target.files[0]);
                                    }
                                    else {
                                        setPreview(null);
                                    }
                                    }
                                }
                                />
                            </div>
                            <div className="pt-3">
                                <button className="btn btn-primary form-control" type="submit">
                                    Register
                                </button>
                            </div>
                            <div className="text-center pt-3">
                                <p>Already Have an Account? <Link to="/login">Login Here</Link> </p>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

const mapDispatchToProps = {
    registerUser : (userDetails) => registerUser(userDetails)
}

export default connect(null,mapDispatchToProps)(Register);