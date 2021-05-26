import React, { useContext, useState } from 'react'
import './login.css';
import imgLogin from '../../assets/img/study.jpg';
import logoKuepa from '../../assets/img/kuepa.png';
import { NavLink } from 'react-router-dom';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import AuthContext from '../../context/AuthContext';

export const Login = () => {

    const [user, setUser] = useState("");
    const [password, setPassword] = useState("");

    const { getLoggedIn, getLoggedUser } = useContext(AuthContext);
    const history = useHistory();

    const login = async (e) => {
        e.preventDefault();

        // get the looged user
        getLoggedUser(user);
        // saving the user at the local storage
        localStorage.setItem('userLogged', user);

        try {
            const loginData = {
               user,
               password
            } 
            // sending data to the server
            await axios.post("http://localhost:4000/api/users/login", loginData);
            // updating to know we are logged in
            await getLoggedIn();
            
            // sendint to login
            history.push("/class");

        } 
        catch (err) {
            console.error(err);
        }
    }

    return (
        <div className="loginContainer">
            <section className="Form my-4">
                <div className="container">
                    <div className="row g-0 rowLogin">
                        <div className="col-lg-5">
                            <img 
                                src={imgLogin}  
                                className="img-fluid" 
                                alt="Clases" 
                            />
                        </div>
                        <div className="col-lg-7 px-5 pt-5">
                            <img 
                                src={logoKuepa}  
                                className="img-fluid p-5" 
                                alt="Kuepa" 
                            />
                            <h2 className="d-flex justify-content-center">Ingresa a tu cuenta</h2>

                            <form onSubmit={login} className="d-flex flex-column justify-content-center">

                                <div className="form-row d-flex justify-content-center">
                                    <div className="col-lg-7">
                                        <input 
                                            type="text" 
                                            className="form-control my-3 p-1" 
                                            placeholder="usuario" 
                                            onChange={(e) => setUser(e.target.value)} 
                                            value={user} 
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="form-row d-flex justify-content-center">
                                    <div className="col-lg-7">
                                        <input 
                                            type="password" 
                                            className="form-control my-3 p-1" placeholder="contraseña" 
                                            onChange={(e) => setPassword(e.target.value)} 
                                            value={password} 
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="form-row d-flex justify-content-center">
                                    <div className="col-lg-7 d-flex justify-content-center">
                                        {
                                            password !== "" && user !== "" ?
                                            <button 
                                                type="submit" 
                                                className="btn btn-primary"
                                            >Ingresar</button> :
                                            ""
                                        }
                                        
                                    </div>
                                </div>

                                <div className="form-row d-flex justify-content-center">
                                    <div className="col-lg-7 d-flex justify-content-center">
                                        <NavLink exact to="/signup" className="mt-3 mb-5">
                                            Registrarse
                                        </NavLink>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </section> 
        </div>       
    )
}
