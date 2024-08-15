import React, { useState } from "react";
import * as Yup from "yup";
import axios from "axios";
import style from "../../../components/PageTemplate/index.module.css";
import { toast, ToastContainer } from "react-toastify";
import { Field, Form, Formik } from "formik";
import { Icon } from "@iconify/react";
import loadingLoop from "@iconify/icons-line-md/loading-loop";
import 'react-toastify/dist/ReactToastify.css';
import { Link, useNavigate } from "react-router-dom";
import PageTemplate from "../../../components/PageTemplate";
import image from "../../../assets/login.jpg";
import Cookies from 'js-cookie';

const Login = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    const validationSchema = Yup.object().shape({
        email: Yup.string()
            .matches(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, 'Email address must be valid')
            .required('Email address is required'),
        password: Yup.string()
            .required('Password is required'),
    });

    const handleLogin = async (values, { resetForm }) => {
        setIsLoading(true);
        try {
            const payload = {
                email: values.email,
                password: values.password
            };

            const endpoint = "https://eazirent-latest.onrender.com/api/v1/auth/login";
            const response = await axios.post(endpoint, payload);

            if (response.data.status) {
                const token = response.data.data.token;
                Cookies.set('EasyRentAuthToken', token, { expires: 1 });

                toast.success(`Welcome back, ${response.data.data.firstName.toUpperCase()}`, {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
                resetForm();
                console.log('User data being sent to Dashboard:', response.data.data);
                setTimeout(() => {
                    navigate("/dashboard", { state: { user: response.data.data } });
                    }, 3000);
            } else {
                toast.error('Login failed. Please check your credentials and try again', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            }
        } catch (error) {
            const errorMessage = error.response.data.message || 'An error occurred';
            toast.error("Login failed: " + errorMessage, {
                position: 'top-right',
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <PageTemplate image={image}
                      title={"Welcome Back!"}
                      description={"Log in by entering your credentials below"}
        >
            <Formik
                initialValues={{ email: '', password: '' }}
                validationSchema={validationSchema}
                onSubmit={handleLogin}
            >
                {({ values, errors, touched, handleChange, handleBlur }) => (
                    <Form>
                        <div>
                            <Field
                                className={style.holder}
                                type="text"
                                name="email"
                                placeholder="Enter email address"
                                value={values.email}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                style={{ borderColor: errors.email && touched.email ? 'darkred' : 'inherit' }}
                            />
                            {errors.email && touched.email &&
                                <div className={style.error}>{errors.email}</div>}
                        </div>

                        <div>
                            <Field
                                className={style.holder}
                                type={showPassword ? "text" : "password"}
                                name="password"
                                placeholder="Enter password"
                                value={values.password}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                style={{ borderColor: errors.password && touched.password ? 'darkred' : 'inherit' }}
                            />
                            {errors.password && touched.password &&
                                <div className={style.error}>{errors.password}</div>}
                        </div>

                        <div className={style.aboveButton}>
                            <p>Don't have an account?</p>
                            <p><Link to="/signup" style={{ color: "#1a2e35" }}>Sign Up</Link></p>
                        </div>

                        <div className={style.button}>
                            <button type="submit" className={style.btn}>
                                {isLoading ? (
                                    <div className="flex items-center justify-center">
                                        <Icon width={24} height={24} icon={loadingLoop} />
                                    </div>
                                ) : (
                                    'Log In'
                                )}
                            </button>
                        </div>
                    </Form>
                )}
            </Formik>
            <ToastContainer />
        </PageTemplate>
    );
};

export default Login;
