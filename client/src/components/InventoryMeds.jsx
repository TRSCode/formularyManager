import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const InventoryMeds = (props) => {
    const { isLogged, user, setUser, setIsLogged } = props;
    // const [isLogged, setIsLogged] = useState(); // [1
    const [medications, setMedications] = useState([]);
    const [inventoryAmounts, setInventoryAmounts] = useState({});
    const navigate = useNavigate();

    useEffect(() => {

        axios
            .get('http://localhost:8000/api/formulary', { withCredentials: true })
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
            console.log("Inventory logged",isLogged);
        // if (!user) {
        //     navigate('/login');
        // }
    }, [setIsLogged]);

    const handleInventoryChange = (medicationId, e) => {
        const { value } = e.target;
        setInventoryAmounts((prevInventoryAmounts) => ({
            ...prevInventoryAmounts,
            [medicationId]: value,
        }));
        setMedications((prevMedications) =>
            prevMedications.map((item) => (item.id === medicationId ? { ...item, inventory: value } : item))
        );
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(medications);

        // Create an array of medications with their updated inventory amount
        const updatedMedications = medications.map((medication) => ({
            _id: medication._id,
            inventoryAmount: inventoryAmounts[medication.id] || '',
        }));

        // Make an HTTP request to update the inventory in the backend
        const url = 'http://localhost:8000/api/formulary/updateInventory';
        axios
            .patch(url, { medications: updatedMedications })
            .then((response) => {
                // Handle successful response
                navigate('/formulary/inventory/printable');
            })
            .catch((error) => {
                // Handle error
                console.error(error);
            });

        // Clear the form fields after submission
        setInventoryAmounts({});
    };

    return (
        <div className="container-fluid formBG">
            <h1 className="text-center text-light mb-0">Inventory</h1>
            <form onSubmit={handleSubmit} className="mt-5">
                {medications.map((medication) => (
                    <div className="row gap-x-20 ms-3 me-3" key={medication.id}>
                        <div className="col-2 md-">
                            <p>
                                <label className="form-label fw-bolder text-light">{medication.storageLocation}</label>
                            </p>
                        </div>
                        <div className="col-md-10">
                            <div className="d-flex align-items-center">
                                <p className="me-3 col-8">
                                    <label className="form-label fw-semibold text-light">{medication.medication}</label>
                                    <label className="form-label ms-3 text-light">{medication.description}</label>
                                    <label className="form-label ms-3 text-light">{medication.unitType}</label>
                                    <label className="form-label ms-3 text-light">Lot #: {medication.lotNumber}</label>
                                    <label className="form-label ms-3 text-light">Exp: {medication.expiration}</label>
                                    <label className="form-label ms-3 text-light">QTY: {medication.onHand}</label>
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
                <button type="submit" className="btn btn-dark mt-3">
                    Submit
                </button>
            </form>
        </div>
    );
};

export default InventoryMeds;
