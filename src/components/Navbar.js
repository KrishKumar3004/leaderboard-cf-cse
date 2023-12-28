import React, { useState } from 'react';
import RegisterModal from './RegisterModal';

const MyNavbar = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleOpenModal = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    const handleRegister = async (formData) => {
        try {
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
                handleCloseModal();
            } else {
                const errorData = await response.json();
                console.error('API error:', errorData);
            }
        } catch (error) {
            console.error('Error during API call:', error);
        }
    };

    return (
        <nav className="navbar navbar-expand-lg bg-body-tertiary navbar-transparent">
            <div className="container-fluid">
                <a className="navbar-brand" href="https://leaderboard-cf-cse.vercel.app/">

                    Leaderboard</a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <a className="nav-link" href="https://github.com/KrishKumar3004/leaderboard-cf-cse" target="_blank">Repository</a>
                        </li>
                    </ul>
                    <button onClick={handleOpenModal}>Open Register Modal</button>
                    <RegisterModal
                        isOpen={isModalOpen}
                        onClose={handleCloseModal}
                        onRegister={handleRegister}
                    />
                </div>
            </div>
        </nav>
    );
};

export default MyNavbar;