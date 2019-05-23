<template>
  <table class="table">
    <thead>
    </thead>
    <tbody>
    <tr v-for="(item, index) in data" :key="index">
      <slot :row="item">
        <td v-for="column in columns" :key="column" v-if="hasValue(item, column)">{{ itemValue(item, column) }}</td>
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
