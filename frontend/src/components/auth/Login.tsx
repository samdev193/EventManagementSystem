import React from "react";
import axios from "axios";
import {useState} from "react";
import "../../assets/styles/Login.css"
const Login: React.FC = () => {
 const [email, setEmail] = useState<string>("");
 const [password, setPassword] = useState<string>("");
 const [token, setToken] = useState<string>("");
 const [login, setLogin] = useState<boolean>(false);
 const handleLogin = (e: React.FormEvent) => {
     e.preventDefault()
     const data: {email: string, inputPassword: string} = {email: email, inputPassword: password}
     axios.post("http://localhost:5000/api/login", data).then(response => {
         setLogin(response.data["login"])
     }).catch(error => {
         console.error("Error getting data:", error)
     })
 }

 const handle2FA = (e: React.FormEvent) => {
     e.preventDefault()
     const data: {token: string, email: string} = {token: token, email: email}
     axios.post("http://localhost:5000/api/verify2FA", data).then(response => {
         if (response.data["verified"]) {
             console.log("2FA successful")
         } else{
             console.log("2FA not successful")
         }
     }).catch(error => {
         console.error("Error getting data:", error)
     })
 }
 return (
        <div>
            <form onSubmit={handleLogin}>
                <h1>Login</h1>
                <label htmlFor={"email"}> Email </label> <br/>
                <input onChange={(e) => setEmail(e.target.value)}/> <br/>
                <label htmlFor={"password"}> Password </label> <br/>
                <input onChange={(e) => {setPassword(e.target.value)}}/> <br/>
                <button type={"submit"}>Submit</button>
            </form>
            {login && (
                <form onSubmit={handle2FA}>
                    <label>Enter Token</label>
                    <input onChange={ (e) => {setToken(e.target.value)}}/>
                    <button type={"submit"}>Submit</button>
                </form>
            )}
        </div>
    )
}
export default Login;