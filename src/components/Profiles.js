import React from 'react';
import { database } from './Database';

const rankColorMap = {
    newbie: 'gray',
    pupil: 'green',
    specialist: 'cyan',
    expert: 'blue',
    candidateMaster: 'purple',
    master: 'yellow',
    internationalMaster: 'red',
};

export default function Profiles({ Leaderboard }) {
    return (
        <div id="profile" className="table-container">
            <table className="table table-transparent">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col" className="hide-on-mobile">
                            Handle
                        </th>
                        <th scope="col">Name</th>
                        <th scope="col" className="hide-on-mobile">
                            Registration No.
                        </th>
                        <th scope="col">Rating</th>
                        <th scope="col" >
                            Max
                        </th>
                    </tr>
                </thead>
                <tbody>{Item(Leaderboard)}</tbody>
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

                const rankColor = rankColorMap[value.rank] || '';

                const tdStyle = {
                    color: rankColor,
                };

                return (
                    <tr key={index}>
                        <th scope="row">{index + 1}</th>
                        <td className="hide-on-mobile" style={tdStyle}>
                            {value.handle}
                        </td>
                        <td>{userdetails.name}</td>
                        <td className="hide-on-mobile">{userdetails.regNo}</td>
                        <td>{value.rating}</td>
                        <td >{value.maxRating}</td>
                    </tr>
                );
            })}
        </>
    );
}