import React from 'react';

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

            return (
                <tr key={index}>
                    <th scope="row">{index + 1}</th>
                    <td className="hide-on-mobile">
                        <a href={`https://codeforces.com/profile/${value.handle}`}>{value.handle}</a>
                    </td>
                    <td>
                        <a href={`https://codeforces.com/profile/${value.handle}`}>{value.name}</a>
                    </td>
                    <td className="hide-on-mobile">{value.regno}</td>
                    <td>{value.rating}</td>
                    <td>{value.maxRating}</td>
                </tr>
            );
        })}
    </>
);

export default Profiles;