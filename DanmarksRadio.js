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
            newPublishedYear: null,
            username: "",
            password: "",
            token: "",
            loginError: ""
        }
    },
    mounted() {
        this.GetAll();
    },
    methods: {
        async login() {
            try {
                const res = await axios.post("http://localhost:5181/api/Auth/login", {
                    username: this.username,
                    password: this.password
                });
                this.token = res.data.token || res.data;
                axios.defaults.headers.common["Authorization"] = "Bearer " + this.token;
                this.loginError = "";
            } catch {
                this.loginError = "Forkert brugernavn eller password";
            }
        },
        logout() {
            this.token = "";
            delete axios.defaults.headers.common["Authorization"];
        },
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
        },

        async opdater(item) {
            await axios.put(app + "/" + item.id, item);
            this.GetAll();
        },

        async slet(id) {
            await axios.delete(app + "/" + id);
            this.GetAll();
        }
    }
}).mount("#app")
