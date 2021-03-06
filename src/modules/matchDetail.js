import types from '@/types/matchDetail';
import globalTypes from '@/types/global';
import Vue from 'vue';
import { authHttp } from '@/utils/http';

const state = {

};

const actions = {
    
    // create matchDetail
    [types.actions.createMatchDetail]: ({ commit}, data) => {
        commit(globalTypes.mutations.startProcessing);
        return new Promise((resolve, reject) =>  {
            authHttp.post('/matchdetail/', data)
                .then(matchDetail => {
                    resolve(matchDetail);
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

    // get all matchDetails
    [types.actions.getMatchDetails]: ({ commit }) => {
        commit(globalTypes.mutations.startProcessing);
        return new Promise((resolve, reject) =>  {
            authHttp.get('/matchdetail/findall')
                .then(matchDetails => {
                    resolve(matchDetails);
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

    // get one matchDetail
    [types.actions.getMatchDetail]: ({ commit }, idMatchDetail) => {
        commit(globalTypes.mutations.startProcessing);
        return new Promise((resolve, reject) =>  {
            authHttp.get(`/matchdetail/findOneById/${idMatchDetail}`)
                .then(matchDetail => {
                    resolve(matchDetail);
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

    // get all matchDetails by match
    [types.actions.getMatchDetailByMatch]: ({ commit }, idMatch) => {
        commit(globalTypes.mutations.startProcessing);
        return new Promise((resolve, reject) =>  {
            authHttp.get(`/matchdetail/${idMatch}`)
                .then(matchDetails => {
                    resolve(matchDetails);
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

    // update matchDetail
    [types.actions.updateMatchDetail]: ({ commit}, data) => {
        commit(globalTypes.mutations.startProcessing);
        return new Promise((resolve, reject) =>  {
            authHttp.put(`/matchdetail/${data.id}`, data)
                .then(matchDetail => {
                    resolve(matchDetail);
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

    // delete matchDetail
    [types.actions.deleteMatchDetail]: ({ commit}, data) => {
        commit(globalTypes.mutations.startProcessing);
        return new Promise((resolve, reject) =>  {
            authHttp.put(`/matchdetail/delete/${data.id}`)
                .then(matchDetail => {
                    resolve(matchDetail);
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