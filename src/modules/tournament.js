import types from '@/types/tournament';
import globalTypes from '@/types/global';
import Vue from 'vue';
import { openHttp } from '@/utils/http';

const state = {

};

const actions = {
    
    // create tournament
    [types.actions.createTournament]: ({ commit}, data) => {
        commit(globalTypes.mutations.startProcessing);
        return new Promise((resolve, reject) =>  {
            openHttp.post('/tournament/', data)
                .then(tournament => {
                    resolve(tournament);
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

    // get all tournaments
    [types.actions.getTournaments]: ({ commit }) => {
        commit(globalTypes.mutations.startProcessing);
        return new Promise((resolve, reject) =>  {
            openHttp.get('/tournament/findall')
                .then(tournaments => {
                    resolve(tournaments);
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

    // get one tournament
    [types.actions.getTournament]: ({ commit}, idTournament) => {
        commit(globalTypes.mutations.startProcessing);
        return new Promise((resolve, reject) =>  {
            openHttp.get(`/tournament/${idTournament}`)
                .then(tournament => {
                    resolve(tournament);
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

    // update tournament
    [types.actions.updateTournament]: ({ commit}, data) => {
        commit(globalTypes.mutations.startProcessing);
        return new Promise((resolve, reject) =>  {
            openHttp.put(`/tournament/${data.id}`, data)
                .then(tournament => {
                    resolve(tournament);
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

    // delete tournament
    [types.actions.deleteTournament]: ({ commit}, data) => {
        commit(globalTypes.mutations.startProcessing);
        return new Promise((resolve, reject) =>  {
            openHttp.put(`/tournament/delete/${data.id}`)
                .then(tournament => {
                    resolve(tournament);
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