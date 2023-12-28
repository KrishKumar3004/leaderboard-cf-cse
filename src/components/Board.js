import React, { useState, useEffect } from 'react';
import Profiles from './Profiles';
import { database } from './Database';


export default function Board() {
    const [userData, setUserData] = useState({});
    const [sortingCriteria, setSortingCriteria] = useState('curr-rating');
    const [selectedYear, setSelectedYear] = useState('ALL');

    const handles = 'KrishKrosh;mhtkrag;shivansh_232;NotShivam_382;Yash_968;tarun_k456;console.shivam';
    function findUserDetails(handle) {
        const user = database.find((user) => user.codeforcesHandle === handle);
        return user ? { name: user.name, regNo: user.regNo } : { name: '', regNo: '' };
    }
    useEffect(() => {
        const fetchNData = async () => {
            try {
                const apiUrl = 'https://pcon-leaderboard-backend.vercel.app/api/getCfHandles';
                const response = await fetch(apiUrl);

                if (response.ok) {
                    const data = await response.json();
                    console.log(data);
                    //setCfHandles(data);
                } else {
                    console.error('Failed to fetch data');
                }

                //setLoading(false);
            } catch (error) {
                console.error('Error during API call:', error);
                //setLoading(false);
            }
        };

        fetchNData();
        const fetchData = async () => {
            try {
                const response = await fetch(`https://codeforces.com/api/user.info?handles=${handles}`);
                const data = await response.json();

                const filteredData = data.result.filter(entry => {
                    const usr = findUserDetails(entry.handle);
                    const regNoPrefix = usr.regNo.substring(0, 4);
                    return selectedYear === 'ALL' || regNoPrefix === selectedYear;
                });
                data.result = filteredData;
                setUserData(data);
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };

        fetchData();
    }, [selectedYear]);

    const handleSortingChange = (e) => {
        setSortingCriteria(e.target.value);
    };
    const handleYearChange = (e) => {
        setSelectedYear(e.target.value);
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

            <Profiles Leaderboard={arrange(userData.result, sortingCriteria)}></Profiles>

        </div >
    );
}

function arrange(data, sortingCriteria) {
    return data ? data.sort((a, b) => {
        if (sortingCriteria === 'curr-rating') {
            return b.rating - a.rating;
        } else if (sortingCriteria === 'max-rating') {
            return b.maxRating - a.maxRating;
        }
        return 0;
    }) : [];
}

