import React from 'react'
import './login.css';
import imgLogin from '../../assets/img/study.jpg';
import logoKuepa from '../../assets/img/kuepa.png';

export const Login = () => {
    return (
        <div className="loginContainer">
            <section className="Form my-4">
                <div className="container">
                    <div className="row g-0">
                        <div className="col-lg-5">
                            <img src={imgLogin}  className="img-fluid" alt="Clases" />
                        </div>
                        <div className="col-lg-7 px-5 pt-5">
                            <img src={logoKuepa}  className="img-fluid p-5" alt="Kuepa" />
                            <h2 className="d-flex justify-content-center">Ingresa a tu cuenta</h2>
                            <form action="" className="d-flex flex-column justify-content-center">
                                <div className="form-row d-flex justify-content-center">
                                    <div className="col-lg-7">
                                        <input type="text" className="form-control my-3 p-1" placeholder="usuario" />
                                    </div>
                                </div>
                                <div className="form-row d-flex justify-content-center">
                                    <div className="col-lg-7">
                                        <input type="password" className="form-control my-3 p-1" placeholder="contraseña" 
                                        />
                                    </div>
                                </div>
                                <div className="form-row d-flex justify-content-center">
                                    <div className="col-lg-7 d-flex justify-content-center">
                                        <button type="button" className="btn btn-primary">Ingresar</button>
                                    </div>
                                </div>
                                <div className="form-row d-flex justify-content-center">
                                    <div className="col-lg-7 d-flex justify-content-center">
                                        <a href="" className="mt-3">Registrarse</a>
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
