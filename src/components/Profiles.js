import React from 'react';
import { database } from './Database';

export default function Profiles({ Leaderboard }) {
    return (
        <div id="profile">
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Handle</th>
                        <th scope="col">Name</th>
                        <th scope="col">Registration No.</th>
                        <th scope="col">Rating</th>
                        <th scope="col">Max Rating</th>
                    </tr>
                </thead>
                <tbody>
                    {Item(Leaderboard)}
                </tbody>
            </table>
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
                    <tr key={index} className={rankColorClass}>
                        <th scope="row">{index + 1}</th>
                        <td>{value.handle}</td>
                        <td>{userdetails.name}</td>
                        <td>{userdetails.regNo}</td>
                        <td>{value.rating}</td>
                        <td>{value.maxRating}</td>
                    </tr>
                );
            })}
        </>
    );
}