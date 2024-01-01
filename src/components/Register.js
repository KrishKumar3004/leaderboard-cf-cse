import React, { useState, useEffect } from 'react';
import { InfinitySpin } from 'react-loader-spinner';
import {
    getAuth,
    createUserWithEmailAndPassword,
    sendEmailVerification,
} from "firebase/auth";
import { app, db } from "../firebase";
import { ref, set, update } from "firebase/database";

const Register = () => {
    const auth = getAuth(app);
    const [formData, setFormData] = useState({
        cf_handle: '',
        name: '',
        batch: '',
        regno: '',
        email: '',
    });

    const [loading, setLoading] = useState(false);
    const [validationResult, setValidationResult] = useState(null);
    const [verificationCooldown, setVerificationCooldown] = useState(false);

    useEffect(() => {
        const updateUserEmailVerificationStatus = async () => {
            try {
                const user = auth.currentUser;
                console.log(user);
                if (user && user.emailVerified) {
                    const userRef = ref(db, `users/${user.uid}`);
                    await update(userRef, {
                        emailVerified: true,
                    });
                }
            } catch (error) {
                console.error('Error updating email verification status:', error);
            }
        };

        updateUserEmailVerificationStatus();
    }, []);


    const onRegister = async (formData) => {
        try {
            setLoading(true);

            const email = `${formData.regno.toLowerCase()}@nitjsr.ac.in`;
            const batch = formData.regno.substring(0, 4);

            formData = {
                ...formData,
                email,
                batch,
            };

            const existingUser = auth.currentUser;
            if (existingUser && !existingUser.emailVerified) {
                // If email exists and is not verified, send email verification again
                const userRef = ref(db, `users/${existingUser.uid}`);
                console.log("this is an existing user!")
                await sendEmailVerification(auth.currentUser);
                setValidationResult('Email verification link sent again. Please verify your email.');
                return;
            }

            // firebase registration--
            const userCredential = await createUserWithEmailAndPassword(auth, email, formData.regno);
            const user = userCredential.user;
            const userRef = ref(db, `users/${user.uid}`);
            await set(userRef, {
                cf_handle: formData.cf_handle,
                name: formData.name,
                batch: formData.batch,
                regno: formData.regno,
                email: formData.email,
                uid: user.uid,
                emailVerified: false,
            });
            sendEmailVerification(auth.currentUser);
            setValidationResult('Registration successful. Please verify your email.');

        } catch (error) {
            console.error('Some error occurerred :', error);
            setValidationResult('Registration failed.');
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));

        setValidationResult(null);
    };

    const handleRegister = async () => {
        try {
            const response = await fetch(`https://codeforces.com/api/user.info?handles=${formData.cf_handle}`);
            const data = await response.json();

            if (data.status !== 'OK') {
                setValidationResult("Not a valid codeforces handle");
                return;
            }
        } catch (error) {
            console.error('Error during handle validation:', error);
            return;
        }

        if (formData.regno.length !== 11) {
            setValidationResult('Not a valid registration number');
            return;
        }

        const regNoRegex = /^202\dUGCS\d{3}$/;
        if (!regNoRegex.test(formData.regno)) {
            setValidationResult('Not a valid registration number');
            return;
        }
        setValidationResult(null);
        onRegister(formData);
    };

    const sendVerificationEmail = async () => {
        try {
            if (verificationCooldown) {
                setValidationResult('Verification email already sent. Please wait.');
                return;
            }

            setVerificationCooldown(true);
            setValidationResult('Email verification link sent. Please check your email.');
            await sendEmailVerification(auth.currentUser);
        } catch (error) {
            console.error('Error sending verification email:', error);

        } finally {
            setTimeout(() => {
                setVerificationCooldown(false);
            }, 60000); 
        }
    };
    return (
        <div className="container my-auto">
            {loading && (
                <div className="loader">
                    <InfinitySpin
                        visible={true}
                        width="200"
                        color="#fbfbfe"
                        ariaLabel="infinity-spin-loading"
                    />
                </div>
            )}

            {validationResult && (
                <div className="row justify-content-center">
                    <div
                        className={`alert ${validationResult.includes('successful') ? 'alert-success' : 'alert-danger'
                            } d-flex justify-content-between align-items-center col-xxl-4 col-xl-5 col-lg-5 col-md-7 col-sm-9`}
                        role="alert"
                    >
                        <span>{validationResult}</span>
                        <button type="button" className="btn-close" aria-label="Close" onClick={() => setValidationResult(null)}></button>
                    </div>
                </div>
            )}

            <div className="container h-100">
                <div className="row justify-content-center h-100">
                    <div className="col-xxl-4 col-xl-5 col-lg-5 col-md-7 col-sm-9">
                        <div className="card shadow-lg custom-color">
                            <div className="card-body p-5">
                                <h1 className="fs-4 card-title fw-bold mb-4">Register</h1>
                                <form>
                                    <div className="mb-3">
                                        <label className="mb-2" htmlFor="name">
                                            Name
                                        </label>
                                        <input
                                            type="text"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            id="name"
                                            className="form-control"
                                            required
                                            autoFocus
                                        />
                                        <div className="invalid-feedback">Name is required</div>
                                    </div>

                                    <div className="mb-3">
                                        <label className="mb-2" htmlFor="regno">
                                            Registration No.
                                        </label>
                                        <input
                                            type="text"
                                            name="regno"
                                            value={formData.regno}
                                            onChange={handleChange}
                                            id="regno"
                                            className="form-control"
                                            required
                                        />
                                        <div className="invalid-feedback">Registration No. is required</div>
                                    </div>

                                    <div className="mb-3">
                                        <label className="mb-2" htmlFor="cf_handle">
                                            CF Handle
                                        </label>
                                        <input
                                            type="text"
                                            name="cf_handle"
                                            value={formData.cf_handle}
                                            onChange={handleChange}
                                            id="password"
                                            className="form-control"
                                            required
                                        />
                                        <div className="invalid-feedback">Password is required</div>
                                    </div>

                                    <div className="align-items-center d-flex">
                                        <button
                                            type="button"
                                            className="btn btn-light mx-auto"
                                            onClick={handleRegister}
                                        >
                                            Register
                                        </button>
                                    </div>
                                    <div className="align-items-center d-flex">
                                    {auth.currentUser && !auth.currentUser.emailVerified && (
                                        <button type="button" className="btn btn-light mx-auto mt-1" onClick= {sendVerificationEmail}>
                                            Resend Verification Email
                                        </button>
                                    )}
                                    </div>
                                </form>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;