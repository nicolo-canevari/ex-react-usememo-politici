import React, { useState, useEffect, useMemo } from 'react';

// Css
import './index.css';

// // Definisce il componente principale
// const PoliticiansPage = () => {

//     // Stato per memorizzare la lista dei politici
//     const [politicians, setPoliticians] = useState([]);

//     // Stato per gestire lo stato di caricamento
//     const [loading, setLoading] = useState(true);

//     // useEffect esegue la fetch una sola volta al montaggio del componente
//     useEffect(() => {

//         // Effettua la richiesta HTTP per ottenere i dati dei politici
//         fetch('https://boolean-spec-frontend.vercel.app/freetestapi/politicians')
//             // Converte la risposta in JSON
//             .then(response => response.json())
//             .then(data => {
//                 // Verifica che i dati ottenuti siano un array
//                 if (Array.isArray(data)) {
//                     // Aggiorna lo stato con i dati ricevuti
//                     setPoliticians(data);
//                 } else {
//                     // Logga un errore se i dati non sono validi
//                     console.error("Risposta non valida:", data);
//                     // Imposta un array vuoto come fallback
//                     setPoliticians([]);
//                 }
//             })
//             // Gestisce eventuali errori nella richiesta
//             .catch(error => {
//                 console.error('Errore durante il caricamento dei dati:', error);
//                 // Imposta un array vuoto in caso di errore
//                 setPoliticians([]);
//             })
//             // Indipendentemente dal risultato, disattiva lo stato di caricamento
//             .finally(() => {
//                 setLoading(false);
//             });
//     }, []);

//     // Se i dati sono ancora in caricamento
//     if (loading) return <p>Caricamento in corso...</p>;

//     return (
//         <div className="politicians-container">
//             {/* Itera sulla lista dei politici e crea una "card" per ognuno */}
//             {politicians.map(politician => (
//                 <div key={politician.id} className="politician-card">
//                     {/* Immagine del politico */}
//                     <img src={politician.image} alt={politician.name} />
//                     {/* Nome del politico */}
//                     <h2>{politician.name}</h2>
//                     {/* Posizione lavorativa o titolo */}
//                     <h4>{politician.position}</h4>
//                     {/* Biografia */}
//                     <p>{politician.biography}</p>
//                 </div>
//             ))}
//         </div>
//     );
// };

// export default PoliticiansPage;


// MILESTONE 2

// const PoliticiansPage = () => {


//     // Stato per memorizzare i politici
//     const [politicians, setPoliticians] = useState([]);

//     // Stato per indicare se i dati sono in caricamento
//     const [loading, setLoading] = useState(true);

//     // Stato per memorizzare il termine di ricerca inserito dall’utente
//     const [searchTerm, setSearchTerm] = useState('');

//     // useEffect per eseguire la fetch dei dati al montaggio del componente
//     useEffect(() => {
//         fetch('https://boolean-spec-frontend.vercel.app/freetestapi/politicians')
//             .then(response => response.json())
//             .then(data => {
//                 // Verifica che i dati ricevuti siano un array
//                 if (Array.isArray(data)) {
//                     // Salva i dati nello stato
//                     setPoliticians(data);
//                 } else {
//                     console.error("Risposta non valida:", data);
//                     setPoliticians([]);
//                 }
//             })
//             // Gestione degli errori di rete o parsing
//             .catch(error => {
//                 console.error('Errore durante il caricamento dei dati:', error);
//                 setPoliticians([]);
//             })
//             .finally(() => {
//                 // Disattiva il caricamento una volta completata la fetch
//                 setLoading(false);
//             });
//     }, []);

//     // Usa useMemo per memorizzare il risultato del filtro finché dipendenze non cambiano
//     const filteredPoliticians = useMemo(() => {
//         return politicians.filter(politician =>
//             politician.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//             politician.biography.toLowerCase().includes(searchTerm.toLowerCase())
//         );
//     }, [politicians, searchTerm]);

//     // Mostra un messaggio durante il caricamento dei dati
//     if (loading) return <p>Caricamento in corso...</p>;

//     return (
//         <div className="politicians-container">
//             {/* Campo input per la ricerca */}
//             <input
//                 type="text"
//                 placeholder="Cerca per nome o biografia"
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}  // Aggiorna lo stato ad ogni modifica
//                 className="search-input"
//             />

//             {/* Lista dei politici filtrati */}
//             {filteredPoliticians.map(politician => (
//                 <div key={politician.id} className="politician-card">
//                     <img src={politician.image} alt={politician.name} />
//                     <h2>{politician.name}</h2>
//                     <h4>{politician.position}</h4>
//                     <p>{politician.biography}</p>
//                 </div>
//             ))}
//         </div>
//     );
// };

// export default PoliticiansPage;

// Milestone 3

const PoliticiansPage = () => {
    // Stato per memorizzare l'elenco dei politici
    const [politicians, setPoliticians] = useState([]);
    // Stato per gestire il caricamento iniziale
    const [loading, setLoading] = useState(true);
    // Stato per il campo di ricerca
    const [searchTerm, setSearchTerm] = useState('');

    // useEffect per effettuare il fetch dei dati all'avvio del componente
    useEffect(() => {

        console.log('Fetching dati politici...');

        fetch('https://boolean-spec-frontend.vercel.app/freetestapi/politicians')
            .then(response => response.json())
            .then(data => {
                // Se il dato ricevuto è un array valido, aggiorna lo stato
                if (Array.isArray(data)) {
                    console.log('Dati ricevuti con successo:', data.length, 'politici');
                    setPoliticians(data);
                } else {
                    // Altrimenti mostra un errore in console
                    console.error("Risposta non valida:", data);
                    setPoliticians([]);
                }
            })
            .catch(error => {
                // Gestione degli errori di rete o di fetch
                console.error('Errore durante il caricamento dei dati:', error);
                setPoliticians([]);
            })
            .finally(() => {
                // Il caricamento è finito (sia con successo che con errore)
                setLoading(false);
                console.log('Fetch completato');
            });
    }, []);

    // useMemo per ottimizzare il filtraggio dei politici in base al campo di ricerca
    const filteredPoliticians = useMemo(() => {
        return politicians.filter(politician =>
            politician.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            politician.biography.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [politicians, searchTerm]); // Ricalcola solo se cambia searchTerm o politicians

    // Componente memoizzato per evitare il ri-render delle card non modificate
    const PoliticianCard = React.memo(({ politician }) => {
        console.log('Rendering:', politician.name); // Debug per verificare quando si renderizza

        return (
            <div className="politician-card">
                <img src={politician.image} alt={politician.name} />
                <h2>{politician.name}</h2>
                <h4>{politician.position}</h4>
                <p>{politician.biography}</p>
            </div>
        );
    });

    // Mostra un messaggio durante il caricamento dei dati
    if (loading) return <p>Caricamento in corso...</p>;

    return (
        <div className="politicians-container">
            {/* Campo di ricerca */}
            <input
                type="text"
                placeholder="Cerca per nome o biografia"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-input"
            />

            {/* Se nessun risultato corrisponde alla ricerca */}
            {filteredPoliticians.length === 0 ? (
                <p>Nessun politico trovato.</p>
            ) : (
                // Mostra la lista dei politici filtrati
                filteredPoliticians.map(politician => (
                    <PoliticianCard key={politician.id} politician={politician} />
                ))
            )}
        </div>
    );
};

export default PoliticiansPage;