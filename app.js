const { createApp } = Vue;

createApp({
    data() {
        return {
            emails: []
        };
    },
    async mounted() {
        await this.generateEmails();
    },
    methods: {
        async generateEmails() {
            try {
                const promises = Array.from({ length: 10 }, () => fetch('https://flynn.boolean.careers/exercises/api/random/mail'));
                const responses = await Promise.all(promises);
                const data = await Promise.all(responses.map(response => response.json()));
                this.emails = data.map(item => [item.response]); // Mette ogni indirizzo email in un array separato
            } catch (error) {
                console.error('Errore durante il recupero degli indirizzi email:', error);
            }
        }
    }
}).mount('#app');