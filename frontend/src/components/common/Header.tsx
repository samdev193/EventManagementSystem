import React from "react";
import "../../assets/styles/Header.css"
const Header: React.FC = () => {
    return (
        <div className={"Header"}>
            <div className={"user"}>
                <p>Name</p>
                <p id={"picture"}>Im</p>
            </div>
        </div>
    )
}
export default Header;