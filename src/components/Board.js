import React, { useState, useEffect } from 'react';
import Profiles from './Profiles';
import { InfinitySpin } from 'react-loader-spinner'


const Board = () => {
    const [usersData, setUsersData] = useState([]);
    const [sortingCriteria, setSortingCriteria] = useState('max-rating');
    const [selectedYear, setSelectedYear] = useState('ALL');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchInstituteData = async () => {
            try {
                const apiUrl = 'https://pcon-leaderboard-backend.vercel.app/api/getCfHandles';
                const response = await fetch(apiUrl);

                if (response.ok) {
                    const data = await response.json();
                    return data;
                } else {
                    console.error('Failed to fetch data');
                    return [];
                }
            } catch (error) {
                console.error('Error during API call:', error);
                return [];
            }
        };

        const fetchCodeforcesData = async () => {
            try {
                const res = await fetchInstituteData();
                const handles = res.map(user => user.cf_handle).join(';');

                const response = await fetch(`https://codeforces.com/api/user.info?handles=${handles}`);
                const data = await response.json();

                if (data.status === 'OK') {
                    const mergedData = data.result.map(entry => {
                        const matchingResEntry = res.find(resEntry => resEntry.cf_handle === entry.handle);
                        if (matchingResEntry) {
                            return { ...entry, ...matchingResEntry };
                        }
                        return entry;
                    });
                    setUsersData(mergedData);
                } else {
                    console.error('Error fetching user data:', data.comment || 'Unknown error');
                }
            } catch (error) {
                console.error('Error fetching user data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchCodeforcesData();
    }, []);

    const handleSortingChange = (e) => {
        setSortingCriteria(e.target.value);
    };

    const handleYearChange = (e) => {
        setSelectedYear(e.target.value);
    };

    const filterAndSort = (data) => {
        const filteredData = data.filter((user => selectedYear === 'ALL' || selectedYear == user.batch));
        return filteredData
            ? filteredData
                .sort((a, b) => {
                    if (sortingCriteria === 'curr-rating') {
                        return b.rating - a.rating;
                    } else if (sortingCriteria === 'max-rating') {
                        return b.maxRating - a.maxRating;
                    }
                    return 0;
                })
            : [];
    };

    return (
        <div className="board">
            <div className="select-container">
                <select name="sort" id="sort" onChange={handleSortingChange} value={sortingCriteria}>
                    <option value="curr-rating">Current Rating</option>
                    <option value="max-rating">Max Rating</option>
                </select>

                <select name="year" id="year" onChange={handleYearChange} value={selectedYear}>
                    <option value="ALL">All</option>
                    <option value="2021">2021</option>
                    <option value="2022">2022</option>
                    <option value="2023">2023</option>
                </select>
            </div>

            {loading ? (
                <div className="loader">
                    <InfinitySpin

                        visible={true}
                        width="200"
                        color="#fbfbfe"
                        ariaLabel="infinity-spin-loading"
                    />
                </div>
            ) : (
                <Profiles usersData={filterAndSort(usersData)}></Profiles>
            )}
        </div>
    );
};

export default Board;