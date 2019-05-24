<template>
  <table class="table">
    <thead>
      <slot name="columns">
        <th v-for="column in columns" :key="column">{{column}}</th>
        <th>Opciones</th>
      </slot>
    </thead>
    <tbody>
    <tr v-for="(item, index) in data" :key="index">
      <slot :row="item">
        <td v-for="column in columns" :key="column" v-if="hasValue(item, column)">{{ itemValue(item, column) }}</td>
        <td>
          <button class="btn btn-primary btn-simple" v-on:click="send(redirectShow, item.id)">
            <fai :icon="['far', 'eye']" class="icons" />
          </button>
          <button class="btn btn-warning btn-simple" v-on:click="send(redirectEdit, item.id)">
            <fai :icon="['fas', 'pencil-alt']" class="icons" />
          </button>
          <button class="btn btn-danger btn-simple" v-on:click="areYouSureAlert(item.id)">
            <fai :icon="['fas', 'trash-alt']" class="icons" />
          </button>
        </td>
      </slot>
    </tr>
    <!--<tr v-if="!data.lenght">
      <td colspan="5" class="no-data">No se encontraron resultados</td>
    </tr> -->
    
    </tbody>
  </table>
</template>
<script>
import { mapActions } from 'vuex';
import fieldType from '@/types/field';
import leagueType from '@/types/league';
import userTypes from '@/types/userType';
import matchEventTypes from '@/types/matchEvent';
import users from '@/types/user';
import teams from '@/types/team';
import athletes from '@/types/athlete';
import matches from '@/types/match';
import matchDetailTypes from '@/types/matchDetail';
import complexTypes from '@/types/complex';

import { library } from '@fortawesome/fontawesome-svg-core'
import { faEye } from '@fortawesome/fontawesome-free-regular'
import { faPencilAlt } from '@fortawesome/fontawesome-free-solid'
import { faTrashAlt } from '@fortawesome/fontawesome-free-solid'
library.add(faEye)
library.add(faPencilAlt)
library.add(faTrashAlt)

  export default {
    name: 'l-table',
    props: {
      columns: Array,
      lenColumns: Int32Array,
      data: Array,
      redirectShow: String,
      redirectEdit: String,
      deleteAction: String
    },
    methods: {
      hasValue (item, column) {
        return item[column.toLowerCase()] !== 'undefined'
      },
      itemValue (item, column) {
        return item[column.toLowerCase()]
      },
      send(route, itemId) {
        this.$router.push({ name: route, params: { id: itemId } }) 
      },
      ...mapActions({
        deleteLeague: leagueType.actions.deleteLeague,
        deleteField: fieldType.actions.deleteField,
        deleteUserType: userTypes.actions.deleteUserType,
        deleteMatchEvent: matchEventTypes.actions.deleteMatchEvent,
        deleteUser: users.actions.deleteUser,
        deleteTeam: teams.actions.deleteTeam,
        deleteAthlete: athletes.actions.deleteAthlete,
        deleteMatch: matches.actions.deleteMatch,
        deleteMatchDetail: matchDetailTypes.actions.deleteMatchDetail,
        deleteComplex: complexTypes.actions.deleteComplex,
      }),
      notifyVue (verticalAlign, horizontalAlign, msg, color) {
            const notification = {
            template: `<span>${ msg }.</span>`
            }

            this.$notifications.notify(
            {
                component: notification,
                icon: 'nc-icon nc-app',
                horizontalAlign: horizontalAlign,
                verticalAlign: verticalAlign,
                type: color
            })
        },
      areYouSureAlert(itemId) {
        this.$swal({
          title: '¿Estás seguro?',
          text: 'No podrás revertir esta acción',
          type: 'warning',
          showCancelButton: true,
          confirmButtonText: 'Eliminar',
          cancelButtonText: 'Cancelar',
          showCloseButton: true,
          showLoaderOnConfirm: true
        }).then((result) => {
          if(result.value) {
            this[`${this.deleteAction}`]({
                id: itemId
            })
            .then(
                res => {
                    this.notifyVue('top', 'right', 'Eliminado exitosamente!', 'success')
                    location.reload();
                },
                error => {
                    console.log(error)
                    this.notifyVue('top', 'right', error, 'danger')
                }
            )
          }
        })
      }
    }
  }
</script>
<style>
  .no-data {
      background-color: #ffbc67;
      text-align: center;
  }
</style>
