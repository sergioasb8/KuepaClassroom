import React, { useContext, useEffect, useRef, useState } from 'react'
import videoChat from '../../assets/img/video.mp4';
import './class.css';
import AuthContext from '../../context/AuthContext';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import socket from '../../components/Socket';

export const Class = () => {

    const [message, setMessage] = useState("");
    const [chatMessages, setChatMessages] = useState([]);

    const { getLoggedIn, loggedUser, getLoggedUser } = useContext(AuthContext);
    const history = useHistory();

    // ${user} connected
    useEffect(() => {
        socket.emit('connected', loggedUser);
    }, [loggedUser])

    // calling all the messages
    useEffect(() => {
        socket.on('messages', newMessage => {
            setChatMessages([...chatMessages, newMessage]);
        });
        return () => {socket.off()};
    }, [chatMessages])

    // sending the message
    const sendMessage = async (e) => {

        e.preventDefault();

        const author = loggedUser;

        // saving the message at MongoDB
        try {
            const messageData = {
                message,
                author,
            };

            // sending data to the server
            await axios.post("http://localhost:4000/api/messages", messageData);
            socket.emit('messageSent', loggedUser, message);
            setMessage("");
        }
        catch (err) {
            console.error(err);
        }
    }

    // login message
    socket.on('messages', (data) => {
        console.log(data);
    });

    // scroll all the way down
    const divRef = useRef(null);
    useEffect(() => {
        divRef.current.scrollIntoView({ behavior: 'smooth'})
    });

    // logout
    const logout = async () => {

        // clean all the values
        getLoggedUser(null);
        localStorage.setItem('userLogged', null);

        try {
            // asking the server to logout
            await axios.get('http://localhost:4000/api/users/logout');
            // updating to know we logged out
            await getLoggedIn();
            // send socket message
            socket.emit('disconnected', loggedUser);
            // going to the login page
            history.push("/");
        }
        catch (err) {
            console.error(err);
        }
        
    }

    // play and stop the video
    const videoRef = useRef(null);
    const [playing, setPlaying] = useState(false);

    const handleVideo = () => {
        if(playing) {
            videoRef.current.pause();
            setPlaying(false);
        }
        else {
            videoRef.current.play();
            setPlaying(true);
        }
    }

    // checking if we have something saved at local storage, if we do, call it
    useEffect(() => {
        const rememberMe = localStorage.getItem('userLogged');
        if(rememberMe) {
            getLoggedUser(rememberMe);
        }
    });

    return (
        <div className="classContainer">
            <div className="videoContainer">
                <button 
                    className="btn btn-success"
                    onClick={handleVideo}
                >   
                    {
                        playing ? "detener la clase" : "Iniciar la clase" 
                    }
                    
                </button>
                <video 
                    src={videoChat} 
                    onClick={handleVideo}
                    loop
                    ref={videoRef}
                ></video>
            </div>

            <form className="chatContainer" onSubmit={sendMessage}>
                <div className="messagesContainer">
                    <div className="navbarClass">
                        <p>Hola {loggedUser}</p>
                        <button onClick={logout}>Cerrar sesion</button>
                    </div>
                    <div className="displayMessages">
                        {
                            chatMessages.map((e, i) => (
                                <div key={i}>
                                    <div className={e.loggedUser === loggedUser ? "R usernameMessage" : "L usernameMessage"}>{e.loggedUser}</div>
                                    <div className={e.loggedUser === loggedUser ? "R contentMessage" : "L contentMessage"}>{e.message}</div>
                                </div>
                            ))
                        }
                        <div ref={divRef}></div>
                    </div>
                </div>
                <div className="writeContainer">
                    <textarea 
                        cols="30" 
                        rows="10" 
                        value={message} 
                        onChange={(e) => setMessage(e.target.value)}
                    ></textarea>
                    <div className="buttonContainer">
                        <p>Se amable con todos</p>
                        {
                            message !== "" && (
                                <button type="submit">Enviar</button> 
                            )
                        }
                        
                    </div>
                </div>
            </form>
        </div>
    )
}
