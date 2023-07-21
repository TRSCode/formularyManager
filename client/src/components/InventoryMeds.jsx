// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';

// const InventoryMeds = (props) => {
//     // const { isLogged, user, setUser, setIsLogged } = props;
//     const [medications, setMedications] = useState([]);
//     const [inventoryAmounts, setInventoryAmounts] = useState({});
//     const navigate = useNavigate();

//     useEffect(() => {
//         axios
//             .get('http://localhost:8000/api/formulary', { withCredentials: true })
//             .then((response) => {
//                 const sortedMedications = response.data.sort((a, b) =>
//                     a.medication.localeCompare(b.medication)
//                 );
//                 setMedications(sortedMedications);
//             })
//             .catch((error) => {
//                 console.error(error);
//             });
//     }, []);

//     const handleInventoryChange = (medicationId, e) => {
//         const { value } = e.target;
//         setInventoryAmounts((prevInventoryAmounts) => ({
//             ...prevInventoryAmounts,
//             [medicationId]: value,
//         }));
//     };

//     const handleSubmit = (e) => {
//         e.preventDefault();

//         const updatedMedications = medications.map((medication) => {
//             const inventoryAmount = inventoryAmounts[medication._id] || '';
//             return {
//                 ...medication,
//                 inventoryAmount,
//             };
//         });

//         const inconsistentMedications = updatedMedications.filter(
//             (medication) => medication.onHand !== medication.inventoryAmount && medication.inventoryAmount !== ''
//         );

//         if (inconsistentMedications.length > 0) {
//             let alertMessage = 'The following medications have inconsistent inventory amounts:\n\n';
//             inconsistentMedications.forEach((medication) => {
//                 alertMessage += `${medication.medication}\n`;
//                 alertMessage += `On Hand: ${medication.onHand}\n`;
//                 alertMessage += `Inventory Amount: ${medication.inventoryAmount}\n\n`;
//             });

//             const shouldContinue = window.confirm(
//                 `${alertMessage}Do you want to continue with the update?`
//             );

//             if (!shouldContinue) {
//                 return;
//             }
//         }

//         const url = 'http://localhost:8000/api/formulary/updateInventory';
//         axios
//             .patch(url, { medications: updatedMedications })
//             .then((response) => {
//                 navigate('/formulary/inventory/printable');
//             })
//             .catch((error) => {
//                 console.error(error);
//             });

//         setInventoryAmounts({});
//     };


//     return (
//         <div className="container-fluid formBG">
//             <h1 className="text-center text-light mb-0">Inventory</h1>
//             <form onSubmit={handleSubmit} className="mt-5">
//                 {medications.map((medication) => (
//                     <div className="row gap-x-20 ms-3 me-3" key={medication._id}>
//                         <div className="col-2 md-">
//                             <p>
//                                 <label className="form-label fw-bolder text-light">
//                                     {medication.storageLocation}
//                                 </label>
//                             </p>
//                         </div>
//                         <div className="col-md-10">
//                             <div className="d-flex align-items-center">
//                                 <p className="me-3 col-8">
//                                     <label className="form-label fw-semibold text-light">
//                                         {medication.medication}
//                                     </label>
//                                     <label className="form-label ms-3 text-light">
//                                         {medication.description}
//                                     </label>
//                                     <label className="form-label ms-3 text-light">
//                                         {medication.unitType}
//                                     </label>
//                                     <label className="form-label ms-3 text-light">
//                                         Lot #: {medication.lotNumber}
//                                     </label>
//                                     <label className="form-label ms-3 text-light">
//                                         Exp: {medication.expiration}
//                                     </label>
//                                     <label className="form-label ms-3 text-light">
//                                         QTY: {medication.onHand}
//                                     </label>
//                                 </p>
//                                 <input
//                                     type="number"
//                                     className="form-control"
//                                     placeholder="Enter inventory amount"
//                                     value={inventoryAmounts[medication._id] || ''}
//                                     onChange={(e) => handleInventoryChange(medication._id, e)}
//                                 />
//                             </div>
//                         </div>
//                     </div>
//                 ))}
//                 <button type="submit" className="btn btn-dark mt-3">
//                     Submit
//                 </button>
//             </form>
//         </div>
//     );
// };

// export default InventoryMeds;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const InventoryMeds = (props) => {
    const { isLogged, user } = props;
    const [medications, setMedications] = useState([]);
    const [inventoryAmounts, setInventoryAmounts] = useState({});
    const navigate = useNavigate();

    // useEffect(() => {
    //     if (!isLogged) {
    //         navigate('/login');
    //         return;
    //     }

    //     axios
    //         .get('http://localhost:8000/api/formulary', { withCredentials: true })
    //         .then((response) => {
    //             const sortedMedications = response.data.sort((a, b) =>
    //                 a.medication.localeCompare(b.medication)
    //             );
    //             setMedications(sortedMedications);
    //         })
    //         .catch((error) => {
    //             console.error(error);
    //         });
    // }, [isLogged, navigate]);
    useEffect(() => {
        if (!isLogged) {
            navigate('/login');
            return;
        }
    
        axios
            .get('http://localhost:8000/api/formulary', { withCredentials: true })
            .then((response) => {
                const sortedMedications = response.data.sort((a, b) => {
                    const locationComparison = a.storageLocation.localeCompare(b.storageLocation);
                    if (locationComparison === 0) {
                        return a.medication.localeCompare(b.medication);
                    }
                    return locationComparison;
                });
                setMedications(sortedMedications);
            })
            .catch((error) => {
                console.error(error);
            });
    }, [isLogged, navigate]);
    

    const handleInventoryChange = (medicationId, e) => {
        const { value } = e.target;
        setInventoryAmounts((prevInventoryAmounts) => ({
            ...prevInventoryAmounts,
            [medicationId]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const updatedMedications = medications.map((medication) => {
            const inventoryAmount = inventoryAmounts[medication._id] || '';
            return {
                ...medication,
                inventoryAmount,
            };
        });

        const inconsistentMedications = updatedMedications.filter(
            (medication) =>
                medication.onHand !== medication.inventoryAmount &&
                medication.inventoryAmount !== ''
        );

        if (inconsistentMedications.length > 0) {
            let alertMessage = 'The following medications have inconsistent inventory amounts:\n\n';
            inconsistentMedications.forEach((medication) => {
                alertMessage += `${medication.medication}\n`;
                alertMessage += `On Hand: ${medication.onHand}\n`;
                alertMessage += `Inventory Amount: ${medication.inventoryAmount}\n\n`;
            });

            const shouldContinue = window.confirm(
                `${alertMessage}Do you want to continue with the update?`
            );

            if (!shouldContinue) {
                return;
            }
        }

        const url = 'http://localhost:8000/api/formulary/updateInventory';
        axios
            .patch(url, { medications: updatedMedications })
            .then((response) => {
                navigate('/formulary/inventory/printable');
            })
            .catch((error) => {
                console.error(error);
            });

        setInventoryAmounts({});
    };

    if (!isLogged) {
        navigate('/login');
        return null;
    }

    return (
        <div className="container-fluid formBG">
            <h1 className="text-center text-light mb-0">Inventory</h1>
            <form onSubmit={handleSubmit} className="mt-5">
                {medications.map((medication) => (
                    <div className="row gap-x-20 ms-3 me-3" key={medication._id}>
                        <div className="col-2 md-">
                            <p>
                                <label className="form-label fw-bolder text-light">
                                    {medication.storageLocation}
                                </label>
                            </p>
                        </div>
                        <div className="col-md-10">
                            <div className="d-flex align-items-center">
                                <p className="me-3 col-8">
                                    <label className="form-label fw-semibold text-light">
                                        {medication.medication}
                                    </label>
                                    <label className="form-label ms-3 text-light">
                                        {medication.description}
                                    </label>
                                    <label className="form-label ms-3 text-light">
                                        {medication.unitType}
                                    </label>
                                    <label className="form-label ms-3 text-light">
                                        Lot #: {medication.lotNumber}
                                    </label>
                                    <label className="form-label ms-3 text-light">
                                        Exp: {medication.expiration}
                                    </label>
                                    <label className="form-label ms-3 text-light">
                                        QTY: {medication.onHand}
                                    </label>
                                </p>
                                <input
                                    type="number"
                                    className="form-control"
                                    placeholder="Enter inventory amount"
                                    value={inventoryAmounts[medication._id] || ''}
                                    onChange={(e) => handleInventoryChange(medication._id, e)}
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

