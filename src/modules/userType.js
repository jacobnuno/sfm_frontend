import types from '@/types/userType';
import globalTypes from '@/types/global';
import Vue from 'vue';
import { authHttp } from '@/utils/http';

const state = {

};

const actions = {
    
    // create userType
    [types.actions.createUserType]: ({ commit}, data) => {
        commit(globalTypes.mutations.startProcessing);
        return new Promise((resolve, reject) =>  {
            authHttp.post('/usertype/', data)
                .then(userType => {
                    resolve(userType);
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

    // get all userTypes
    [types.actions.getUserTypes]: ({ commit }) => {
        commit(globalTypes.mutations.startProcessing);
        return new Promise((resolve, reject) =>  {
            authHttp.get('/usertype/findall')
                .then(userTypes => {
                    resolve(userTypes);
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

    // get one userType
    [types.actions.getUserType]: ({ commit}, idUserType) => {
        commit(globalTypes.mutations.startProcessing);
        return new Promise((resolve, reject) =>  {
            authHttp.get(`/usertype/${idUserType}`)
                .then(userType => {
                    resolve(userType);
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

    // update userType
    [types.actions.updateUserType]: ({ commit}, data) => {
        commit(globalTypes.mutations.startProcessing);
        return new Promise((resolve, reject) =>  {
            authHttp.put(`/usertype/${data.id}`, data)
                .then(userType => {
                    resolve(userType);
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

    // delete userType
    [types.actions.deleteUserType]: ({ commit}, data) => {
        commit(globalTypes.mutations.startProcessing);
        return new Promise((resolve, reject) =>  {
            authHttp.put(`/usertype/delete/${data.id}`)
                .then(userType => {
                    resolve(userType);
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