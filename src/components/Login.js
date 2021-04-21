import React,{useState} from 'react'
import {Link, useHistory} from 'react-router-dom'
import {connect} from 'react-redux';
import Axios from 'axios';
import {loginUser} from '../redux/action/actions'

const Login = ({loginUser}) => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMsg, setErrorMsg] = useState(null);
    const [successMsg, setSuccessMsg] = useState(null);

    const history = useHistory();

    const loginHandler = (e) => {
        setErrorMsg(null)
        setSuccessMsg(null)
        e.preventDefault();
        const formdata = new FormData();
        formdata.append('email', email);
        formdata.append('password',password);
        Axios.post(process.env.REACT_APP_API_URL + '/user/login', formdata)
        .then((response) => {
            if(response.data.email === email) {
                console.log(response.data);
                setSuccessMsg("Login Successful")
                loginUser(response.data)
                history.push("/");
            } else {
                setErrorMsg(response.data)
            }
        })
        .catch((err) => console.log(err))
    }


    return(
        <div className="bg-dark">
            <div className="container">
                <div className="p-5">
                    <div
                    className="bg-white m-auto rounded text-dark px-5 py-3 card"
                    >
                    <div className="pb-4 text-center">
                        <h2>
                        <b> Login </b>
                        </h2>
                    </div>
                    <form onSubmit={(e) => loginHandler(e)}>
                        {successMsg && <p className="text-success"> {successMsg} </p>}
                        {errorMsg && <p className="text-danger"> {errorMsg} </p>}
                        <div className="form-group">
                        <label htmlFor=""> Email </label>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Enter Email"
                            onChange={(e) => setEmail(e.target.value)}
                            required="required"
                        />
                        </div>
                        <div className="form-group">
                        <label htmlFor=""> Password </label>
                        <input
                            type="password"
                            className="form-control"
                            placeholder="Enter Password"
                            onChange={(e) => setPassword(e.target.value)}
                            required="required"
                        />
                        </div>
                        <div className="pt-3">
                        <button className="btn btn-primary form-control" type="submit">
                            Login
                        </button>
                        </div>
                        <div className="text-center pt-4">
                        <p>
                            
                            Dont Have An Account ? <Link to="/register"> Click Here </Link>
                        </p>
                        </div>
                    </form>
                    </div>
                </div>
            </div>
        </div>
    )
}


const mapDispatchToProps = {
    loginUser: (userDetails) => loginUser(userDetails),
}

export default connect(null, mapDispatchToProps)(Login);