const app = "http://localhost:5181/api/DR";

Vue.createApp({
    data() {
        return {
            items: [],
            searchId: null,
            searchTitle: "",
            newTitle: "",
            newArtist: "",
            newDuration: null,
            newPublishedYear: null
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
        },
        async GetByTitle(title) {
            const response = await axios.get(app + "/title/" + title);
            this.items = response.data;
        },
        async add() {
            const newItem = {
                title: this.newTitle,
                artist: this.newArtist,
                duration: this.newDuration,
                publishedYear: this.newPublishedYear
            };
            await axios.post(app, newItem);
            this.GetAll();
        }
    }
}).mount("#app")
