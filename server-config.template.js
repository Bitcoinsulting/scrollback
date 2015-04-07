module.exports = {
	storage: {
		pg: {
			username: "scrollback",
			password: "",
			db: "scrollback",
			server: "localhost"
		}
	},
	http: {
		host: "$branch.stage.scrollback.io",
		port: "$port"
	},
    "browserid-auth": {
		audience: "https://$branch.stage.scrollback.io"
	}
};
