import {environment} from './environment';

export const endpoints = {
  register: `${environment.apiUrl}/auth/register`,
  logIn: `${environment.apiUrl}/auth/login`,
  logOut: `${environment.apiUrl}/auth/logout`,
  refresh: `${environment.apiUrl}/auth/refresh`,

  // airports
  coordinates: `${environment.apiUrl}/airports/coordinates`,

  // airports description
  getFlights: `${environment.apiUrl}/airports/flights`,
  getComments: `${environment.apiUrl}/airports/comments`,
  insertUserComment: `${environment.apiUrl}/airports/comments/new-comment`,

  // flights
  dailyStats: `${environment.apiUrl}/flights/dailyStats`,

  // recommendations
  getTopDestinations: `${environment.apiUrl}/cities/top`,

  // mail
  contactMail: `${environment.apiUrl}/send-mail`,

  // admin -> models
  getAlgorithm: `${environment.apiUrl}/models/algorithms`,
  getModel: `${environment.apiUrl}/models/models`,
  lastModels: `${environment.apiUrl}/models/lastModels`,
  updateModel: `${environment.apiUrl}/models/updateModel`,
  createTrainModel: `${environment.apiUrl}/models/training`,
  deleteModel: `${environment.apiUrl}/models/deleteModel`,
  predict: `${environment.apiUrl}/models/predict`,
  getModelInUse: `${environment.apiUrl}/models/getModelInUse`,

  // admin -> scrapers
  flightsHistory: `${environment.apiUrl}/scrapers/flights/history`,
  flightsForecast: `${environment.apiUrl}/scrapers/flights/forecast`,
  weatherHistory: `${environment.apiUrl}/scrapers/weathers/history`,
  weatherForecast: `${environment.apiUrl}/scrapers/weathers/forecast`,
  updateUrl: `${environment.apiUrl}/scrapers/airportia/url`,
  updateComments: `${environment.apiUrl}/scrapers/comments`,
  getCities: `${environment.apiUrl}/cities/cities`,
  getAirports: `${environment.apiUrl}/airports/airports`,
  getCountries: `${environment.apiUrl}/countries/countries`,

  // admin -> graphics
  groupFlightsData: `${environment.apiUrl}/flights/groupFlights`,
  getCitiesComments: `${environment.apiUrl}/comments/cities`,
  getDataComments: `${environment.apiUrl}/comments/data`,
  getAirportsFlights: `${environment.apiUrl}/flights/getGroupAirports`,
};
