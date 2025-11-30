import { useState, useEffect } from "react"
import { Album } from "lucide-react"
import { Link } from "react-router-dom"
import { useAuth } from "../../context/AuthContext"
import profileDropDown from "./ProfileDropdown"

const DashboardLayout = ({children}) => {
  const {user, logout} = useAuth();
  const [profileDropDownOpen, setProfileDropDownOpen] = useState(false);

  useEffect(() => {
    const handleClickOutside = () => {
      if(profileDropDownOpen){
        setProfileDropDownOpen(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return() => document.removeEventListener("click", handleClickOutside);
  }, [profileDropDownOpen])

  return (
    <div className="">
      <div className="">
        
      </div>
      
    </div>
  )
}

export default DashboardLayout
