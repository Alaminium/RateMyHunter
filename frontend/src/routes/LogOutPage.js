import { useSelector, useDispatch } from "react-redux";
import { useLogoutMutation } from "../slices/usersApiSlice";
import { logout } from "../slices/authSlice";
import { useNavigate } from "react-router-dom";

const LogOutPage = () =>{
    const { userInfo } = useSelector((state) => state.auth);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [logoutApiCall] = useLogoutMutation();

    const logoutHandler = async () => {
        try {
        await logoutApiCall().unwrap();
        dispatch(logout());
        navigate('/login');
        } catch (err) {
        console.error(err);
        }
    };
    return(
        <div>
            {userInfo ? (<div> <h1>{userInfo.name}</h1> <button onClick={logoutHandler}>Logout</button> </div>) : (<div></div>)}
        </div>
    )
}

export default LogOutPage;