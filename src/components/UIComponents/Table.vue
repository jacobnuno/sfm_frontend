<template>
  <table class="table">
    <thead>
      <slot name="columns">
        <th v-for="column in columns">{{column}}</th>
        <th>Detalles</th>
      </slot>
    </thead>
    <tbody>
    <tr v-for="item in data">
      <slot :row="item">
        <td v-for="column in columns" v-if="hasValue(item, column)">{{ itemValue(item, column) }}</td>
        <td>
          <button class="btn btn-primary btn-simple" v-on:click="send(redirectShow, item.id)">Ver</button>
          <button class="btn btn-warning btn-simple" v-on:click="send(redirectEdit, item.id)">Editar</button>
        </td>
      </slot>
    </tr>
    </tbody>
  </table>
</template>
<script>
  export default {
    name: 'l-table',
    props: {
      columns: Array,
      data: Array,
      redirectShow: String,
      redirectEdit: String
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
      }
    }
  }
</script>
<style>
</style>
