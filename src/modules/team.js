import types from '@/types/team';
import globalTypes from '@/types/global';
import Vue from 'vue';
import { openHttp, authHttp } from '@/utils/http';

const state = {

};

const actions = {
    
    // create team
    [types.actions.createTeam]: ({ commit}, data) => {
        commit(globalTypes.mutations.startProcessing);
        return new Promise((resolve, reject) =>  {
            authHttp.post('/team/', data)
                .then(team => {
                    resolve(team);
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

    // get all teams
    [types.actions.getTeams]: ({ commit }) => {
        commit(globalTypes.mutations.startProcessing);
        return new Promise((resolve, reject) =>  {
            authHttp.get('/team/findall')
                .then(teams => {
                    resolve(teams);
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

    // get one team
    [types.actions.getTeam]: ({ commit}, idTeam) => {
        commit(globalTypes.mutations.startProcessing);
        return new Promise((resolve, reject) =>  {
            authHttp.get(`/team/${idTeam}`)
                .then(team => {
                    resolve(team);
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

    // update team
    [types.actions.updateTeam]: ({ commit}, data) => {
        commit(globalTypes.mutations.startProcessing);
        return new Promise((resolve, reject) =>  {
            authHttp.put(`/team/${data.id}`, data)
                .then(team => {
                    resolve(team);
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

    // delete team
    [types.actions.deleteTeam]: ({ commit}, data) => {
        commit(globalTypes.mutations.startProcessing);
        return new Promise((resolve, reject) =>  {
            authHttp.put(`/team/delete/${data.id}`)
                .then(team => {
                    resolve(team);
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

    // get all players by team
    [types.actions.getPlayersByTeam]: ({ commit}, idTeam) => {
        commit(globalTypes.mutations.startProcessing);
        return new Promise((resolve, reject) =>  {
            authHttp.get(`/team/${idTeam}/players`)
                .then(players => {
                    resolve(players);
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