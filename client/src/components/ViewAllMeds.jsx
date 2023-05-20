import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ViewAllMeds = () => {
    const [formulary, setFormulary] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:8000/api/formulary")
            .then ((res) => {
                console.log(res.data);
                setFormulary(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    return (
        <div className="container">
            <h3 className="text-center p-3">Medication Formulary Overview</h3>
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
                            return ( 
                                <tr key={index}>
                                    <td>{med.medication}</td>
                                    <td>{med.description}</td>
                                    <td>{med.onHand}</td>
                                    <td>{med.lotNumber}</td>
                                    <td>{med.expiration}</td>
                                </tr>
                            )})
                        }
                    </tbody>
                </table>
    </div>
    );
}

export default ViewAllMeds