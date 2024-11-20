import React, { useState } from 'react';
import { createAccount } from '../services/api';
import { Button, TextField, MenuItem, Select, FormControl, InputLabel, Box, Typography, Grid } from '@mui/material';

const AddAccount = () => {
    const [account, setAccount] = useState({ type: '', solde: '', dateCreation: '' });
    const [format, setFormat] = useState('json');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await createAccount(account, format);
            alert('Compte ajouté avec succès.');
            setAccount({ type: '', solde: '', dateCreation: '' });
        } catch (error) {
            console.error('Erreur lors de l’ajout du compte', error);
            alert('Erreur : ' + (error.response?.data?.message || error.message));
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setAccount({ ...account, [name]: value });
    };

    return (
        <Box sx={{ maxWidth: 600, margin: 'auto', padding: 3 }}>
            <Typography variant="h4" gutterBottom align="center">Ajouter un Compte</Typography>

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

                    {/* Champ Date de Création */}
                    <Grid item xs={12}>
                        <TextField
                            label="Date de Création"
                            type="date"
                            name="dateCreation"
                            value={account.dateCreation}
                            onChange={handleChange}
                            required
                            fullWidth
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                    </Grid>

                    {/* Bouton Ajouter */}
                    <Grid item xs={12}>
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            fullWidth
                            size="large"
                        >
                            Ajouter
                        </Button>
                    </Grid>

                </Grid>
            </form>
        </Box>
    );
};

export default AddAccount;
