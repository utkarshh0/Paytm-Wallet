import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom"
import Avatar from "react-avatar";
import Button from '../Components/Button'
import axios from "axios";
import { REACT_APP_BACKEND } from "../baseUrl";
import loader from '../assets/loader.gif'


export default function SendMoney(){

    const[amount, setAmount] = useState('');
    const [loading, setLoading] = useState(false);
    const location = useLocation();
    const { userId, firstname } = location.state;
    const navigate = useNavigate();
    const sendMoney = async (userId, amount) => {
        
        setLoading(true)
        try{
            await axios.post(`${REACT_APP_BACKEND}account/transfer/`, {
                amount: amount,
                to: userId
            }, {
                headers: {
                    'Authorization': `${localStorage.getItem('token')}`
                }
        })
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
            <div className="w-screen h-screen my-4 flex justify-center items-center">
                <div className="p-4 bg-slate-400 rounded-lg flex flex-col justify-around">
                    <div>
                        <p className="m-4 text-4xl font-semibold text-center">Send Money</p>
                    </div>

                   <div className="">
                        <Avatar className="rounded-full" name={firstname}  size="45"/>
                        <p className="inline mx-2 font-semibold">{firstname}</p>
                        
                        <p className="text-sm">Amount (Rs.)</p>
                        <input className="p-2 rounded-lg w-full my-1" type="number" value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="Enter Amount.."/>
                        <Button onClick={() => sendMoney(userId, amount)} title="Initiate Transfer"/>
                   </div>
                </div>
            </div>
           

        </>
    )
}