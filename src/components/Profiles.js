import React from 'react';

const rankColorMap = {
    newbie: 'gray',
    pupil: 'green',
    specialist: 'cyan',
    expert: 'blue',
    candidateMaster: 'purple',
    master: 'yellow',
    internationalMaster: 'red',
};

const Profiles = ({ usersData }) => {
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
                        <th scope="col">
                            Max
                        </th>
                    </tr>
                </thead>
                <tbody>{Item(usersData)}</tbody>
            </table>
        </div>
    );
};

const Item = (data) => (
    <>
        {data.map((value, index) => {

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
                    {/* <a href='https://codeforces.com/profile/mhtkrag'> */}
                    <td>{value.name}</td>
                    {/* </a> */}
                    <td className="hide-on-mobile">{value.regno}</td>
                    <td>{value.rating}</td>
                    <td>{value.maxRating}</td>
                </tr>
            );
        })}
    </>
);

export default Profiles;