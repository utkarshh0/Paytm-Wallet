import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios'
import LabelledInput from '../Components/LabelledInput';
import Button from '../Components/Button';
import { REACT_APP_BACKEND } from '../baseUrl'
import loader from '../assets/loader.gif'

export default function Signup(){

    const [formData, setFormData] = useState({
        firstname: "",
        lastname: "",
        password: "",
        email: ""
    });
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate();

    const onChange = (e) => {
        setFormData(prev => ({
            ...prev, 
            [e.target.name]: e.target.value
        }))
    }

    const signup = async (e) => {
        e.preventDefault();
        setLoading(true)
        try {
            const resp = await axios.post(`${REACT_APP_BACKEND}user/signup/`, {
                firstname: formData.firstname.charAt(0).toUpperCase() + formData.firstname.slice(1),
                lastname: formData.lastname.charAt(0).toUpperCase() + formData.lastname.slice(1),
                username: formData.email,
                password: formData.password
            });
            
            const token = "Bearer " + resp.data.token;
            localStorage.setItem("token", token);
            navigate("/dashboard");
        } catch (err) {
            alert(`${err.response.data.message}`)
        }finally{
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
                <div className=" py-4 bg-slate-400 rounded-lg">
                    <p className="text-3xl font-black text-center">Sign Up</p>
                    <p className="text-center text-sm">Enter your information to create an account</p>
                    <form action="" className="text-sm m-5">

                        <LabelledInput value={formData.firstname} onChange={onChange} name="firstname" type="text" title="First Name" />
                        <LabelledInput value={formData.lastname} onChange={onChange} name="lastname" type="text" title="Last Name" />
                        <LabelledInput value={formData.email} onChange={onChange} name="email" type="email" title="Email" />
                        <LabelledInput value={formData.password} onChange={onChange} name="password" type="password" title="Password" />

                        <Button onClick={signup} title="Signup"/>

                        <p className="font-medium text-center">Already have an account ? <a className="underline" onClick={() => navigate("/signin")} >Login</a></p>
                    </form>
                </div>
            </div>
        </>
    )
}