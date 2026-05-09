
import { useState } from 'react'
import {Link, useNavigate} from 'react-router-dom'
import {ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { handleError, handleSuccess} from '../utils'
const Login = () => {


    const [loginInfo, setLoginInfo]=useState({

        email:'',
        password:''
    });
    const navigate=useNavigate();
    const handleChange=(e)=>{
        const {name, value}=e.target;
        console.log(name,value);
        const copyLoginInfo={...loginInfo};
        copyLoginInfo[name]=value;
        setLoginInfo(copyLoginInfo)
    }

    const handleLogin=async (e)=>{
        e.preventDefault();
        const {email, password}=loginInfo;
        if(!email || !password)
        {
            return handleError('email and password must required')
        }
        try{
            const url="http://localhost:8080/auth/login";
            const response=await fetch(url,{
                method:"POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body:JSON.stringify(loginInfo)

            });
            const result=await response.json();
            const {success, message, jwtToken, name, error}=result;
            if(success)
            {
                handleSuccess(message);
                localStorage.setItem('token', jwtToken);
                localStorage.setItem('loggedInUser', name);
                setTimeout(()=>{
                    navigate('/home')
                }, 1000)
            }
            else if(error){
                const details=error?.details[0].message;
                handleError(details);
            }
            else if(!success){
                handleError(message); 
            }
            
            
            console.log(result)
        }catch(err){
            handleError(err.message || err.toString() || 'An error occurred');
        }
    }
  return (
    <div className='container'>
        <h1>Login</h1>
        <form onSubmit={handleLogin}>
            <div>
                <label htmlFor="email" class='labelsign'></label>
                <input 
                    onChange={handleChange}
                    type="email" 
                    name='email'
                    
                    placeholder='Enter your mail...'
                    value={loginInfo.email}
                />
            </div>
            <div>
                <label htmlFor="password" class='labelsign'></label>
                <input 
                    onChange={handleChange}
                    type="password" 
                    name='password'
                    
                    placeholder='Enter your password...'
                    value={loginInfo.password}
                />
            </div>
            <button type='submit' class="buttonsign">Login</button>
            <span>Don't have account?
                <Link to="/signup">Signup</Link>
            </span>
        </form>
        <ToastContainer/>
    </div>
  )
}

export default Login

