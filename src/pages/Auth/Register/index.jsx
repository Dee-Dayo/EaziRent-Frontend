 import image from "../../../assets/register.png"
import React, {useState} from "react";
import * as Yup from "yup";
import  axios from "axios";
import style from "../../../components/PageTemplate/index.module.css";
import {toast, ToastContainer} from "react-toastify";
import {Field, Form, Formik} from "formik";
import {Icon} from "@iconify/react";
import loadingLoop from "@iconify/icons-line-md/loading-loop";
import 'react-toastify/dist/ReactToastify.css';
import eyeOffIcon from "@iconify/icons-mdi/eye-off";
import eyeIcon from "@iconify/icons-mdi/eye";
import {useNavigate} from "react-router-dom";
import PageTemplate from "../../../components/PageTemplate";

const SignUp = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

   const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    };

   const validationSchema = Yup.object().shape({
        firstName: Yup.string()
            .matches(/^[a-zA-Z\s]+$/, 'Name should only contain letters and spaces')
            .required('First Name is required'),
        lastName: Yup.string()
            .matches(/^[a-zA-Z\s]+$/, 'Name should only contain letters and spaces')
            .required('Last Name is required'),
        email: Yup.string()
            .matches(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, 'Email address must be valid')
            .required('Email address is required'),
        password: Yup.string()
            .required('Password is required'),
   });

    const handleSubscribe = async (values, {resetForm}) => {

        setIsLoading(true);
        try {
            const payload = {
                firstName: values.firstName,
                lastName: values.lastName,
                email: values.email,
                password: values.password,
            };
            const response = await axios.post("the link here", payload); //link here
            if (response.data.success) {
                toast.success(`Hi ${values.firstName}, Welcome to EaziRent`, {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    })
                resetForm();
                setTimeout(() =>{
                    navigate("/login");
                }, 3000);
            } else {
                toast.error('Registration failed. Please try again', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    })
            }
        } catch (error) {
            const errorMessage = error.response.data  //dis is not complete yet
            toast.error(errorMessage, {
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
                      title={"Welcome!"}
                      description={"Sign up by entering the information below"}
        >
            <Formik
                initialValues={{firstName: '', lastName: '', email: '', password: ''}}
                validationSchema={validationSchema}
                onSubmit={handleSubscribe}
            >
                {({values, errors, touched, handleChange, handleBlur}) => (
                    <Form>
                        <div>
                            <Field
                                className={style.holder}
                                type="text"
                                name="firstName"
                                placeholder="Enter first name"
                                value={values.firstName}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                style={{borderColor: errors.firstName && touched.firstName ? 'darkred' : 'inherit',}}
                            />
                            {errors.firstName && touched.firstName &&
                                <div className={style.error}>{errors.firstName}</div>}
                        </div>

                        <div>
                            <Field
                                className={style.holder}
                                type="text"
                                name="lastName"
                                placeholder="Enter last name"
                                value={values.lastName}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                style={{borderColor: errors.lastName && touched.lastName ? 'darkred' : 'inherit',}}
                            />
                            {errors.lastName && touched.lastName &&
                                <div className={style.error}>{errors.lastName}</div>}
                        </div>

                        <div>
                            <Field
                                className={style.holder}
                                type="text"
                                name="email"
                                placeholder="Enter email address"
                                value={values.email}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                style={{borderColor: errors.email && touched.email ? 'darkred' : 'inherit',}}
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
                                style={{borderColor: errors.password && touched.password ? 'darkred' : 'inherit',}}
                            />
                            <button type="button" onClick={toggleShowPassword} className={style.toggleButton}>
                                <Icon width={24} height={24} icon={showPassword ? eyeOffIcon : eyeIcon}/>
                            </button>
                            {errors.password && touched.password &&
                                <div className={style.error}>{errors.password}</div>}
                        </div>

                        <div className={style.aboveButton}>
                            <p>Already have an account?</p>
                            <p><a href="/login" style={{color: "#1a2e35"}}>Login</a></p>
                        </div>

                        <div className={style.button}>
                            <button type="submit" className={style.btn}>
                                {isLoading ? (
                                    <div className="flex items-center justify-center">
                                        <Icon width={24} height={24} icon={loadingLoop}/>
                                    </div>
                                ) : (
                                    'Sign Up'
                                )}
                            </button>
                        </div>
                    </Form>
                )}
            </Formik>
            <ToastContainer/>
        </PageTemplate>
    );
};

export default SignUp;