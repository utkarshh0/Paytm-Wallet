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
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate();

    const onChange = (e) => {
        setFormData(prev => ({
            ...prev, 
            [e.target.name]: e.target.value
        }))
        setErrors({
            ...errors,
            [e.target.name] : ''
        })
    }

    const signup = async (e) => {
        e.preventDefault();
        if(validate()){
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
        
    }

    const validate = () => {
        const newErrors = {};
        
        if (!formData.firstname) {
          newErrors.firstname = 'firstname is required';
        } else if (formData.firstname.length < 3 || formData.firstname.length > 30) {
            newErrors.firstname = 'firstname must be between 3 and 30 characters';
        }

        if (!formData.lastname) {
            newErrors.lastname = 'Last name is required';
        } else if (formData.lastname.length > 50) {
            newErrors.lastname = 'Last name must be less than 50 characters';
        }
    
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

            <form className='form w-screen h-screen box-border flex justify-center items-center'>
                <div className="max-h-4/5 p-4 shadow-2xl border rounded-3xl">
                    <p className="text-3xl p-4 font-black text-center">Sign Up</p>
                    <p className="text-center text-sm">Enter your information to create an account</p>
                    <form action="" className="text-sm m-5">

                        <LabelledInput value={formData.firstname} onChange={onChange} name="firstname" type="text" title="First Name" errors={errors} />
                        <LabelledInput value={formData.lastname} onChange={onChange} name="lastname" type="text" title="Last Name" errors={errors} />
                        <LabelledInput value={formData.email} onChange={onChange} name="email" type="email" title="Email" errors={errors} />
                        <LabelledInput value={formData.password} onChange={onChange} name="password" type="password" title="Password" errors={errors} />

                        <Button onClick={signup} title="Signup"/>

                        <p className="font-medium text-center">Already have an account ? <a className="underline" onClick={() => navigate("/")} >Login</a></p>
                    </form>
                </div>
            </form>
        </>
    )
}