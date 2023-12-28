import React, { useState } from 'react';

const RegisterModal = ({ isOpen, onClose, onRegister }) => {
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
        <div className={`modal ${isOpen ? 'show' : 'hide'}`}>
            <div className="modal-content">
                <span className="close" onClick={onClose}>
                    &times;
                </span>
                <h2>Register</h2>
                <form>

                    <label>CF Handle:</label>
                    <input type="text" name="cf_handle" value={formData.cf_handle} onChange={handleChange} />

                    <label>Name:</label>
                    <input type="text" name="name" value={formData.name} onChange={handleChange} />

                    <label>Registration Number:</label>
                    <input type="text" name="regno" value={formData.regno} onChange={handleChange} />

                    <button type="button" onClick={handleRegister}>
                        Register
                    </button>

                </form>
            </div>
        </div>
    );
};

export default RegisterModal;