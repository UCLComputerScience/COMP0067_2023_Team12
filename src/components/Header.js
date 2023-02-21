import React from 'react'
import '../Admin_Header.css';
import "@fontsource/ibm-plex-sans";


const Header = () => {
    return (
        <nav>
            <img className='ibm_logo' src = "/images/IBM_logo.png"/>
                <ul className = "menu">
                    <li>Create Projects</li>
                    <li>Edit Projects</li>
                    <li>Create Work Book</li>
                    <li>Log out</li>
                </ul>
        </nav>
    )
}


export default Header