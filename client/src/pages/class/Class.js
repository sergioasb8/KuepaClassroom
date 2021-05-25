import React, { useContext } from 'react'
// import videoChat from '../../assets/img/video.mp4';
import './class.css';
import AuthContext from '../../context/AuthContext';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

export const Class = () => {

    const { getLoggedIn } = useContext(AuthContext);

    const history = useHistory();

    const logout = async () => {
        try {
            // asking the server to logout
            await axios.get('http://localhost:4000/api/users/logout');
            // updating to know we logged out
            await getLoggedIn();
            // going to the login page
            history.push("/");
        }
        catch (err) {
            console.error(err);
        }
        
    }

    return (
        <div className="classContainer">
            <div className="chatContainer">
                <div className="messagesContainer">
                    <div className="navbarClass">
                        <p>Hola Sergio</p>
                        <button onClick={logout}>Cerrar sesion</button>
                    </div>
                    <div className="displayMessages">

                    </div>
                </div>
                <div className="writeContainer">
                    <textarea name="" id="" cols="30" rows="10"></textarea>
                    <div className="buttonContainer">
                        <p>Se amable con todos</p>
                        <button>Enviar</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
