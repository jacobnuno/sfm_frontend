import types from '@/types/day';
import globalTypes from '@/types/global';
import Vue from 'vue';
import { openHttp } from '@/utils/http';

const state = {

};

const actions = {
    
    // create day
    [types.actions.createDay]: ({ commit}, data) => {
        commit(globalTypes.mutations.startProcessing);
        return new Promise((resolve, reject) =>  {
            openHttp.post('/day/', data)
                .then(day => {
                    resolve(day);
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

    // get all days
    [types.actions.getDays]: ({ commit }) => {
        commit(globalTypes.mutations.startProcessing);
        return new Promise((resolve, reject) =>  {
            openHttp.get('/day/')
                .then(days => {
                    resolve(days);
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

    // get one day
    [types.actions.getDay]: ({ commit}, idDay) => {
        commit(globalTypes.mutations.startProcessing);
        return new Promise((resolve, reject) =>  {
            openHttp.get(`/day/${idDay}`)
                .then(day => {
                    resolve(day);
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

    // update day
    [types.actions.updateDay]: ({ commit}, data) => {
        commit(globalTypes.mutations.startProcessing);
        return new Promise((resolve, reject) =>  {
            openHttp.put(`/day/${data.id}`, data)
                .then(day => {
                    resolve(day);
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

    // delete day
    [types.actions.deleteDay]: ({ commit}, data) => {
        commit(globalTypes.mutations.startProcessing);
        return new Promise((resolve, reject) =>  {
            openHttp.put(`/day/delete/${data.id}`)
                .then(day => {
                    resolve(day);
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