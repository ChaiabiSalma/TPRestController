import React, { useEffect, useState } from 'react';
import { fetchAccounts, deleteAccount } from '../services/api';
import { useNavigate } from 'react-router-dom';
import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, FormControl, InputLabel, Select, MenuItem, TextField } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const AccountList = () => {
    const [accounts, setAccounts] = useState([]);
    const [filteredAccounts, setFilteredAccounts] = useState([]);
    const [format, setFormat] = useState('json');
    const [searchQuery, setSearchQuery] = useState('');
    const navigate = useNavigate();

    // Fetch all accounts
    useEffect(() => {
        fetchAccounts(format).then((response) => {
            if (Array.isArray(response.data)) {
                setAccounts(response.data);
                setFilteredAccounts(response.data);
            } else {
                console.error("La réponse de l'API n'est pas un tableau", response.data);
            }
        }).catch((error) => {
            console.error('Erreur lors de la récupération des comptes', error);
            alert('Erreur lors de la récupération des comptes: ' + error.message);
        });
    }, [format]);

    const handleDelete = (id) => {
        if (window.confirm('Voulez-vous vraiment supprimer ce compte ?')) {
            deleteAccount(id, format).then(() => {
                const updatedAccounts = accounts.filter((account) => account.id !== id);
                setAccounts(updatedAccounts);
                setFilteredAccounts(updatedAccounts);
            }).catch((error) => {
                console.error('Erreur lors de la suppression du compte', error);
                alert('Erreur lors de la suppression du compte: ' + error.message);
            });
        }
    };

    const handleSearch = (e) => {
        setSearchQuery(e.target.value);
        const filtered = accounts.filter(account =>
            account.type.toLowerCase().includes(e.target.value.toLowerCase()) ||
            account.solde.toString().includes(e.target.value) ||
            account.id.toString().includes(e.target.value)
        );
        setFilteredAccounts(filtered);
    };

    const handleAddAccount = () => {
        navigate('/add');
    };

    return (
        <div style={{ padding: '20px' }}>
            <Typography variant="h4" gutterBottom>Liste des Comptes</Typography>

            <FormControl fullWidth style={{ marginBottom: '20px' }}>
                <InputLabel>Format des requêtes</InputLabel>
                <Select
                    value={format}
                    onChange={(e) => setFormat(e.target.value)}
                    label="Format des requêtes"
                >
                    <MenuItem value="json">JSON</MenuItem>
                    <MenuItem value="xml">XML</MenuItem>
                </Select>
            </FormControl>

            <TextField
                label="Rechercher par Type, ID ou Solde"
                variant="outlined"
                fullWidth
                value={searchQuery}
                onChange={handleSearch}
                style={{ marginBottom: '20px' }}
            />

            <Button variant="contained" color="primary" onClick={handleAddAccount}>
                Ajouter un Compte
            </Button>

            <TableContainer component={Paper} style={{ marginTop: '20px' }}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell>Type</TableCell>
                            <TableCell>Solde</TableCell>
                            <TableCell>Date de Création</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {filteredAccounts.length > 0 ? (
                            filteredAccounts.map((account) => (
                                <TableRow key={account.id}>
                                    <TableCell>{account.id}</TableCell>
                                    <TableCell>{account.type}</TableCell>
                                    <TableCell>{account.solde}</TableCell>
                                    <TableCell>{account.dateCreation}</TableCell>
                                    <TableCell>
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            startIcon={<EditIcon />}
                                            onClick={() => navigate(`/edit/${account.id}`)}
                                        >
                                            Modifier
                                        </Button>
                                        <Button
                                            variant="contained"
                                            color="secondary"
                                            startIcon={<DeleteIcon />}
                                            onClick={() => handleDelete(account.id)}
                                            style={{ marginLeft: '10px' }}
                                        >
                                            Supprimer
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={5}>Aucun compte trouvé</TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
};

export default AccountList;
