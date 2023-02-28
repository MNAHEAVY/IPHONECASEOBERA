// React utilities
import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
// Files
import iconSearch from '../../assets/lu.png';
//Styles
import 'bootstrap/dist/css/bootstrap.css';
import './SearchBar.css';


export default function SearchBar() {
    // Hooks
    const location = useLocation();
    const navigate = useNavigate();
    const [name, setName] = useState('')
    // Save every change that occurs in the SearchBar
    function handleInputChange(e) {
        e.preventDefault();
        setName(e.target.value);
    }
    // Send the content that is in the SearchBar
    function handleSubmit(e) {
        e.preventDefault();
        if (name) {
            navigate(`/home?name=${name}`)
        }
    }

    return (
        <div className='containerSearchBar d-flex imgthree '>
            <form className="d-flex input-group imgthree" role="search" onSubmit={(e) => { handleSubmit(e) }}>
                <button
                    className="input-group-text imgthree"
                    id="inputGroup-sizing-default"
                    type='submit'
                >
                    <img id="imgthree" src={iconSearch} alt="search Icon" />
                </button>
                <input
                    className="form-control me-2"
                    value={name}
                    name={"name"}
                    onChange={(e) => { handleInputChange(e) }}
                    placeholder='Type your search...'
                />
            </form>
        </div>
    )
}