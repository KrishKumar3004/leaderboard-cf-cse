import React from 'react';
import { database } from './database';

export default function Profiles({ Leaderboard }) {
    return (
        <div id="profile">
            {Item(Leaderboard)}
        </div>
    );
}

function findUserDetails(handle) {
    const user = database.find((user) => user.codeforcesHandle === handle);
    return user ? { name: user.name, regNo: user.regNo } : { name: '', regNo: '' };
}

function Item(data) {
    return (
        <>
            {data.map((value, index) => {
                const userdetails = findUserDetails(value.handle);

                let rankColorClass = '';
                if (index === 0) {
                    rankColorClass = 'gold';
                } else if (index === 1) {
                    rankColorClass = 'silver';
                } else if (index === 2) {
                    rankColorClass = 'bronze';
                }

                return (
                    <div className={`flex ${rankColorClass}`} key={index}>
                        <div className="item">
                            <span className="rank-number">{index + 1}</span>
                        </div>
                        <div className="item">
                            <img src={value.avatar} alt="" />
                            <div className="info">
                                <h3 className="name text-dark">{value.handle}</h3>
                                <span>{value.rank}</span>
                            </div>
                        </div>
                        <div className="item">
                            <span>{userdetails.name}</span>
                        </div>
                        <div className="item">
                            <span>{userdetails.regNo}</span>
                        </div>
                        <div className="item">
                            <span>{value.rating}</span>
                        </div>
                        <div className="item">
                            <span>{value.maxRating}</span>
                        </div>
                    </div>
                );
            })}
        </>
    );
}