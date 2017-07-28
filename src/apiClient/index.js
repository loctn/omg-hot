import request from 'superagent'


const getJson = (url) => request
  .get(url)
  .set('Accept', 'application/json')
  .then(res => res.body)

export const get16DayForecast = (lat, lng) =>
  getJson(`http://api.openweathermap.org/data/2.5/forecast/daily?lat=${lat}&lon=${lng}&cnt=16&APPID=${process.env.OWM_API_KEY}`)