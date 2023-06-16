import React, { useEffect, useState } from 'react';
import axios from 'axios';

const PrintableView = () => {
    const [formulary, setFormulary] = useState([]);
    const currentDate = new Date().toLocaleDateString();
    // const location = useLocation();
    // const { inventory } = location.state;
    // const useHistory = useHistory();

    useEffect(() => {
        axios
            .get('http://localhost:8000/api/formulary', {withCredentials:true})
            .then((res) => {
                setFormulary(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    return (
        <div>
            <h2>Inventory - {currentDate}</h2>
            <table className="table table-sm smaller-text">
                <thead>
                    <tr>
                        <th>Medication</th>
                        <th>Description</th>
                        <th>Unit</th>
                        <th>Lot #</th>
                        <th>Location</th>
                        <th>Quantity</th>
                        <th>Inventory</th>
                    </tr>
                </thead>
                <tbody>
                    {formulary.map((medication, index) => (
                        <tr key={index}>
                            <td>{medication.medication}</td>
                            <td>{medication.description}</td>
                            <td>{medication.unitType}</td>
                            <td>{medication.lotNumber}</td>
                            <td>{medication.storageLocation}</td>
                            <td>{medication.onHand}</td>
                            <td>{medication.inventoryAmount}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div style={{ marginTop: '20px' }}>
                <div style={{ display: 'inline-block', marginRight: '50px' }}>
                    <strong>Conducted By:_______________________</strong>
                    {/* Add a signature block for "conducted by" here */}
                </div>
                <div style={{ display: 'inline-block' }}>
                    <strong>Witnessed By:_______________________</strong>
                    {/* Add a signature block for "witnessed by" here */}
                </div>
            </div>

        </div>
    );
};

export default PrintableView;

// attempted to bring data from InventoryMeds into PrintableView, but it was not working.  I think it is because the data is not being passed through the route. I tried useHistory.
// consider react-pdf and window.open method to create a window that opens to save as a pdf, would need npm install @react-pdf/renderer 
// consider input for name of person conducting inventory and name of person witnessing inventory