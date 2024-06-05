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
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    function onChange(e){
        setFromData(prev => ({
            ...prev, 
            [e.target.name]: e.target.value
        }))
    }

    const signin = async () => {
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

    return(
        <>
            {loading && ( 
                <div className="w-screen h-screen flex justify-center items-center">
                    
                    <img src={loader} alt="" />
                </div>
            )}
            <div className="w-screen h-screen flex justify-center items-center">
                <div className="p-4 m-4 bg-slate-400 rounded-lg">
                    <p className="text-3xl font-black text-center">Sign In</p>
                    <p className="text-center text-sm">Enter your information to access your account</p>
                    <form action="" className="text-sm m-5">
                        
                        <LabelledInput value={formData.email} onChange={onChange} name="email" title="Email" type="email" />
                        <LabelledInput value={formData.password} onChange={onChange} name="password" title="Password" type="password" />

                        <Button onClick={signin} title="Sign In" />

                        <p className="font-medium text-center">Dont have an account ? <a className="underline" onClick={() => navigate("/")}>Sign Up</a></p>
                    </form>
                </div>
            </div>
        </>
    )
}