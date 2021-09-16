import InitialPage from "../pages/initial.f7.html";
import HomePage from "../pages/home.f7.html";
import RightPanelPage from "../pages/right-panel.f7.html";

import EnvPage from "../pages/env.f7.html";
import ServicesPage from "../pages/services.f7.html";

import NotificationsPage from "../pages/notifications.f7.html";
import SettingsPage from "../pages/settings.f7.html";
import AboutPage from "../pages/about.f7.html";
import LoginPage from "../pages/login.f7.html";
import NotFoundPage from "../pages/404.f7.html";

import { storage } from "../js/storage.js";
import IsEnabled from "./isenabled";

const authenticated = function (to, from, resolve, reject) {
  let self = this;

  if (storage.getUserCredentials()) {
    resolve();
  } else {
    reject();
    self.navigate("/initial/");
  }
};

const unauthenticated = function (to, from, resolve, reject) {
  let self = this;
  
  if (!storage.getUserCredentials()) {
    resolve();
  } else {
    reject();
    self.navigate("/");
  }
};

const homePageRoute = function () {
  let route = {
    path: "/",
    component: HomePage,
    beforeEnter: authenticated,
  };

  let tabs = [];

  if (IsEnabled.servicesPage)
    tabs.push({
      path: "/",
      id: "services",
      component: ServicesPage,
    });

  if (IsEnabled.envPage)
    tabs.push({
      path: "/env/",
      id: "env",
      component: EnvPage,
    });

  route.tabs = tabs;

  return route;
};



const rightPanelRoute = function () {
  let route = {
    path: "/right-panel/",
    panel: {
      component: RightPanelPage,
    },
    beforeEnter: authenticated,
  };

  if (IsEnabled.rightPanel) return route;
};


const notificationsPageRoute = function () {
  let route = {
    path: "/notifications/",
    component: NotificationsPage,
    beforeEnter: authenticated,
  };

  if (IsEnabled.notificationsPage) return route;
};

const settingsPageRoute = function () {
  let route = {
    path: "/settings/",
    component: SettingsPage,
    beforeEnter: authenticated,
  };

  if (IsEnabled.settingsPage) return route;
};

const aboutPageRoute = function () {
  let route = {
    path: "/about/",
    component: AboutPage,
    beforeEnter: authenticated,
  };

  if (IsEnabled.aboutPage) return route;
};


const initialPageRoute = function () {
  return {
    path: "/initial/",
    component: InitialPage,
    beforeEnter: unauthenticated,
  };
};

const loginPageRoute = function () {
  return {
    path: "/login/",
    loginScreen: {
      component: LoginPage,
    },
    beforeEnter: unauthenticated,
  };
};

const notFoundPageRoute = function () {
  return {
    path: "(.*)",
    component: NotFoundPage,
  };
};

var routes = [
  // Authenticated routes
  homePageRoute(),
  rightPanelRoute(),
  notificationsPageRoute(),
  settingsPageRoute(),
  aboutPageRoute(),

  // Unauthenticated routes
  initialPageRoute(),
  loginPageRoute(),
  notFoundPageRoute(),
];

// Removing undefined routes
var routes = routes.filter(function (el) {
  return el != null;
});

export default routes;
