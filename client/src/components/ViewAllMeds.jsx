import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const ViewAllMeds = () => {
    const [formulary, setFormulary] = useState([]);
    const [sortedFormulary, setSortedFormulary] = useState([]);
    const [isSorted, setIsSorted] = useState(false);
    const [sortByLocation, setSortByLocation] = useState(false);
    // added for display full med info
    const [selectedMedication, setSelectedMedication] = useState(null);


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

    const isExpiringIn120Days = (expiration) => {
        return isExpiringSoon(expiration, 120);
    };

    const isExpiringMoreThan120Days = (expiration) => {
        const expirationDate = new Date(expiration);
        const currentDate = new Date();
        const futureDate = new Date().setDate(currentDate.getDate() + 120);
        return expirationDate > futureDate;
    };

    const isExpired = (expiration) => {
        const expirationDate = new Date(expiration);
        const currentDate = new Date();
        return expirationDate < currentDate;
    };

    // ---------------start alert message----------------   
    const displayMedicationDetails = (medication, event) => {
        if (event.target.tagName !== 'BUTTON') {
            setSelectedMedication(medication);

            const {
                medication: medName,
                description,
                unitType,
                authorizedAmount,
                onHand,
                lotNumber,
                expiration,
                nsn,
                ndc,
                supplier,
                ciic,
                dispenseLevel,
                storageLocation,
                activeStatus,
                notes
            } = medication;

            const message = `
            Medication: ${medName}
            Description: ${description}
            Unit Type: ${unitType}
            Authorized Amount: ${authorizedAmount}
            Quantity on Hand: ${onHand}
            Lot Number: ${lotNumber}
            Expiration: ${expiration}
            NSN: ${nsn}
            NDC: ${ndc}
            Supplier: ${supplier}
            CIIC: ${ciic}
            Dispense Level: ${dispenseLevel}
            Storage Location: ${storageLocation}
            Notes: ${notes}
    `;
            alert(message);
        }
    };
    // ---------------end alert message----------------   

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

    const deleteMedication = (id) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this medication?");

        if (confirmDelete) {
            axios
                .delete(`http://localhost:8000/api/formulary/${id}`)
                .then((res) => {
                    const updatedFormulary = formulary.filter((med) => med._id !== id);
                    setFormulary(updatedFormulary);
                    const updatedSortedFormulary = sortedFormulary.filter((med) => med._id !== id);
                    setSortedFormulary(updatedSortedFormulary);
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    };


    return (
        <div className="container">
            <h3 className="text-center p-3">Medication Formulary Overview</h3>
            <div className="d-flex">
                <span className="me-2 pt-2 fw-bold">Expires In: </span>
                <span className="legend30 me-2 p-2"> 30 days </span>
                <span className="legend60 me-2 p-2"> 60 days </span>
                <span className="legend120 me-2 p-2"> 120 days </span>
                <span className="legendExp p-2"> Expired </span>
                <span className="ms-5 me-2 pt-2 fw-bold">Sort by:</span>
                <button
                    className="btn btn-secondary btn-sm"
                    onClick={handleSort}
                    disabled={isSorted}
                >
                    Exp.
                </button>
                {/* sort by location */}
                <button
                    className="btn btn-secondary btn-sm mx-2"
                    onClick={() => {
                        setSortByLocation(!sortByLocation);
                        handleSort();
                    }}
                    disabled={isSorted}
                >
                    Location
                </button>
                {/* sort by name - by resetting */}
                <button
                    className="btn btn-secondary btn-sm"
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
                        <th scope='col'>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {sortedFormulary.map((med, index) => {
                        const expiring30Days = isExpiringIn30Days(med.expiration);
                        const expiring60Days = isExpiringIn60Days(med.expiration);
                        const expiring120Days = isExpiringIn120Days(med.expiration);
                        const expiringMoreThan120Days = !expiring30Days && !expiring60Days && !expiring120Days && isExpiringMoreThan120Days(med.expiration);
                        const hasExpired = isExpired(med.expiration);
                        let rowClassName = '';
                        if (hasExpired) {
                            rowClassName = 'expTable';
                        } else if (expiring30Days) {
                            rowClassName = 'table-danger';
                        } else if (expiring60Days) {
                            rowClassName = 'table-warning';
                        } else if (expiring120Days) {
                            rowClassName = 'table-info';
                        } else if (expiringMoreThan120Days) {
                            rowClassName = 'table-light';
                        }
                        return (
                            <tr key={index} className={`${rowClassName} clickable-row hovered-row`} onClick={(event) => displayMedicationDetails(med, event)}>
                                <td>{med.medication}</td>
                                <td>{med.description}</td>
                                <td>{med.onHand}</td>
                                <td>{med.lotNumber}</td>
                                <td>{med.storageLocation}</td>
                                <td>{med.expiration}</td>
                                <td>
                                    <Link to={`/formulary/${med._id}`}>
                                        <button className="btn btn-primary btn-sm">
                                            Edit
                                        </button>
                                    </Link>
                                    <button
                                        className="btn btn-danger btn-sm ms-2"
                                        onClick={() => deleteMedication(med._id)}
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
};
export default ViewAllMeds;


