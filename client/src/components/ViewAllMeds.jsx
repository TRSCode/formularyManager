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
        <h3 className="text-center p-3">Medication Formulary</h3>
        {
            formulary.map((med, index) => {
            return ( 
                <div key={index} className='d-inline-flex mx-2 p-3'>
                    <div className="container bg-warning rounded-top p-2"> 
                        <p>Name: {med.medication}</p>
                        <p>Description: {med.description}</p>
                        <p>Quantity: {med.onHand}</p>
                        <p>Lot Number: {med.lotNumber}</p>
                        <p>Expiration: {med.expiration}</p>

                        {/* <Link to={`/product/${product._id}`}> View |</Link>
                        <Link to={'/product/edit/' + product._id}> Edit</Link>
                        <button onClick={(e)=>{deleteProduct(product._id)}} className="btn btn-danger ms-2">
                            Delete
                        </button> */}
                    </div>
                </div>
                
            )})
        }
    </div>
    );
}

export default ViewAllMeds