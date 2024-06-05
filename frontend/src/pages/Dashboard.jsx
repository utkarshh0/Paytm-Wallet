import axios from "axios";
import { useState, useEffect } from "react"
import Avatar from "react-avatar"
import Users from "../Components/Users";
import { REACT_APP_BACKEND } from "../baseUrl";

export default function Dashboard(){

    const[name, setName] = useState('');
    const[balance, setBalance] = useState('');

    useEffect(() => {


        const fetchData = async () => {
            const resp = await axios.get(`${REACT_APP_BACKEND}user/me/`, {
                headers: {
                    'Authorization': `${localStorage.getItem('token')}`
                }
            })
            
            setName(resp.data.firstname)
            setBalance(Number(parseFloat(resp.data.balance).toFixed(2)));
        }
        fetchData();

    }, [balance])

    return(
        <>
        <div className="m-5">
            <div className="flex justify-between">
                <p className="text-3xl font-black">Payment App</p>
                <div>
                    <p className="inline m-3">Hi, {name}</p>
                    <Avatar name={name} size="40" />
                </div>
            </div>
            <br />
            <hr />
            <p className="text-2xl font-bold my-4">Your Balance &nbsp; &nbsp; {balance}</p>

            <div className="my-7">
                <Users />
            </div>
        </div>
        </>
    )
}