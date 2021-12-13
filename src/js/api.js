export class Api {
    constructor(app) {
        this.app = app;
        this.app.api = this;

        const settings = this.app.storage.getSettings();
        if (settings.devMode && settings.testApi) {
            this.url = this.app.storage.testApiURL;
        } else {
            this.url = this.app.storage.prodApiURL;
        } 
    }

    async login(username, password) {
        var self = this;
        var app = self.app;

        return await app.request.promise.post(app.api.url + "auth", {
            "user": username,
            "password": password,
            "app_id": "1"
        }).then( async (res) => {
            let data = JSON.parse(res.data);
            app.storage.setUserData(data.user);
            if (data.passport) {
                app.storage.setUserCredentials(data);
                app.request.setup({
                    headers: {
                        Authorization: "Bearer " + data.passport,
                    },
                });
                return true;
            } else {
                return false;
            }
        }).catch((err) => {
            return false;
        });
    };

    logout () {
        var self = this;
        var app = self.app;
		app.storage.removeAllButUserData();
        app.storage.clearUserCredentials();
	}

    async requestUserData() {
        var self = this;
        var app = self.app;

        return await app.request.promise.post(app.api.url + "user")
        .then((res) => {
            let data = JSON.parse(res.data);
            if(data.error){
                this.requestLogout().then(res => {
                    if (res) {
                        app.dialog.alert(
                            "Sessão expirada ou inválida, faça login novamente!"
                        );
                        app.views.main.router.navigate("/");
                    }
                });
                return;
            }
            const userData = JSON.parse(res.data);
            app.storage.setUserData(userData);
            return userData;
        });
    };
}