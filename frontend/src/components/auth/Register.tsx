import React, {useState} from "react";
import axios from "axios"
import "../../assets/styles/Register.css"
const Register: React.FC = () => {
    const [name, setName] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [qrCodeData, setQRCodeData] = useState<string>("");
    const [token, setToken] = useState<string>("")

    const handleRegister = (e: React.FormEvent) => {
        e.preventDefault()
        try {
            const data: { name: string, password: string, email: string,} = {
                name: name,
                password: password,
                email: email,

            }
            console.log(data)
            axios.post("http://localhost:5000/api/register", data).then(
                (response) => {
                    alert(response.data["message"])
                    setQRCodeData(response.data["data"]["qrCode"])
                }
            ).catch((error) => {
                alert(error.response.data["message"])
                console.log(error)
            })
        } catch(error) {
            alert("Error during registration. Try QR Code again.")
        }
    }

    const handleVerify2FA = (e: React.FormEvent) => {
        e.preventDefault()
        try {
            const data: {token: string, email: string} = {token:token, email:email}
            axios.post("http://localhost:5000/api/verify2FA", data).then(
                (response) => {
                    if (response.data["verified"]) {
                        alert("2FA setup successful!")
                    } else {
                        alert("Invalid Token. Please try again.")
                    }
                }
            ).catch((error) => {

            })
        } catch(error) {
            console.log("Error verifying 2FA:", error);
        }
    }
    return (
        <div className={"Register"}>
            <h1>Register</h1>
            <form method={"post"} onSubmit={handleRegister}>
                <label htmlFor={"name"}>Name</label> <br/>
                <input id={"name"} type={"text"} onChange={(e) => {setName(e.target.value)}} required/> <br/>
                <label htmlFor={"email"}>Email</label> <br/>
                <input id={"email"} type={"text"} onChange={(e) => {setEmail(e.target.value)}} required/> <br/>
                <label htmlFor={"password"}>Password</label> <br />
                <input id={"password"} type={"text"} onChange={(e) => {setPassword(e.target.value)}} required/> <br/> <br/>
                <button type={"submit"}>Submit</button>
            </form>
            {qrCodeData && (
                <div>
                    <div>
                        <h2>Scan the QR Code</h2>
                        <img id={"qrCode"} src={qrCodeData} alt={"QR Code"}/>
                    </div>
                    <form method={"post"} onSubmit={handleVerify2FA}>
                        <label htmlFor={"token"}>Enter Token</label> <br/>
                        <input id={"token"} type={"text"} onChange={(e) => {setToken(e.target.value)}}/>
                        <button type={"submit"}>Submit</button>
                    </form>
                </div>
            )}
        </div>
    )
}
export default Register