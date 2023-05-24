import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ViewAllMeds = () => {
    const [formulary, setFormulary] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:8000/api/formulary")
            .then((res) => {
                console.log(res.data);
                setFormulary(res.data);
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

    return (
        <div className="container">
            <h3 className="text-center p-3">Medication Formulary Overview</h3>
            <div className="d-flex">
                <span className="me-2 pt-2 fw-bold">Expires In: </span>
                <span className="legend30 me-2 p-2"> 30 days </span>
                <span className="legend60 me-2 p-2"> 60 days </span>
                <span className="legend90 p-2"> 90 days </span>

            </div>
            <table className='table border-dark'>
                <thead>
                    <tr>
                        <th scope='col'>Name</th>
                        <th scope='col'>Details</th>
                        <th scope='col'>Quantity</th>
                        <th scope='col'>Lot Number</th>
                        <th scope='col'>Expiration</th>
                    </tr>
                </thead>
                <tbody>
                    {formulary.map((med, index) => {
                        // --------expire time frames -----
                        const expiring30Days = isExpiringIn30Days(med.expiration);
                        const expiring60Days = isExpiringIn60Days(med.expiration);
                        const expiring90Days = isExpiringIn90Days(med.expiration);
                        let rowClassName = '';
                        if (expiring30Days) {
                            rowClassName = 'table-danger';
                        } else if (expiring60Days) {
                            rowClassName = 'table-warning';
                        } else if (expiring90Days) {
                            rowClassName = 'table-info';
                        }
                        // --------expire time frames -----
                        return (
                            <tr key={index} className={rowClassName}>
                                <td>{med.medication}</td>
                                <td>{med.description}</td>
                                <td>{med.onHand}</td>
                                <td>{med.lotNumber}</td>
                                <td>{med.expiration}</td>
                            </tr>
                        )
                    })
                    }
                </tbody>
            </table>
        </div>
    );
}

export default ViewAllMeds