import { auth, provider } from "../configs/firebase";
import { signInWithPopup } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const signIn = async () => {
    const data = await signInWithPopup(auth, provider);
    console.log(data);
    navigate("/");
  };
  return (
    <div>
      <h1>Login Page</h1>
      <button onClick={signIn}>Sign in with google</button>
    </div>
  );
};

export default Login;
