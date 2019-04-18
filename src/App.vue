<template>
  <div :class="{'nav-open': $sidebar.showSidebar}">
    <notifications></notifications>
    <router-view></router-view>
    <div v-if="processing">
      <BlockUI :message="msg" :url="url"></BlockUI>
    </div>
  </div>
</template>

<script>
import globalTypes from '@/types/global';
import { mapGetters } from 'vuex';
import loadingGif from '@static/img/loading-wedges.gif';

  export default {
    data () {
      return {
        msg: 'Procesando la petición',
        url: loadingGif
      }
    },
    computed: {
      ...mapGetters({
        processing: globalTypes.getters.processing
      })
    }
  }
</script>
<style lang="scss">
  .vue-notifyjs.notifications{
    .list-move {
      transition: transform 0.3s, opacity 0.4s;
    }
    .list-item {
      display: inline-block;
      margin-right: 10px;

    }
    .list-enter-active {
      transition: transform 0.2s ease-in, opacity 0.4s ease-in;
    }
    .list-leave-active {
      transition: transform 1s ease-out, opacity 0.4s ease-out;
    }

    .list-enter {
      opacity: 0;
      transform: scale(1.1);

    }
    .list-leave-to {
      opacity: 0;
      transform: scale(1.2, 0.7);
    }
  }
</style>
