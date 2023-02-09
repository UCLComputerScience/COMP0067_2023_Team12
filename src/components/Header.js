import React from 'react'
import '../Admin.css';
import MyComponent from './MyComponent';


const Header = () => {
    return (
        <nav>
            <img className='ibm_logo' src = "/images/IBM_logo.png"/>
                <p>Create Projects</p>
                <p>Edit Projects</p>
                <p>Create Work Book</p>
                <p>Log Out</p>
        </nav>
    )
}


export default Header