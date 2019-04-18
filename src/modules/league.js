import types from '@/types/league';
import globalTypes from '@/types/global';
import Vue from 'vue';
import { openHttp } from '@/utils/http';

const state = {
    user: null,
    logged: !!window.localStorage.getItem('_token')
};

const actions = {
    
    [types.actions.create]: ({ commit}, createLeague) => {
        //commit(globalTypes.mutations.starProcessing);
        return new Promise((resolve, reject) =>  {
            openHttp.post('/league/create', createLeague)
                .then(league => {
                    resolve(league);
                })
                .catch(err => {
                    console.log(err)
                    reject(err);
                })
                /*.finally(() => {
                    commit(globalTypes.mutations.stopProcessing);
                }) */
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
    
};

export default {
    state,
    actions,
    getters,
    mutations
};