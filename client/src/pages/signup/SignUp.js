import React, { useContext, useState } from 'react';
import axios from 'axios';
import { NavLink } from 'react-router-dom';
import imgSignUp from '../../assets/img/study.jpg';
import logoKuepa from '../../assets/img/kuepa.png';
import AuthContext from '../../context/AuthContext';
import { useHistory } from 'react-router-dom';

export const SignUp = () => {

    const [name, setName] = useState("");
    const [lastName, setLastName] = useState("");
    const [mail, setMail] = useState("");
    const [user, setUser] = useState("");
    const [password, setPassword] = useState("");
    const [passwordVerify, setPasswordVerify] = useState("");

    const { getLoggedIn } = useContext(AuthContext);

    const history = useHistory();

    const register = async (e) => {
        e.preventDefault();
        try {
            const registerData = {
                name, 
                lastName,
                mail,
                user,
                password,
                passwordVerify
            };

            // sending data to the server
            await axios.post("http://localhost:4000/api/users", registerData);
            // updating to know we are logged in
            await getLoggedIn();
            // sendint to login
            history.push("/");
        }
        catch (err) {
            console.error(err);
        }
    }

    return (
        <div className="SignUpContainer">
        <section className="Form my-4">
            <div className="container">
                <div className="row g-0 rowLogin">
                    <div className="col-lg-5">
                        <img src={imgSignUp}  className="img-fluid" alt="Clases" />
                    </div>
                    <div className="col-lg-7 px-5 pt-2">
                        <img src={logoKuepa}  className="img-fluid p-5" alt="Kuepa" />
                        <h2 className="d-flex justify-content-center">Ingresa a tu cuenta</h2>

                        <form onSubmit={register} className="d-flex flex-column justify-content-center">

                            <div className="form-row d-flex justify-content-center">
                                <div className="col-lg-7">
                                    <input type="text" className="form-control my-2 p-1" placeholder="nombre" onChange={(e) => setName(e.target.value)} value={name} required/>
                                </div>
                            </div>

                            <div className="form-row d-flex justify-content-center">
                                <div className="col-lg-7">
                                    <input type="text" className="form-control my-2 p-1" placeholder="apellidos" onChange={(e) => setLastName(e.target.value)} value={lastName} required/>
                                </div>
                            </div>

                            <div className="form-row d-flex justify-content-center">
                                <div className="col-lg-7">
                                    <input type="text" className="form-control my-2 p-1" placeholder="correo" onChange={(e) => setMail(e.target.value)} value={mail} required/>
                                </div>
                            </div>

                            <div className="form-row d-flex justify-content-center">
                                <div className="col-lg-7">
                                    <input type="text" className="form-control my-2 p-1" placeholder="usuario" onChange={(e) => setUser(e.target.value)} value={user} required/>
                                </div>
                            </div>

                            <div className="form-row d-flex justify-content-center">
                                <div className="col-lg-7">
                                    <input type="password" className="form-control my-2 p-1" placeholder="contraseña" onChange={(e) => setPassword(e.target.value)} value={password} required />
                                </div>
                            </div>

                            <div className="form-row d-flex justify-content-center">
                                <div className="col-lg-7">
                                    <input type="password" className="form-control my-2 p-1" placeholder="Repite la contraseña" onChange={(e) => setPasswordVerify(e.target.value)} value={passwordVerify} required />
                                </div>
                            </div>

                            <div className="form-row d-flex justify-content-center">
                                <div className="col-lg-7 d-flex justify-content-center">
                                    <button type="submit" className="btn btn-primary">Registrarse</button>
                                </div>
                            </div>
                            <div className="form-row d-flex justify-content-center">
                                <div className="col-lg-7 d-flex justify-content-center">
                                    <NavLink exact to="/" className="mt-1 mb-3">
                                        ¿tienes una cuenta? Ingresa
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
