import types from '@/types/auth';
import globalTypes from '@/types/global';
import Vue from 'vue';
import { openHttp, authHttp } from '@/utils/http';

const state = {
    user: null,
    logged: !!window.localStorage.getItem('_token')
};

const actions = {
    [types.actions.login]: ({ commit }, userCredentials) => {
       // commit(globalTypes.mutations.starProcessing);
        return new Promise((resolve, reject) =>  {
            openHttp.post('/user/login', userCredentials)
                .then(user => {
                    window.localStorage.setItem('_token', user.body.token); // check correct name for the token field
                    commit(types.mutations.setUser);
                    resolve(user);
                })
                .catch(err => {
                    reject(err);
                }) /*
                .finally(() => {
                    commit(globalTypes.mutations.stopProcessing);
                }) */
        })
    },

    [types.actions.register]: ({ commit}, registerData) => {
        commit(globalTypes.mutations.starProcessing);
        return new Promise((resolve, reject) =>  {
            openHttp.post('/users/register', registerData)
                .then(user => {
                    resolve(user);
                })
                .catch(err => {
                    reject(err);
                })
                .finally(() => {
                    commit(globalTypes.mutations.stopProcessing);
                })
        })
    },

    [types.actions.updateUser]: ({ commit }, userCredentials) => {
        commit(globalTypes.mutations.starProcessing);
        return new Promise((resolve, reject) =>  {
            authHttp.put('/users/', userCredentials)
                .then(user => {
                    window.localStorage.setItem('_token', user.body.token); // check correct name for the token field
                    commit(types.mutations.setUser);
                    resolve(user);
                })
                .catch(err => {
                    reject(err);
                })
                .finally(() => {
                    commit(globalTypes.mutations.stopProcessing);
                })
        })
    },

    [types.actions.logout]: ({ commit }) => {
        window.localStorage.removeItem('_token');
        commit(types.mutations.setUser);
    }
};

const getters = {
    // get user
    [types.getters.users]: (state) => {
        return state.user;
    },
    // is logged
    [types.getters.logged]: (state) => {
        return state.logged;
    }
};

const mutations = {
    // set user from jwt token
    [types.mutations.setUser]: (state) => {
        if(window.localStorage.getItem(_token)) {
            const token = window.localStorage.getItem(_token);
            const jwtDecode = require('jwt-decode');
            state.user = jwtDecode(token);
            state.logged = true;
        } else {
            state.logged = false;
            state.user = null;
        }
    },

    // set state of user
    [types.mutations.setLogged]: (state, logged) => {
        state.logged = logged;
    }
};

export default {
    state,
    actions,
    getters,
    mutations
};
