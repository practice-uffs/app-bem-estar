export class Storage {
	constructor(app) {
		this.prodApiURL = "https://practice.uffs.edu.br/api/v0/";
		this.testApiURL = "https://practice.uffs.edu.br/api/v0/";
		this.app = app;
		app.storage = this;
	}

	// Value processing methods
	dateDifference(date){
		date = new Date(date);
		const now = new Date();
		return now - date;
	};

	formatDateDifference(difference){
		let seconds = Math.floor(difference / 1000);
		let minutes = Math.floor(seconds / 60);
		let hours = Math.floor(minutes / 60);
		let days = Math.floor(hours / 24);
		let months = Math.floor(days / 30);
		let years = Math.floor(months / 12);

		if (years > 0) {
			return years === 1 ? years + " ano" : years + " anos";
		} else if (months > 0) {
			return months === 1 ? months + " mês" : months + " meses";
		} else if (days > 0) {
			return days === 1 ? days + " dia" : days + " dias";
		} else if (hours > 0) {
			return hours === 1 ? hours + " hora" : hours + " horas";
		} else if (minutes > 0) {
			return minutes === 1 ? minutes + " minuto" : minutes + " minutos";
		} else if (seconds > 0) {
			return seconds === 1 ? seconds + " segundo" : seconds + " segundos";
		} else {
			return "agora mesmo";
		}
	};

	formatDate(date){
		date = date.split(" ");
		date = new Date(Date.parse(date[2] + " " + date[1] + ", " + date[3]));

		const options = { year: "numeric", month: "long", day: "numeric" };
		date = date.toLocaleDateString(undefined, options);

		return date.toUpperCase().charAt(0).toUpperCase() + date.slice(1);
	};

	processHTML(input){
		var e = document.createElement("div");
		e.innerHTML = input;
		return e.childNodes.length === 0 ? "" : e.childNodes[0].nodeValue;
	};

	// LocalStorage methods
	clearAll(){
		localStorage.clear();
	};

	removeAllButUserData(){
		const settings = JSON.parse(localStorage.getItem("settings"));
		const userCredentials = JSON.parse(localStorage.getItem("userCredentials"));
		const userData = JSON.parse(localStorage.getItem("userData"));

		localStorage.clear();

		this.setUserCredentials(userCredentials);
		this.setSettings(settings);
		this.setUserData(userData);
	};

	// Settings methods
	getSettings(){
		let settings = localStorage["settings"];

		if (!settings) {
			const env = process.env.NODE_ENV || 'development';
			if (env == 'production') {
				settings = {
					offlineStorage: true,
					allowNotifications: true,
					// Dev options
					devMode: false,
					testApi: false,
				};
			} else {
				settings = {
					offlineStorage: true,
					allowNotifications: true,
					// Dev options
					devMode: true,
					testApi: true,
				};
			}
			localStorage["settings"] = JSON.stringify(settings);
		} else {
			settings = JSON.parse(settings);
		}

		return settings;
	};

	setSettings(settings){
		localStorage["settings"] = JSON.stringify(settings);
	};

	// User credentials methods
	getUserCredentials(){
		var self = this;
		var app = self.app;
		
		let userCredentials = localStorage["userCredentials"];

		if (userCredentials) {
			userCredentials = JSON.parse(userCredentials);
			app.request.setup({
				headers: {
					Authorization: "Bearer " + userCredentials.passport,
				},
			});
			return userCredentials;
		} else {
			app.request.setup({
				headers: {
					Authorization: "",
				},
			});
			return false;
		}
	};

	setUserCredentials(userCredentials){
		localStorage["userCredentials"] = JSON.stringify(userCredentials);
	};

	clearUserCredentials(){
		localStorage.removeItem("userCredentials");
		localStorage.removeItem("userData");
	};

	// User data methods
	async getUserData(){
		var self = this;
		var app = self.app;

    let userData = localStorage["userData"];

		if (!userData) {
			return await app.api.requestUserData();
		} else {
			return JSON.parse(userData);
		}
	};

	setUserData(userData){
		localStorage["userData"] = JSON.stringify(userData);
	};

	setFcmToken(fcmToken){
		localStorage["fcmToken"] = JSON.stringify(fcmToken);
	};

	removeFcmToken() {
		localStorage.removeItem("fcmToken");
	};

	// Sleep history method
	getSleepHistory() {
		let history = localStorage.getItem("sleepHistory");
		history = JSON.parse(history);
		return history;
	};

	setSleepHistory (awnser) {
		let oldHistory = localStorage.getItem("sleepHistory");
		oldHistory = JSON.parse(oldHistory);
		localStorage.removeItem("sleepHistory");
		if (oldHistory != null){
			oldHistory['history'].push({
				'created_at': Date(),
				'awnser': awnser
			});
		} else {
			oldHistory = { 
				"history":[{
					'created_at': Date(),
					'awnser': awnser
				}]
			};
		}
		localStorage["sleepHistory"] = JSON.stringify({history: oldHistory.history});
	};


	// Food history method
	getFoodHistory () {
		let history = localStorage.getItem("foodHistory");
		history = JSON.parse(history);
		return history;
	};

	setFoodHistory(awnser) {
		let oldHistory = localStorage.getItem("foodHistory");
		oldHistory = JSON.parse(oldHistory);
		localStorage.removeItem("foodHistory");
		if (oldHistory != null){
			oldHistory['history'].push({
				'created_at': Date(),
				'awnser': awnser
			});
		} else {
			oldHistory = { 
				"history":[{
					'created_at': Date(),
					'awnser': awnser
				}]
			};
		}
		localStorage["foodHistory"] = JSON.stringify({history: oldHistory.history});
	};

	// Physical Activity history method
	getPhysicalActivityHistory() {
		let history = localStorage.getItem("physicalActivityHistory");
		history = JSON.parse(history);
		return history;
	};

	setPhysicalActivityHistory(awnser) {
		let oldHistory = localStorage.getItem("physicalActivityHistory");
		oldHistory = JSON.parse(oldHistory);
		localStorage.removeItem("physicalActivityHistory");
		if (oldHistory != null){
			oldHistory['history'].push({
			'created_at': Date(),
			'awnser': awnser
			});
		} else {
			oldHistory = { 
				"history":[{
					'created_at': Date(),
					'awnser': awnser
				}]
			};
		}
		localStorage["physicalActivityHistory"] = JSON.stringify({history: oldHistory.history});
	};

	// Leisure history method
	getLeisureHistory () {
		let history = localStorage.getItem("leisureHistory");
		history = JSON.parse(history);
		return history;
	};

	setLeisureHistory(awnser) {
		let oldHistory = localStorage.getItem("leisureHistory");
		oldHistory = JSON.parse(oldHistory);
		localStorage.removeItem("leisureHistory");
		if (oldHistory != null){
			oldHistory['history'].push({
			'created_at': Date(),
			'awnser': awnser
		});
		} else {
			oldHistory = { 
				"history":[{
					'created_at': Date(),
					'awnser': awnser
				}]
			};
		}
		localStorage["leisureHistory"] = JSON.stringify({history: oldHistory.history});
	};

	// Happyness history method
	getHappinessHistory() {
		let history = localStorage.getItem("happynessHistory");
		history = JSON.parse(history);
		return history;
	};

	setHappinessHistory(awnser) {
		let oldHistory = localStorage.getItem("happynessHistory");
		oldHistory = JSON.parse(oldHistory);
		localStorage.removeItem("happinessHistory");
		if (oldHistory != null){
			oldHistory['history'].push({
				'created_at': Date(),
				'awnser': awnser
			});
		} else {
			oldHistory = { 
				"history":[{
					'created_at': Date(),
					'awnser': awnser
				}]
			};
		}
		localStorage["happynessHistory"] = JSON.stringify({history: oldHistory.history});
	};

	addCountTryLogin() {
		if (localStorage.getItem("countTryLogin")) {
			var count = parseInt(localStorage.getItem("countTryLogin"))
			localStorage.setItem("countTryLogin", count + 1);
		} else {
			localStorage.setItem("countTryLogin", 1);
		}
	};

	getCountTryLogin() {
		return localStorage.getItem("countTryLogin");
	};

	resetCountTryLogin() {
		localStorage.setItem("countTryLogin", 0);
	};

	getCountdownLogin() {
		return localStorage.getItem("getCountdownLogin");
	};

	setCountdownLogin(value) {
		localStorage.setItem("getCountdownLogin", value);
	};
};
