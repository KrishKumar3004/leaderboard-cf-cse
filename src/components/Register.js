import React, { useState } from 'react';

const Register = ({ onRegister }) => {
    const [formData, setFormData] = useState({
        cf_handle: '',
        name: '',
        batch: '',
        regno: '',
        email: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleRegister = () => {
        onRegister(formData);
    };

    return (
        <div className='container' style={{ margin: 'auto' }}>
            <div className="container h-100">
                <div className="row justify-content-center h-100">
                    <div className="col-xxl-4 col-xl-5 col-lg-5 col-md-7 col-sm-9">
                        <div className="card shadow-lg custom-color">
                            <div className="card-body p-5">
                                <h1 className="fs-4 card-title fw-bold mb-4">Register</h1>
                                <form>
                                    <div className="mb-3">
                                        <label className="mb-2" htmlFor="name">Name</label>
                                        <input
                                            type="text" name="name" value={formData.name} onChange={handleChange}
                                            id="name"
                                            className="form-control"
                                            required
                                            autoFocus
                                        />
                                        <div className="invalid-feedback">Name is required</div>
                                    </div>

                                    <div className="mb-3">
                                        <label className="mb-2" htmlFor="regno">Registration No.</label>
                                        <input
                                            type="text" name="regno" value={formData.regno} onChange={handleChange}
                                            id="regno"
                                            className="form-control"
                                            required
                                        />
                                        <div className="invalid-feedback">Registration No. is required</div>
                                    </div>

                                    <div className="mb-3">
                                        <label className="mb-2" htmlFor="cf_handle">CF Handle</label>
                                        <input
                                            type="text" name="cf_handle" value={formData.cf_handle} onChange={handleChange}
                                            id="password"
                                            className="form-control"
                                            required
                                        />
                                        <div className="invalid-feedback">Password is required</div>
                                    </div>

                                    <div className="align-items-center d-flex">
                                        <button type="button" className="btn btn-light ms-auto" onClick={handleRegister}>
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