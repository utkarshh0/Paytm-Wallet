import { BrowserRouter, Routes, Route } from "react-router-dom"
import Signup from './pages/Signup'
import Signin from './pages/Signin'
import Dashboard from './pages/Dashboard'
import SendMoney from './pages/SendMoney'
export default function App(){

  return (
    <>

      <BrowserRouter>
        <Routes>

          <Route path={"/"} element={<Signin />}/>
          <Route path={"/signup"} element={<Signup />}/>
          <Route path={"/dashboard"} element={<Dashboard />}/>
          <Route path={"/sendmoney"} element={<SendMoney />}/>
        </Routes>
      </BrowserRouter>

    </>
  )
}