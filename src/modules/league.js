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
    
    // create league
    [types.actions.create]: ({ commit}, createLeague) => {
        commit(globalTypes.mutations.startProcessing);
        return new Promise((resolve, reject) =>  {
            openHttp.post('/league/', createLeague)
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

    // get all leagues
    [types.actions.getLeagues]: ({ commit}, getLeagues) => {
        commit(globalTypes.mutations.startProcessing);
        return new Promise((resolve, reject) =>  {
            openHttp.get('/league/findall')
                .then(leagues => {
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

    // get one league
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

    // update league
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

    // delete league
    [types.actions.deleteLeague]: ({ commit}, data) => {
        commit(globalTypes.mutations.startProcessing);
        return new Promise((resolve, reject) =>  {
            openHttp.put(`/league/delete/${data.id}`)
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
    }
    
};

const getters = {
   
};

const mutations = {
    
};

export default {
    state,
    actions,
    getters,
    mutations
};