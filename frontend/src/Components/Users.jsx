import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";
import axios from "axios"
import Avatar from "react-avatar";
import Button from '../Components/Button'
import { REACT_APP_BACKEND } from "../baseUrl";

export default function Users(){
    const [users, setUsers] = useState([]);
    const [search, setSearch] = useState('');
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const getUser = async () => {
            try {
                const resp = await axios.get(`${REACT_APP_BACKEND}user/bulk?filter=${search}`, {
                    headers: {
                        'Authorization': `${localStorage.getItem('token')}`
                    }
                });
                setUsers(resp.data.user || []);
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        }
        getUser();
    }, [search]);

    function sendMoney(userId, firstname){
        navigate("/sendmoney", {
            state: { userId, firstname }
        });
    }

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>Error loading users: {error.message}</p>;
    }

    return (
        <>  
            <p className="text-2xl my-2 font-bold">Users</p>
            <input className="w-full border px-5 py-2 rounded-lg" type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search User" />
            {
                users.length > 0 ? (
                    users.map(user => (
                        <div className="m-2 w-full flex justify-between" key={user._id}>
                            <div>
                                <Avatar className="rounded-lg" name={user.firstname} size="35"/>
                                <p className="inline mx-2 font-medium" >{user.firstname}</p>
                            </div>
                            <div className="w-40">
                                <Button onClick={() => sendMoney(user._id, user.firstname)} title="Send Money" />
                            </div>
                        </div>
                    ))
                ) : (
                    <p>No users found</p>
                )
            }
        </>
    );
}
