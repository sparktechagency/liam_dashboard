import { Outlet } from "react-router-dom"

const AuthLayout = () => {
  return (
    <>
       <div className="h-screen bg-barColor">
         <Outlet/>
       </div>
    </>
  )
}

export default AuthLayout