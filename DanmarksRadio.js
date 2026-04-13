const app = "http://localhost:5181/api/DR";

Vue.createApp({
    data() {
        return {
            items: []
        }
    },
    mounted() {
        this.GetAll();
    },
    methods: {
        async GetAll() {
            const response = await axios.get(app);
            this.items = response.data;
        }
    }
}).mount("#app")
