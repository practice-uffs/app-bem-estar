export class Tips {
	constructor(app) {
		this.app = app;
		app.tips = this;
	}

    getHealthTips() {
        var self = this;
        var app = self.app;
        return app.request.promise.json('static/example-data/health-tips.json')
        .then((res) => {
            return res.data;
        });  
    }

	getActivityTips() {
        var self = this;
        var app = self.app;
        return app.request.promise.json('static/example-data/activity-tips.json')
        .then((res) => {
            return res.data;
        });  
    }

    getSleepTips() {
        var self = this;
        var app = self.app;
        return app.request.promise.json('static/example-data/sleep-tips.json')
        .then((res) => {
            return res.data;
        });        
    }

    getFeedingTips() {
        var self = this;
        var app = self.app;
        return app.request.promise.json('static/example-data/feeding-tips.json')
        .then((res) => {
            return res.data;
        });
    }

    getLeisureTips() {
        var self = this;
        var app = self.app;
        return app.request.promise.json('static/example-data/leisure-tips.json')
        .then((res) => {
            return res.data;
        });
    }
};
