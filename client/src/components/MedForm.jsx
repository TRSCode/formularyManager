import React, { useState } from 'react'
import axios from 'axios';

const MedForm = (props) => {
    const {formulary, setFormulary} = props;
    const [medication, setMedication] = useState("");
    const [description, setDescription] = useState("");
    const [onHand, setOnHand] = useState("");
    const [lotNumber, setLotNumber]= useState("");
    // const [expiration, setExpiration] = useState("");
    const [errors,setErrors] = useState({});

    // const formatDateForBackend = (dateString) => {
    //     const [month, day, year] = dateString.split('-');
    //     return new Date(year, month -1, day);
    //     // return parseInt(`${year}${month}${day}`,10);
    // };

    const onSubmitHandler = (e) => {
        e.preventDefault();
        axios.post('http://localhost:8000/api/formulary', {
            medication,
            description,
            onHand,
            lotNumber
            // expiration
            // expiration: formatDateForBackend(expiration)
        })
            .then(res=>{
                console.log(res);
                console.log(res.data);
                setFormulary([...formulary, res.data]);
                setMedication("");
                setDescription("");
                setOnHand("");
                setLotNumber("");
                // setExpiration("");
            })
        .catch(err =>{
            console.log(err);
            setErrors(err.response.data.errors)
        })
    }
    
    return (
        <form onSubmit={onSubmitHandler} className="container p-3 mb-2 bg-primary text-white col-6">
            <h2>Add A Medication</h2>
            <p>
                <label className="form-label">Name: </label>
                {errors.medication ? 
                <p className="bg-danger text-warning">{errors.medication.message}</p>:""}
                <input type="text" className="form-control" value={medication} placeholder="ie generic/trade name (generic first)" onChange = {(e)=>setMedication(e.target.value)}/>
            </p>
            <p>
                <label className="form-label">Description: </label>
                {errors.description ? 
                <p className="bg-danger text-warning">{errors.description.message}</p>:""}
                <input type="text" className="form-control" value={description} placeholder="include dosage form and strength" onChange = {(e)=>setDescription(e.target.value)}/>
            </p>
            <p>
                <label className="form-label">Quantity:  </label>
                {errors.onHand ? 
                <p className="bg-danger text-warning">{errors.onHand.message}</p>:""}
                <input type="text" className="form-control" value={onHand} placeholder="provide quantity on hand" onChange = {(e)=>setOnHand(e.target.value)}/>
            </p>
            <p>
                <label className="form-label">Lot Number:</label>
                {errors.lotNumber ? 
                <p className="bg-danger text-warning">{errors.lotNumber.message}</p>:""}
                <input type="text" className="form-control" value={lotNumber} onChange = {(e)=>setLotNumber(e.target.value)}/>
            </p>
            {/* <p>
                <label className="form-label">Expiration:</label>
                {errors.expiration ? 
                <p className="bg-danger text-warning">{errors.expiration.message}</p>:""}
                <input type="date" className="form-control" value={expiration} onChange = {(e)=>{console.log(e.target.value); setExpiration(e.target.value)}}/>
            </p> */}
            <input type="submit" className="btn btn-success mx-3"/>
        </form>
    )
}
export default MedForm;