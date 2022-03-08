import InitialPage from "../pages/initial.f7.html";
import HomePage from "../pages/home.f7.html";
import RightPanelPage from "../pages/right-panel.f7.html";

import EnvPage from "../pages/env.f7.html";
import MainMenuPage from "../pages/main-menu.f7.html";
import AffectiveSliderPage from "../pages/affectiveSlider.f7.html";

import NotificationsPage from "../pages/notifications.f7.html";
import SettingsPage from "../pages/settings.f7.html";
import AboutPage from "../pages/about.f7.html";
import LoginPage from "../pages/login.f7.html";
import NotFoundPage from "../pages/404.f7.html";
import PrejudicesPage from "../pages/prejudices.f7.html";
import CommonDisordersPage from "../pages/common-disorders.f7.html";
import SymptomsPage from "../pages/symptoms.f7.html";
import MeditationPage from "../pages/meditation.f7.html";
import ReasonsPage from "../pages/reasons.f7.html";
import SeekHelpPage from "../pages/seek-help.f7.html";
import TipsPage from '../pages/tips.f7.html';
import WellnessQuizPage from '../pages/wellness-quiz.f7.html';
import HeartBeatPage from '../pages/hr.f7.html';
import MyStatisticsPage from '../pages/my-statistics.f7.html';

import { storage } from "../js/storage.js";
import IsEnabled from "./isenabled";

const authenticated = function (to, from, resolve, reject) {
  let self = this;
  var app = self.app;
  if (app.storage.getUserCredentials()) {
    resolve();
  } else {
    reject();
    self.navigate("/initial/");
  }
};

const unauthenticated = function (to, from, resolve, reject) {
  let self = this;
  var app = self.app;

  if (!app.storage.getUserCredentials()) {
    resolve();
  } else {
    reject();
    self.navigate("/");
  }
};

const initialPageRoute = function () {
  return {
    path: "/initial/",
    component: InitialPage,
    beforeEnter: unauthenticated,
  };
};

const homePageRoute = function () {
  let route = {
    path: "/",
    component: HomePage,
    beforeEnter: authenticated,
  };

  let tabs = [];

  // if (IsEnabled.initialPage)
  //   tabs.push({
  //     path: "/",
  //     id: "initial",
  //     component: InitialPage,
  //   });

  if (IsEnabled.mainMenuPage)
    tabs.push({
      path: "/",
      id: "main-menu",
      component: MainMenuPage,
    });

  if (IsEnabled.envPage)
    tabs.push({
      path: "/env/",
      id: "env",
      component: EnvPage,
    });

  if (IsEnabled.affectiveSliderPage)
    tabs.push({
      path: "/affectiveSlider/",
      id: "affectiveSlider",
      component: AffectiveSliderPage,
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

const heartBeatPageRoute = function () {
  let route = {
    path: "/hr/",
    component: HeartBeatPage,
    beforeEnter: authenticated,
  };

  if (IsEnabled.heartBeatPage) return route;
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


const prejudicesPageRoute = function () {
  let route = {
    path: '/prejudices/',
    component: PrejudicesPage,
    beforeEnter: authenticated,
  };

  if (IsEnabled.prejudicesPage) return route;
}

const meditationPageRoute = function () {
  let route = {
    path: '/meditation/',
    component: MeditationPage,
    beforeEnter: authenticated,
  };

  if (IsEnabled.meditationPage) return route;
}


const commonDisordersPageRoute = function () {
  let route = {
    path: '/common-disorders/',
    component: CommonDisordersPage,
  };

  if (IsEnabled.commonDisordersPage) return route;
}

const symptomsPageRoute = function () {
  let route = {
    path: '/symptoms/',
    component: SymptomsPage,
    beforeEnter: authenticated,
  };

  if (IsEnabled.symptomsPage) return route;
}

const reasonsPageRoute = function () {
  let route = {
    path: '/reasons/',
    component: ReasonsPage,
    beforeEnter: authenticated,
  };

  if (IsEnabled.reasonsPage) return route;
}

const wellnessQuizPageRoute = function () {
  let route = {
    path: '/wellness-quiz/',
    component: WellnessQuizPage,
    beforeEnter: authenticated,
  };

  if (IsEnabled.wellnessQuizPage) return route;
}

const seekHelpPageRoute = function () {
  let route = {
    path: '/seek-help/',
    component: SeekHelpPage,
    beforeEnter: authenticated,
  };

  if (IsEnabled.seekHelpPage) return route

}


const myStatisticsPageRoute = function () {
  let route = {
    path: '/my-statistics/',
    component: MyStatisticsPage,
    // beforeEnter: authenticated,
  };

  if (IsEnabled.MyStatisticsPage) return route;
}


const tipsPageRoute = function () {
  let route = {
    path: '/tips/:category',
    component: TipsPage,
    beforeEnter: authenticated,
  };

  if (IsEnabled.tipsPage) return route;
}


const loginPageRoute = function () {
  return {
    path: "/login/",
	component: LoginPage,
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
  wellnessQuizPageRoute(),
  heartBeatPageRoute(),
  tipsPageRoute(),
  myStatisticsPageRoute(),
  prejudicesPageRoute(),
  meditationPageRoute(),
  commonDisordersPageRoute(),
  symptomsPageRoute(),
  reasonsPageRoute(),
  seekHelpPageRoute(),

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
