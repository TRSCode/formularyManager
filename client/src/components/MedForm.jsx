import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const MedForm = ({ isLogged }) => {
    const [medication, setMedication] = useState('');
    const [description, setDescription] = useState('');
    const [unitType, setUnitType] = useState('');
    const [unitCost, setUnitCost] = useState('');
    const [authorizedAmount, setAuthorizedAmount] = useState('');
    const [onHand, setOnHand] = useState('');
    const [lotNumber, setLotNumber] = useState('');
    const [storageLocation, setStorageLocation] = useState('');
    const [expiration, setExpiration] = useState('');
    const [nsn, setNsn] = useState('');
    const [ndc, setNdc] = useState('');
    const [supplier, setSupplier] = useState('');
    const [ciic, setCiic] = useState('');
    const [dispenseLevel, setDispenseLevel] = useState('');
    const [notes, setNotes] = useState('');
    const [errors, setErrors] = useState({});
    const [successMessage, setSuccessMessage] = useState('');
    const navigate = useNavigate();

    const onSubmitHandler = (e) => {
        e.preventDefault();
        axios
            .post(
                'http://localhost:8000/api/formulary',
                {
                    medication,
                    description,
                    unitType,
                    unitCost,
                    authorizedAmount,
                    onHand,
                    lotNumber,
                    storageLocation,
                    expiration,
                    nsn,
                    ndc,
                    supplier,
                    ciic,
                    dispenseLevel,
                    notes
                },
                { withCredentials: true }
            )
            .then((res) => {
                setMedication('');
                setDescription('');
                setUnitType('');
                setUnitCost('');
                setAuthorizedAmount('');
                setOnHand('');
                setLotNumber('');
                setStorageLocation('');
                setExpiration('');
                setNsn('');
                setNdc('');
                setSupplier('');
                setCiic('');
                setDispenseLevel('');
                setNotes('');
                setSuccessMessage('Success! Add another!');
            })
            .catch((err) => {
                console.log(err);
                setErrors(err.response.data.errors);
            });
    };

    if (!isLogged) {
        navigate('/login');
        return null;
    }

    return (
        <form onSubmit={onSubmitHandler} className="form-control p-3 formBG text-white col-9">
            <h2>Add A Medication</h2>
            {successMessage && <h3 className="text-info">{successMessage}</h3>}
            <div className="row gap-x-20">
                <div className="col-md">
                    <p>
                        <label className="form-label">*Name:  </label>
                        {errors.medication ?
                            <p className="bg-warning text-secondary">{errors.medication.message}</p> : ""}
                        <input type="text" className="form-control" value={medication} placeholder="generic/trade name (generic preferred)" onChange={(e) => setMedication(e.target.value)} />
                    </p>
                </div>
                <div className="col-md">
                    <p>
                        <label className="form-label">*Description: </label>
                        {errors.description ?
                            <p className="bg-warning text-secondary">{errors.description.message}</p> : ""}
                        <input type="text" className="form-control" value={description} placeholder="Strength/ Route/ QTY per container" onChange={(e) => setDescription(e.target.value)} />
                    </p>
                </div>
                <div className="col-md">
                    <p>
                        <label className="form-label">*Unit Type:</label>
                        {errors.unitType ?
                            <p className="bg-warning text-secondary">{errors.unitType.message}</p> : ""}
                        <select className="form-control" value={unitType} onChange={(e) => setUnitType(e.target.value)}>
                            <option value="">Select a Unit Type</option>
                            <option value="EA">EA</option>
                            <option value="PG">PG</option>
                            <option value="VI">VI</option>
                            <option value="TU">TU</option>
                            <option value="BT">BT</option>
                            <option value="BX">BX</option>
                            <option value="KT">KT</option>
                            <option value="CO">CO</option>
                            <option value="other">other</option>
                        </select>
                    </p>
                </div>
                <div className="col-md">
                    <p>
                        <label className="form-label">*Cost per unit:  </label>
                        {errors.unitCost ?
                            <p className="bg-warning text-secondary">{errors.unitCost.message}</p> : ""}
                        <input type="text" className="form-control" value={unitCost} placeholder="cost per unit" onChange={(e) => setUnitCost(e.target.value)} />
                    </p>
                </div>
                <div className="col-md">
                    <p>
                        <label className="form-label">*Authorized Quantity:  </label>
                        {errors.authorizedAmount ?
                            <p className="bg-warning text-secondary">{errors.authorizedAmount.message}</p> : ""}
                        <input type="text" className="form-control" value={authorizedAmount} placeholder="authorized quantity" onChange={(e) => setAuthorizedAmount(e.target.value)} />
                    </p>
                </div>
                <div className="col-md">
                    <p>
                        <label className="form-label">*Quantity:  </label>
                        {errors.onHand ?
                            <p className="bg-warning text-secondary">{errors.onHand.message}</p> : ""}
                        <input type="text" className="form-control" value={onHand} placeholder="quantity on hand" onChange={(e) => setOnHand(e.target.value)} />
                    </p>
                </div>
            </div>
            <div className="row gap-x-20">
                <div className="col-md">
                    <p>
                        <label className="form-label">*Lot Number:</label>
                        {errors.lotNumber ?
                            <p className="bg-warning text-secondary">{errors.lotNumber.message}</p> : ""}
                        <input type="text" className="form-control" value={lotNumber} onChange={(e) => setLotNumber(e.target.value)} />
                    </p>
                </div>
                <div className="col-md">
                    <p>
                        <label className="form-label">*Expiration:</label>
                        {errors.expiration ?
                            <p className="bg-warning text-secondary">{errors.expiration.message}</p> : ""}
                        <input type="date" className="form-control" value={expiration} onChange={(e) => { console.log(e.target.value); setExpiration(e.target.value) }} />
                    </p>
                </div>
                <div className="col-md">
                    <p>
                        <label className="form-label">*NSN:</label>
                        {errors.nsn ?
                            <p className="bg-warning text-secondary">{errors.nsn.message}</p> : ""}
                        <input type="text" className="form-control" placeholder="NSN" value={nsn} onChange={(e) => setNsn(e.target.value)} />
                    </p>
                </div>
                <div className="col-md">
                    <p>
                        <label className="form-label">NDC:</label>
                        {errors.ndc ?
                            <p className="bg-warning text-secondary">{errors.ndc.message}</p> : ""}
                        <input type="text" className="form-control" placeholder="NDC" value={ndc} onChange={(e) => setNdc(e.target.value)} />
                    </p>
                </div>
                <div className="col-md">
                    <p>
                        <label className="form-label">Supplier:</label>
                        {errors.supplier ?
                            <p className="bg-warning text-secondary">{errors.supplier.message}</p> : ""}
                        <input type="text" className="form-control" placeholder="Supplier" value={supplier} onChange={(e) => setSupplier(e.target.value)} />
                    </p>
                </div>
            </div>
            <div className="row gap-x-20">
                <div className="col-md">
                    <p>
                        <label className="form-label">*CIIC:</label>
                        {errors.ciic ?
                            <p className="bg-warning text-secondary">{errors.ciic.message}</p> : ""}
                        <select className="form-control" value={ciic} onChange={(e) => setCiic(e.target.value)}>
                            <option value="">Select a Category</option>
                            <option value="Q">Q</option>
                            <option value="R">R</option>
                            <option value="U">U</option>
                            <option value="J">J</option>
                            <option value="other">other</option>
                        </select>
                    </p>
                </div>
                <div className="col-md">
                    <p>
                        <label className="form-label">*Dispense Level:</label>
                        {errors.dispenseLevel ?
                            <p className="bg-warning text-secondary">{errors.dispenseLevel.message}</p> : ""}
                        <select className="form-control" value={dispenseLevel} onChange={(e) => setDispenseLevel(e.target.value)}>
                            <option value="">Select a Category</option>
                            <option value="Prescriber">Prescriber</option>
                            <option value="Delegate">Delegate</option>
                            <option value="other">other</option>
                        </select>
                    </p>
                </div>
                <div className="col-md">
                    <p>
                        <label className="form-label">*Location:</label>
                        {errors.storageLocation ?
                            <p className="bg-warning text-secondary">{errors.storageLocation.message}</p> : ""}
                        <select className="form-control" value={storageLocation} onChange={(e) => setStorageLocation(e.target.value)}>
                            <option value="">Select a storage location</option>
                            <option value="Locker">Locker</option>
                            <option value="Grey Cabinet">Grey Cabinet</option>
                            <option value="White Cabinet">White Cabinet</option>
                            <option value="Clinic Refrigerator">Clinic Refrigerator</option>
                            <option value="Blue Vial Bag">Blue Vial Bag</option>
                            <option value="Orange Paramedic Bag">Orange Paramedic Bag</option>
                            <option value="Safe-Black Bag">Safe-Black Bag</option>
                            <option value="Safe-Blue Bag">Safe-Blue Bag</option>
                            <option value="Safe-Orange Bag">Safe-Orange Bag</option>
                            <option value="MRV">MRV</option>
                            <option value="ALS">ALS</option>
                            <option value="Turn-in">Turn In</option>
                            <option value="Other">Other</option>
                        </select>
                    </p>
                </div>
            </div>
            <div className="row gap-x-20">
                <div className="col-md">
                    <p>
                        <label className="form-label">Notes:</label>
                        {errors.notes ?
                            <p className="bg-warning text-secondary">{errors.notes.message}</p> : ""}
                        <input type="text" className="form-control" placeholder="Notes and Actions" value={notes} onChange={(e) => setNotes(e.target.value)} />
                    </p>
                </div>
            </div>
            <input type="submit" className="btn btn-dark mx-3" />
        </form>
    )
}
export default MedForm;

