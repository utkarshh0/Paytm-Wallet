import axios from "axios";
import { useState, useEffect } from "react";
import Avatar from "react-avatar";
import Users from "../Components/Users";
import { REACT_APP_BACKEND } from "../baseUrl";
import loader from '../assets/loader.gif';

export default function Dashboard() {
    const [name, setName] = useState('');
    const [balance, setBalance] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const resp = await axios.get(`${REACT_APP_BACKEND}user/me/`, {
                    headers: {
                        'Authorization': `${localStorage.getItem('token')}`,
                    },
                });
                setName(resp.data.firstname);
                setBalance(Number(parseFloat(resp.data.balance).toFixed(2)));
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
            setLoading(false);
        };
        fetchData();
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('token');
        window.location.href = '/'; // Redirect to login page after logout
    };

    return (
        <>
            {loading ? (
                <div className="w-screen h-screen flex justify-center items-center">
                    <img src={loader} alt="Loading..." className="h-16 w-16" />
                </div>
            ) : (
                <div className="mx-4 md:mx-12 lg:mx-24 my-6 md:my-8 lg:my-12">
                    <div className="flex justify-between items-center">
                        <p className="text-3xl font-black">Payment App</p>
                        <div className="flex items-center space-x-4">
                            <div className="flex flex-row-reverse items-center gap-2">
                                <p className="font-medium text-lg">Hi, {name}</p>
                                <Avatar name={name} size="40" round={true} />
                            </div>
                            <button 
                                onClick={handleLogout} 
                                className="bg-black text-white px-4 py-2 rounded hover:bg-red-600"
                            >
                                Logout
                            </button>
                        </div>
                    </div>
                    <hr className="my-4" />
                    <p className="text-2xl font-bold">Your Balance: &nbsp; ${balance}</p>
                    <div className="my-7">
                        <Users />
                    </div>
                </div>
            )}
        </>
    );
}
