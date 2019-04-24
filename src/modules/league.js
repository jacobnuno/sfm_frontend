import types from '@/types/league';
import globalTypes from '@/types/global';
import Vue from 'vue';
import { openHttp } from '@/utils/http';

const state = {
    user: null,
    logged: !!window.localStorage.getItem('_token'),
    leagues: []
};

const actions = {
    
    [types.actions.create]: ({ commit}, createLeague) => {
        commit(globalTypes.mutations.startProcessing);
        return new Promise((resolve, reject) =>  {
            openHttp.post('/league/create', createLeague)
                .then(league => {
                    resolve(league);
                })
                .catch(err => {
                    console.log(err)
                    reject(err);
                })
                .finally(() => {
                    commit(globalTypes.mutations.stopProcessing);
                })
        })
    },

    [types.actions.getLeagues]: ({ commit}, getLeagues) => {
        commit(globalTypes.mutations.startProcessing);
        return new Promise((resolve, reject) =>  {
            openHttp.get('/league/findall')
                .then(leagues => {
                    //commit('setLeagues', res.data.leagues)
                    resolve(leagues);
                })
                .catch(err => {
                    console.log(err)
                    reject(err);
                })
                .finally(() => {
                    commit(globalTypes.mutations.stopProcessing);
                })
        })
    },

    [types.actions.getLeague]: ({ commit}, idLeague) => {
        commit(globalTypes.mutations.startProcessing);
        return new Promise((resolve, reject) =>  {
            openHttp.get(`/league/${idLeague}`)
                .then(league => {
                    resolve(league);
                })
                .catch(err => {
                    console.log(err)
                    reject(err);
                })
                .finally(() => {
                    commit(globalTypes.mutations.stopProcessing);
                })
        })
    },

    [types.actions.updateLeague]: ({ commit}, data) => {
        commit(globalTypes.mutations.startProcessing);
        return new Promise((resolve, reject) =>  {
            openHttp.put(`/league/${data.id}`, data)
                .then(league => {
                    resolve(league);
                })
                .catch(err => {
                    console.log(err)
                    reject(err);
                })
                .finally(() => {
                    commit(globalTypes.mutations.stopProcessing);
                })
        })
    },

    /*[types.actions.updateUser]: ({ commit }, userCredentials) => {
        commit(globalTypes.mutations.starProcessing);
        return new Promise((resolve, reject) =>  {
            openHttp.put('/users/', userCredentials)
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
    }, */

    
};

const getters = {
   
};

const mutations = {
    setLeagues(state, leagues) {
        state.leagues = leagues
    },
};

export default {
    state,
    actions,
    getters,
    mutations
};