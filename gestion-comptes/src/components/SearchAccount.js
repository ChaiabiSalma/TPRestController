import React, { useState } from 'react';

const SearchAccount = ({ onSearch }) => {
    const [filters, setFilters] = useState({
        type: '',
        minSolde: '',
        maxSolde: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFilters({ ...filters, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSearch(filters);
    };

    return (
        <div>
            <h2>Rechercher des Comptes</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Type :</label>
                    <select name="type" value={filters.type} onChange={handleChange}>
                        <option value="">Tous</option>
                        <option value="COURANT">COURANT</option>
                        <option value="EPARGNE">EPARGNE</option>
                    </select>
                </div>
                <div>
                    <label>Solde Minimum :</label>
                    <input
                        type="number"
                        name="minSolde"
                        value={filters.minSolde}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label>Solde Maximum :</label>
                    <input
                        type="number"
                        name="maxSolde"
                        value={filters.maxSolde}
                        onChange={handleChange}
                    />
                </div>
                <button type="submit">Rechercher</button>
            </form>
        </div>
    );
};

export default SearchAccount;
