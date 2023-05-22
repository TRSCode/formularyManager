import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Link, useParams, useNavigate }; from 'react-router-dom';

const ViewOneMed = () => {
    // consider different name than 'formulary, setFormulary
    const [ formulary, setFormulary] = useState=({})
    const {id} = useParams();
    const navigate = useNavigate();
}