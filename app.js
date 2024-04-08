const { createApp } = Vue;

createApp({
    data() {
        return {
            emails: [] // Array dove memorizzeremo gli indirizzi email
        };
    },
    async mounted() {
        await this.generateEmails(); // Chiamiamo la funzione per generare gli indirizzi email quando il componente è montato
    },
    methods: {
        async generateEmails() {
            try {
                // Creiamo un array di 10 promesse, ognuna rappresenta una richiesta per un indirizzo email
                const promises = Array.from({ length: 10 }, () => fetch('https://flynn.boolean.careers/exercises/api/random/mail'));
                
                // Attendiamo che tutte le promesse vengano risolte
                const responses = await Promise.all(promises);

                // Eseguiamo il parsing delle risposte JSON di ogni richiesta
                const data = await Promise.all(responses.map(response => response.json()));

                // Aggiungiamo ogni indirizzo email in un array separato nell'array principale
                this.emails = data.map(item => [item.response]);
            } catch (error) {
                console.error('Errore durante il recupero degli indirizzi email:', error);
            }
        }
    }
}).mount('#app'); // Montiamo l'applicazione Vue sull'elemento con id "app" nell'HTML
