import React, { useState } from 'react';
import { InfinitySpin } from 'react-loader-spinner';

const Register = () => {
    const [formData, setFormData] = useState({
        cf_handle: '',
        name: '',
        batch: '',
        regno: '',
        email: '',
    });

    const [loading, setLoading] = useState(false);
    const [validationResult, setValidationResult] = useState(null);

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

            const apiUrl = 'https://pcon-leaderboard-backend.vercel.app/api/registerCfHandle';
            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                const data = await response.json();
                console.log('API response:', data);
                setValidationResult('Registration successful');

                setFormData({
                    cf_handle: '',
                    name: '',
                    batch: '',
                    regno: '',
                    email: '',
                });
            } else {
                const errorData = await response.json();
                console.error('API error:', errorData);
                setValidationResult('Registration failed.');
            }
        } catch (error) {
            console.error('Error during API call:', error);
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
                                            className="btn btn-light ms-auto"
                                            onClick={handleRegister}
                                        >
                                            Register
                                        </button>
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