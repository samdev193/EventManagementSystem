
import React, {JSX} from 'react';
import {Link} from "react-router-dom";
import  "../../assets/styles/Sidebar.css";
import accountIcon from "../../assets/images/account.png";
import eventIcon from "../../assets/images/All Event Icon.png"
import analyticsIcon from "../../assets/images/analytics.png"
import dashboardIcon from "../../assets/images/dashboard.png"
import billingIcon from "../../assets/images/wallet.png"
const Sidebar: React.FC = () => {
    let icons: string[][] = [ [dashboardIcon, "Dashboard"], [eventIcon, "All events"],
        [analyticsIcon, "Analytics"], [accountIcon, "Account"], [billingIcon, "Billing"]]
    const displayHomeMenu = (): JSX.Element[]  => {
        let images: JSX.Element[] = []
        for (let i:number = 0; i < 3; i++) {
            images.push(<div className={"sub-menu"}>
                <img src={icons[i][0]}/>
                <p>{icons[i][1]}</p>
            </div>)
        }
        return images
    }

    const displaySettingMenu = (): JSX.Element[] => {
        let images: JSX.Element[] = []
        for (let i:number = 3; i < 5; i++) {
            images.push(<div className={"sub-menu"}>
                <img src={icons[i][0]}/>
                <p>{icons[i][1]}</p>
            </div>)
        }
        return images
    }

    return (
        <div className={"Sidebar"}>
            <h3>Event Manage</h3>
            <div id={"menu"}>
                <p className={"subheading"}>Home</p>
                {displayHomeMenu()}
            </div>
            <div>
                <p className={"subheading"}>Setting</p>
                {displaySettingMenu()}
            </div>

            <p id={"register"}> <Link to={"/register"}>Register</Link></p>
            <p id={"Login"}><Link to={"/login"}>Log In </Link></p>
        </div>
    )
}
export default Sidebar;