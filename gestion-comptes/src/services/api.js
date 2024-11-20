import axios from 'axios';

// URL de base pour l'API backend
const API_BASE_URL = 'http://localhost:8080/banque/comptes';   // Modifiez le port si nécessaire

// Fonction pour obtenir les en-têtes en fonction du format choisi (JSON ou XML)
const getHeaders = (type = 'json') => {
    const contentType = type === 'xml' ? 'application/xml' : 'application/json';
    return {
        'Accept': contentType,
        'Content-Type': contentType,
    };
};

// Requêtes API
export const fetchAccounts = async (type = 'json') => {
    try {
        const response = await axios.get(API_BASE_URL, {
            headers: getHeaders(type),
        });
        return response;
    } catch (error) {
        console.error('Erreur lors de la récupération des comptes', error);
        throw error;
    }
};

export const getAccountById = async (id, type = 'json') => {
    return await axios.get(`${API_BASE_URL}/${id}`, {
        headers: getHeaders(type),
    });
};

export const createAccount = async (account, type = 'json') => {
    return await axios.post('http://localhost:8080/banque/comptes', account, {
        headers: {
            'Accept': type === 'xml' ? 'application/xml' : 'application/json',
            'Content-Type': 'application/json', // Assurez-vous que le Content-Type est correct
        },
    });
};


export const updateAccount = async (id, account, type = 'json') => {
    return await axios.put(`http://localhost:8080/banque/comptes/${id}`, account, {
        headers: {
            'Accept': type === 'xml' ? 'application/xml' : 'application/json',
            'Content-Type': 'application/json', // Utilisez 'application/json' pour JSON
        },
    });
};


export const deleteAccount = async (id, type = 'json') => {
    return await axios.delete(`${API_BASE_URL}/${id}`, {
        headers: getHeaders(type),
    });
};
