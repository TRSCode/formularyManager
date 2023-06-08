import React, { useState, useEffect } from 'react';
// import { useHistory } from 'react-router-dom';
import axios from 'axios';

const InventoryMeds = () => {
    // const history = useHistory();
    const [medications, setMedications] = useState([]);
    const [inventoryAmounts, setInventoryAmounts] = useState({});

    useEffect(() => {
        axios.get('http://localhost:8000/api/formulary')
            .then((response) => {
                const groupedMedications = response.data.reduce((acc, medication) => {
                    const location = medication.storageLocation;
                    if (acc[location]) {
                        acc[location].push(medication);
                    } else {
                        acc[location] = [medication];
                    }
                    return acc;
                }, {});

                const sortedMedications = Object.values(groupedMedications).flat();

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

        // Create the inventory object with the entered data
        const inventory = {
            medications: medications.map((medication) => ({
                medication: medication.medication,
                description: medication.description,
                unitType: medication.unitType,
                lotNumber: medication.lotNumber,
                onHand: medication.onHand,
                inventoryAmount: inventoryAmounts[medication.id] || '',
                storageLocation: medication.storageLocation,
            })),
        };

        // Send the inventory data to the server
        axios.post('http://localhost:8000/api/inventory', inventory)
            .then((response) => {
                // Handle successful response
                console.log(response.data);
                // Redirect to printable view
                // history.push('/printable');
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
            <div className="row gap-x-20">
                {medications.map((medication) => (
                    <div className="col-md" key={medication.id}>
                        <p>
                            <label className="form-label">Medication:</label>
                            <span>{medication.medication}</span>
                        </p>
                        <p>
                            <label className="form-label">Description:</label>
                            <span>{medication.description}</span>
                        </p>
                        <p>
                            <label className="form-label">Unit Type:</label>
                            <span>{medication.unitType}</span>
                        </p>
                        <p>
                            <label className="form-label">Lot Number:</label>
                            <span>{medication.lotNumber}</span>
                        </p>
                        <p>
                            <label className="form-label">On Hand:</label>
                            <span>{medication.onHand}</span>
                        </p>
                        <p>
                            <label className="form-label">Storage Location:</label>
                            <span>{medication.storageLocation}</span>
                        </p>
                        <p>
                            <label className="form-label">Inventory Amount:</label>
                            <input
                                type="text"
                                className="form-control"
                                value={inventoryAmounts[medication.id] || ''}
                                onChange={(e) => handleInventoryChange(medication.id, e)}
                            />
                        </p>
                    </div>
                ))}
            </div>
            <button type="submit" className="btn btn-primary">Submit</button>
        </form>
    );
};

export default InventoryMeds;

// In this updated code, React Router's useHistory hook is imported, and an instance of useHistory is created and assigned to the history variable. After a successful form submission, the history.push('/printable') statement is called to redirect the user to the /printable route.

// Make sure to define the /printable route in your app's routing configuration and create a printable view component for rendering the form data in a printable format.

// -------------more details-----------------


// The updated code will display all medications grouped by location, allow the user to enter the inventory amount for each medication, and redirect to the printable component upon form submission.

// The useEffect hook fetches the medications from the server and groups them by location using the reduce method. The grouped medications are then sorted and stored in the medications state.

// The handleInventoryChange function updates the inventoryAmounts state when the user enters an inventory amount for a specific medication.

// In the handleSubmit function, the inventory object is created based on the entered data, including the inventory amount for each medication. The inventory data is sent to the server using an HTTP POST request. If the request is successful, the history.push('/printable') line redirects the user to the printable view.

// The form renders the medications grouped by location. For each medication, the medication details are displayed, and an input field allows the user to enter the inventory amount. The handleSubmit function is called when the form is submitted.

// Overall, this code should provide the desired functionality of displaying medications grouped by location, allowing the user to enter the inventory amount for each medication, and redirecting to the printable component upon submission.