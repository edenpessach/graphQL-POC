/**
 * Created by edenp on 13/09/2017.
 */

const axios = require('axios');

const instance = axios.create({
    baseURL: 'http://10.239.0.156/api/v3',
    timeout: 3000,
    headers: {'authentication-token': 'WyIwIiwiMGQ3NmFjYTA2NzBkNDJhYWEyNzUyYTM5Y2MxMzIzYTkiXQ.DJq6WA.XxoGQCie5mZkowty_0ELNzn9iOE', tenant: 'default_tenant'}
});

module.exports = instance;

