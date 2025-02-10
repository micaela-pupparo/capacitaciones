import { useSelector } from "react-redux"
import { RootState } from "../../../store/configureStore"

const useAuth = () => {
    return  useSelector((state: RootState) => state.users.logged) 
}

export default useAuth;