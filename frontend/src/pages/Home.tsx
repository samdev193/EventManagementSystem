import React from 'react';
import "../assets/styles/Home.css";
const Home: React.FC = () => {
    return (
        <div className={"HomePage"}>
            <div className={"top-part"}>
                <h1>All Events</h1>
                <button id={"search"}>Search Event</button>
            </div>
            <div className={"event-menu"}>
                <div className={"event"}>
                    <button className={"eventbtn"}>1</button>
                    <p>Active Event</p>
                </div>
                <div className={"event"}>
                    <button className={"eventbtn"}>2</button>
                    <p>Ended Event</p>
                </div>
                <div>
                    <p>Draft Event</p>
                </div>
            </div>
            <span id={"separating"}></span>
            <div className={"eventCard"}>
                <button id={"newEvent"}>Create New Event</button>
            </div>
        </div>
    )
}

export default Home;