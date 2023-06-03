import React from 'react';
import { useLocation } from 'react-router-dom';

const PrintableView = () => {
    const location = useLocation();
    const { inventory } = location.state;

    return (
        <div>
            <h1>Printable View</h1>
            <table>
                <thead>
                    <tr>
                        <th>Medication</th>
                        <th>Description</th>
                        <th>Unit Type</th>
                        <th>Lot Number</th>
                        <th>On Hand</th>
                        <th>Inventory Amount</th>
                        <th>Storage Location</th>
                    </tr>
                </thead>
                <tbody>
                    {inventory.medications.map((medication, index) => (
                        <tr key={index}>
                            <td>{medication.medication}</td>
                            <td>{medication.description}</td>
                            <td>{medication.unitType}</td>
                            <td>{medication.lotNumber}</td>
                            <td>{medication.onHand}</td>
                            <td>{medication.inventoryAmount}</td>
                            <td>{medication.storageLocation}</td>
                        </tr>
                    ))}
                    {/* add inventory by, witnessed by, date blocks..maybe add save as pdf feature */}
                </tbody>
            </table>
        </div>
    );
};

export default PrintableView;

// In this example, the useLocation hook is imported from React Router, and an instance of useLocation is created and assigned to the location variable. The inventory object is then extracted from the location.state object, which should contain the inventory data passed from the previous component.

// The PrintableView component renders a table with the medication information, including medication name, description, unit type, lot number, on hand quantity, inventory amount, and storage location. It maps through the inventory.medications array to generate the table rows dynamically.

// Remember to configure your app's routing to include the /printable route and render the PrintableView component when accessing that route.