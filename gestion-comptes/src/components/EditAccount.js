import React, { useEffect, useState } from 'react';
import { getAccountById, updateAccount } from '../services/api';
import { useNavigate, useParams } from 'react-router-dom';
import EditIcon from '@mui/icons-material/Edit';
import { Button, TextField, FormControl, InputLabel, Select, MenuItem, Box, Typography, Grid } from '@mui/material';

const EditAccount = () => {
    const { id } = useParams(); // Récupère l'ID depuis l'URL
    const navigate = useNavigate();
    const [account, setAccount] = useState({ type: '', solde: '', dateCreation: '' });
    const [format, setFormat] = useState('json');

    // Charger les données du compte
    useEffect(() => {
        getAccountById(id, format).then((response) => {
            setAccount(response.data);
        }).catch((error) => {
            console.error('Erreur lors du chargement du compte', error);
            alert('Erreur lors du chargement du compte : ' + error.message);
        });
    }, [id, format]);

    const handleSubmit = (e) => {
        e.preventDefault();
        updateAccount(id, account, format).then(() => {
            alert('Compte modifié avec succès.');
            navigate('/'); // Redirige vers la liste des comptes
        }).catch((error) => {
            console.error('Erreur lors de la modification du compte', error);
            alert('Erreur : ' + (error.response?.data?.message || error.message));
        });
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setAccount({ ...account, [name]: value });
    };

    return (
        <Box sx={{ maxWidth: 600, margin: 'auto', padding: 3 }}>
            <Typography variant="h4" gutterBottom align="center">Modifier le Compte</Typography>

            <FormControl fullWidth sx={{ marginBottom: 2 }}>
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

            <form onSubmit={handleSubmit}>
                <Grid container spacing={2}>

                    {/* Champ Type */}
                    <Grid item xs={12} sm={6}>
                        <FormControl fullWidth required>
                            <InputLabel>Type de Compte</InputLabel>
                            <Select
                                name="type"
                                value={account.type}
                                onChange={handleChange}
                                label="Type de Compte"
                            >
                                <MenuItem value="COURANT">COURANT</MenuItem>
                                <MenuItem value="EPARGNE">EPARGNE</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>

                    {/* Champ Solde */}
                    <Grid item xs={12} sm={6}>
                        <TextField
                            label="Solde"
                            type="number"
                            name="solde"
                            value={account.solde}
                            onChange={handleChange}
                            required
                            fullWidth
                        />
                    </Grid>

                    {/* Bouton Modifier */}
                    <Grid item xs={12}>
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            fullWidth
                            size="large"
                        >
                            Modifier
                        </Button>
                    </Grid>

                </Grid>
            </form>
        </Box>
    );
};

export default EditAccount;
