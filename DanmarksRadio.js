const app = "http://localhost:5181/api/DR";

Vue.createApp({
    data() {
        return {
            items: [],
            searchId: null
        }
    },
    mounted() {
        this.GetAll();
    },
    methods: {
        async GetAll() {
            const response = await axios.get(app);
            this.items = response.data;
        },
        async GetById(id) {
            const response = await axios.get(app + "/" + id);
            this.items = [response.data];
        }
    }
}).mount("#app")
