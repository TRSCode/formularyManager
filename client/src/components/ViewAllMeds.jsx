import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ViewAllMeds = () => {
    const [formulary, setFormulary] = useState([]);
    const [sortedFormulary, setSortedFormulary] = useState([]);
    const [isSorted, setIsSorted] = useState(false);
    const [sortByLocation, setSortByLocation] = useState(false);

    useEffect(() => {
        axios
            .get("http://localhost:8000/api/formulary")
            .then((res) => {
                console.log(res.data);
                setFormulary(res.data);
                setSortedFormulary(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    const isExpiringSoon = (expiration, days) => {
        const expirationDate = new Date(expiration);
        const currentDate = new Date();
        const futureDate = new Date().setDate(currentDate.getDate() + days);
        return expirationDate <= futureDate;
    };

    const isExpiringIn30Days = (expiration) => {
        return isExpiringSoon(expiration, 30);
    };

    const isExpiringIn60Days = (expiration) => {
        return isExpiringSoon(expiration, 60);
    };

    const isExpiringIn90Days = (expiration) => {
        return isExpiringSoon(expiration, 90);
    };

    const isExpiringMoreThan90Days = (expiration) => {
        const expirationDate = new Date(expiration);
        const currentDate = new Date();
        const futureDate = new Date().setDate(currentDate.getDate() + 90);
        return expirationDate > futureDate;
    };

    const isExpired = (expiration) => {
        const expirationDate = new Date(expiration);
        const currentDate = new Date();
        return expirationDate < currentDate;
    };

    // ---------------attempting to sort by location----------------

    // const handleSort = () => {
    //     const sortedList = [...sortedFormulary].sort((a, b) => {
    //         if (isExpired(a.expiration) && !isExpired(b.expiration)) {
    //             return -1;
    //         } else if (!isExpired(a.expiration) && isExpired(b.expiration)) {
    //             return 1;
    //         } else if (a.expiration < b.expiration) {
    //             return -1;
    //         } else if (a.expiration > b.expiration) {
    //             return 1;
    //         } else {
    //             return 0;
    //         }
    //     });
    //     setSortedFormulary(sortedList);
    //     setIsSorted(true);
    // };

// ---------------attempting to sort by location----------------2

    // const handleSort = () => {
    //     const sortedList = [...sortedFormulary].sort((a, b) => {
    //         if (isExpired(a.expiration) && !isExpired(b.expiration)) {
    //             return -1;
    //         } else if (!isExpired(a.expiration) && isExpired(b.expiration)) {
    //             return 1;
    //         } else if (a.expiration < b.expiration) {
    //             return -1;
    //         } else if (a.expiration > b.expiration) {
    //             return 1;
    //         } else {
    //             return 0;
    //         }
    //     });

    //     // Sort by storage location if enabled
    //     if (sortByLocation) {
    //         sortedList.sort((a, b) => {
    //             return a.storageLocation.localeCompare(b.storageLocation);
    //         });
    //     }

    //     setSortedFormulary(sortedList);
    //     setIsSorted(true);
    // };

    // ---------------attempting to sort by location----------------3

    // const handleSort = () => {
    //     const sortedList = [...sortedFormulary].sort((a, b) => {
    //         if (isExpired(a.expiration) && !isExpired(b.expiration)) {
    //             return -1;
    //         } else if (!isExpired(a.expiration) && isExpired(b.expiration)) {
    //             return 1;
    //         } else if (a.expiration < b.expiration) {
    //             return -1;
    //         } else if (a.expiration > b.expiration) {
    //             return 1;
    //         } else {
    //             return 0;
    //         }
    //     });
    
    //     if (sortByLocation) {
    //         sortedList.sort((a, b) => {
    //             return a.storageLocation.localeCompare(b.storageLocation);
    //         });
    //     }
    
    //     setSortedFormulary(() => sortedList); // Use functional form of setState
    
    //     setIsSorted(true);
    // };

// ---------------attempting to sort by location----------------4

    const handleSort = () => {
        const sortedList = [...sortedFormulary].sort((a, b) => {
            if (isExpired(a.expiration) && !isExpired(b.expiration)) {
                return -1;
            } else if (!isExpired(a.expiration) && isExpired(b.expiration)) {
                return 1;
            } else if (a.expiration < b.expiration) {
                return -1;
            } else if (a.expiration > b.expiration) {
                return 1;
            } else {
                // Sort by storage location and medication
                const locationComparison = a.storageLocation.localeCompare(b.storageLocation);
                if (locationComparison === 0) {
                    return a.medication.localeCompare(b.medication);
                }
                return locationComparison;
            }
        });
    
        if (sortByLocation) {
            sortedList.sort((a, b) => {
                return a.storageLocation.localeCompare(b.storageLocation);
            });
        }
    
        setSortedFormulary(sortedList);
        setIsSorted(true);
    };

    const handleRestore = () => {
        setSortedFormulary(formulary);
        setIsSorted(false);
    };

    return (
        <div className="container">
            <h3 className="text-center p-3">Medication Formulary Overview</h3>
            <div className="d-flex">
                <span className="me-2 pt-2 fw-bold">Expires In: </span>
                <span className="legend30 me-2 p-2"> 30 days </span>
                <span className="legend60 me-2 p-2"> 60 days </span>
                <span className="legend90 p-2"> 90 days </span>
                <span className="legendExp p-2"> Expired </span>
                <spam className="ms-5 me-2 pt-2 fw-bold">Sort by:</spam>
                <button
                    className="btn btn-secondary"
                    onClick={handleSort}
                    disabled={isSorted}
                >
                    Exp.
                </button>
                {/* sort by location */}
                <button
                    className="btn btn-secondary mx-2"
                    onClick={() => {
                        setSortByLocation(!sortByLocation);
                        handleSort();
                    }}
                    disabled={isSorted}
                >
                    Location
                </button>
                {/* sort by location */}
                <button
                    className="btn btn-secondary"
                    onClick={handleRestore}
                    disabled={!isSorted}
                >
                    Name
                </button>
            </div>
            <table className='table border-dark'>
                <thead>
                    <tr>
                        <th scope='col'>Name</th>
                        <th scope='col'>Details</th>
                        <th scope='col'>Quantity</th>
                        <th scope='col'>Lot Number</th>
                        <th scope='col'>Location</th>
                        <th scope='col'>Expiration</th>
                    </tr>
                </thead>
                <tbody>
                    {sortedFormulary.map((med, index) => {
                        const expiring30Days = isExpiringIn30Days(med.expiration);
                        const expiring60Days = isExpiringIn60Days(med.expiration);
                        const expiring90Days = isExpiringIn90Days(med.expiration);
                        const expiringMoreThan90Days = !expiring30Days && !expiring60Days && !expiring90Days && isExpiringMoreThan90Days(med.expiration);
                        const hasExpired = isExpired(med.expiration);
                        let rowClassName = '';
                        if (hasExpired) {
                            rowClassName = 'table-dark';
                        } else if (expiring30Days) {
                            rowClassName = 'table-danger';
                        } else if (expiring60Days) {
                            rowClassName = 'table-warning';
                        } else if (expiring90Days) {
                            rowClassName = 'table-info';
                        } else if (expiringMoreThan90Days) {
                            rowClassName = 'table-light';
                        }
                        return (
                            <tr key={index} className={rowClassName}>
                                <td>{med.medication}</td>
                                <td>{med.description}</td>
                                <td>{med.onHand}</td>
                                <td>{med.lotNumber}</td>
                                <td>{med.storageLocation}</td>
                                <td>{med.expiration}</td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
};
export default ViewAllMeds;


