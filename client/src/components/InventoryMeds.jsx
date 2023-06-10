import React, { useState, useEffect } from 'react';
import axios from 'axios';

const InventoryMeds = () => {
    const [medications, setMedications] = useState([]);
    const [inventoryAmounts, setInventoryAmounts] = useState({});


    useEffect(() => {
        axios
            .get('http://localhost:8000/api/formulary')
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
                    groupedMedications[location].sort((a, b) =>
                        a.medication.localeCompare(b.medication)
                    );
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
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Update the onHand amount for each medication based on the inventoryAmount
        const updatedMedications = medications.map((medication) => ({
            ...medication,
            onHand: inventoryAmounts[medication.id] || medication.onHand,
        }));

        // Create the inventory object with the updated medication data
        const inventory = {
            medications: updatedMedications.map((medication) => ({
                medication: medication.medication,
                description: medication.description,
                unitType: medication.unitType,
                lotNumber: medication.lotNumber,
                expiration: medication.expiration,
                onHand: medication.onHand,
                // Set the inventory amount to an empty string if it's not defined
                inventoryAmount: inventoryAmounts[medication.id] || '',
                storageLocation: medication.storageLocation,
            })),
        };

        // Send the inventory data to the server
        axios
            .patch('http://localhost:8000/api/formulary/inventory', inventory)
            .then((response) => {
                // Handle successful response
                console.log(response.data);
            })
            .catch((error) => {
                // Handle error
                console.error(error);
            });

        // Clear the form fields after submission
        setInventoryAmounts({});
    };

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

