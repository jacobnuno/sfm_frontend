import types from '@/types/match';
import globalTypes from '@/types/global';
import Vue from 'vue';
import { openHttp } from '@/utils/http';

const state = {

};

const actions = {
    
    // create match
    [types.actions.createMatch]: ({ commit}, data) => {
        console.log(data)
        commit(globalTypes.mutations.startProcessing);
        return new Promise((resolve, reject) =>  {
            openHttp.post('/match/', data)
                .then(match => {
                    resolve(match);
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

    // get all matches
    [types.actions.getMatches]: ({ commit }) => {
        commit(globalTypes.mutations.startProcessing);
        return new Promise((resolve, reject) =>  {
            openHttp.get('/match/findall')
                .then(matches => {
                    resolve(matches);
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

    // get one match
    [types.actions.getMatch]: ({ commit}, idMatch) => {
        commit(globalTypes.mutations.startProcessing);
        return new Promise((resolve, reject) =>  {
            openHttp.get(`/match/${idMatch}`)
                .then(match => {
                    resolve(match);
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

    // update match
    [types.actions.updateMatch]: ({ commit}, data) => {
        commit(globalTypes.mutations.startProcessing);
        return new Promise((resolve, reject) =>  {
            openHttp.put(`/match/${data.id}`, data)
                .then(match => {
                    resolve(match);
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

    // delete match
    [types.actions.deleteMatch]: ({ commit}, data) => {
        commit(globalTypes.mutations.startProcessing);
        return new Promise((resolve, reject) =>  {
            openHttp.put(`/match/delete/${data.id}`)
                .then(match => {
                    resolve(match);
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