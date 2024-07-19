import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from "axios"
import LabelledInput from '../Components/LabelledInput'
import Button from '../Components/Button'
import { REACT_APP_BACKEND } from '../baseUrl';
import loader from '../assets/loader.gif'

export default function Signin(){

    const [formData, setFromData] = useState({
        email: "",
        password: ""
    });
    const[errors, setErrors] = useState({})

    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    function onChange(e){
        setFromData(prev => ({
            ...prev, 
            [e.target.name]: e.target.value
        }))
        setErrors({
            ...errors,
            [e.target.name] : ''
        })
    }

    const signin = async () => {
        if(validate()){
            setLoading(true)
            try{
                
                const resp = await axios.post(`${REACT_APP_BACKEND}user/signin/`, {
                        username: formData.email,
                        password: formData.password
                    }
                )
                const token = "Bearer " + resp.data.token;
                localStorage.setItem("token", token);
                navigate("/dashboard")
            }
            catch(err){
                alert(`${err.response.data.message}`)
            }
            finally{
                setLoading(false)
            }
        }

    }

    const validate = () => {
        const newErrors = {};
        
        if (!formData.password) {
          newErrors.password = 'Password is required';
        } else if (formData.password.length < 6) {
            newErrors.password = 'Password must be at least 6 characters long';
        }
    
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!formData.email) {
          newErrors.email = 'Email is required';
        } else if (!emailRegex.test(formData.email)) {
          newErrors.email = 'Email is not valid';
        }
        setErrors(newErrors);
    
        return Object.keys(newErrors).length === 0;
      };

    return(
        <>
            {loading && ( 
                <div className="w-screen h-screen flex justify-center items-center">
                    
                    <img src={loader} alt="" />
                </div>
            )}
            <div className="w-screen h-screen flex justify-center items-center">
                <div className="p-4 m-4 shadow-2xl border rounded-3xl">
                    <p className="text-3xl font-black text-center">Sign In</p>
                    <p className="text-center text-sm">Enter your information to access your account</p>
                    <form action="" className="text-sm m-5">
                        
                        <LabelledInput value={formData.email} onChange={onChange} name="email" title="Email" type="email" errors={errors}/>
                        <LabelledInput value={formData.password} onChange={onChange} name="password" title="Password" type="password" errors={errors}/>

                        <Button onClick={signin} title="Sign In" />

                        <p className="font-medium text-center">Dont have an account ? <a className="underline" onClick={() => navigate("/")}>Sign Up</a></p>
                    </form>
                </div>
            </div>
        </>
    )
}