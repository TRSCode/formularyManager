import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const InventoryMeds = () => {
    const [medications, setMedications] = useState([]);
    const [inventoryAmounts, setInventoryAmounts] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        axios
            .get('http://localhost:8000/api/formulary', {withCredentials:true})
            .then((response) => {
                // Group medications by location (acc = accumulator)
                const groupedMedications = response.data.reduce((acc, medication) => {
                    const location = medication.storageLocation;
                    if (acc[location]) {
                        acc[location].push(medication);
                    } else {
                        acc[location] = [medication];
                    }
                    return acc;
                }, {});

                // Sort the locations alphabetically
                const sortedLocations = Object.keys(groupedMedications).sort();

                // Sort the medications within each group
                sortedLocations.forEach((location) => {
                    groupedMedications[location].sort((a, b) => a.medication.localeCompare(b.medication));
                });

                // Flatten the grouped medications and set them in state
                const sortedMedications = sortedLocations.flatMap((location) =>
                    groupedMedications[location].map((medication, index) => ({
                        ...medication,
                        id: `${location}-${index}`, // Generate unique ID
                    }))
                );
                setMedications(sortedMedications);
            })
            .catch((error) => {
                console.error(error);
            });
    }, []);

    const handleInventoryChange = (medicationId, e) => {
        const { value } = e.target;
        setInventoryAmounts((prevInventoryAmounts) => ({
            ...prevInventoryAmounts,
            [medicationId]: value,
        }));
        setMedications(medications.map((item)=>{return (item.id===medicationId) ? {...item, inventory:value} : item}))
    };
// -----------------------6th attempt-------------------------

const handleSubmit = (e) => {
    e.preventDefault();
    console.log(medications);

    // Create an array of medications with their updated inventory amount
    const updatedMedications = medications.map((medication) => ({
        _id: medication._id,
        inventoryAmount: inventoryAmounts[medication.id] || '',
    }));
    // console.log(updatedMedications);

    // Make an HTTP request to update the inventory in the backend
    const url = 'http://localhost:8000/api/formulary/updateInventory';
    axios
        .patch(url, { medications: updatedMedications })
        .then((response) => {
            // Handle successful response
            // console.log(response.data);
            navigate('/formulary/inventory/printable');
            // navigate('/formulary/inventory/printable', { state: { inventory: response.data.medications } });
        })
        .catch((error) => {
            // Handle error
            console.error(error);
        });

    // Clear the form fields after submission
    setInventoryAmounts({});
};

// heck of a time figuring out how to update a field in multiple objects in an array of objects.  Attempted update, updateMany, finally bulkWrite

    return (
        <form onSubmit={handleSubmit}>
            {medications.map((medication) => (
                <div className="row gap-x-20 ms-3 me-3" key={medication.id}>
                    <div className="col-md-4">
                        <p>
                            <label className="form-label fw-bolder">{medication.storageLocation}</label>
                        </p>
                    </div>
                    <div className="col-md-8">
                        <div className="d-flex align-items-center">
                            <p className="me-3">
                                <label className="form-label fw-semibold">{medication.medication}</label>
                                <label className="form-label ms-3">{medication.description}</label>
                                <label className="form-label ms-3">{medication.unitType}</label>
                                <label className="form-label ms-3">Lot #: {medication.lotNumber}</label>
                                <label className="form-label ms-3">Exp: {medication.expiration}</label>
                                <label className="form-label ms-3">QTY: {medication.onHand}</label>
                            </p>
                            <input
                                type="number"
                                className="form-control"
                                placeholder="Enter inventory amount"
                                value={inventoryAmounts[medication.id] || ''}

                                // onChange={(e) => setMedications(medications.map((item)=>{return (item.id===medication.id) ? {...item, inventory:e.target.value} : item}))}
                                onChange={(e) => handleInventoryChange(medication.id, e)}

                            />
                        </div>
                    </div>
                </div>
            ))}
            <button type="submit" className="btn btn-primary">
                Submit
            </button>
        </form>
    );
};

export default InventoryMeds;

