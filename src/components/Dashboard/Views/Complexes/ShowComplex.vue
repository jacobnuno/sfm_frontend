<template>
<div class="content" id="smf-show-complex">
    <div class="container-fluid">
      <div class="row">
        <div class="col-sm-12 col-md-10 offset-md-1">
          <card>
            <h4 slot="header" class="card-title">Unidades</h4>

            <div class="row">
              <div class="col-sm-12 col-md-4">
                <div class="form-group col-sm-12">
                  <label for="ComplexName">Nombre</label>
                  <span class="span-input form-control">{{ ComplexName }}</span>
                </div>
              </div>
              <div class="col-sm-12 col-md-8">
                <div class="form-group col-sm-12">
                  <label for="Address">Ubicación</label>
                  <span class="span-input form-control">{{ Address }}</span>
                </div>
              </div>
            </div>

            <div class="row map">
              <div class="col-sm-12">
                <gmap-map
                  :center="{lat: parseFloat(this.Latitude), lng: parseFloat(this.Longitude)}"
                  :zoom="15"
                  style="width:100%;  height: 400px;"
                >
                  <gmap-marker
                    :key="index"
                    v-for="(m, index) in markers"
                    :position="m.position"
                    @click="center=m.position"
                  ></gmap-marker>
                </gmap-map>
              </div>
            </div>       
            <router-link class="btn btn-danger btn-close float-right" :to="{ name: 'Complexes' }">
              Cerrar
            </router-link>
          </card>
        </div>
      </div>
    </div>
  </div>
  
</template>
<script> 
 import { API_KEY } from '@/components/Dashboard/Views/Maps/API_KEY';
  import Vue from 'vue'
  import * as VueGoogleMaps from 'vue2-google-maps'
  Vue.use(VueGoogleMaps, {
    load: {
      key: API_KEY,
      libraries: 'places'
    }
  })
  import Card from 'src/components/UIComponents/Cards/Card.vue';
  import complexTypes from '@/types/complex';
  import { mapActions } from 'vuex';

  export default {
    components: {
      Card
    },
    data () {
      return {
        id: null,
        ComplexName: null,
        Latitude: null,
        Longitude: null,
        Address: null,
        markers: [],
        places: []
      }
    },
    created() {      
      this.id = this.$route.params.id;
      this.getData();
      
    },
    methods: {
      ...mapActions({
        getComplex: complexTypes.actions.getComplex
      }),
      getData() {
       this.getComplex(this.id)
          .then(complex => {
              this.ComplexName = complex.data.data.ComplexName
              this.Latitude = complex.data.data.Latitude
              this.Longitude = complex.data.data.Longitude
              this.Address = complex.data.data.Address
              this.currentPlace = this.Address
              this.addMarker();
          })
          .catch(err => console.log('err: ', err))
      },
      setPlace(place) {
        this.currentPlace = place;
      },
      addMarker() {
        const marker = {
          lat: parseFloat(this.Latitude),
          lng: parseFloat(this.Longitude)
        };
        this.markers.push({ position: marker });
        this.places.push(this.currentPlace);
        this.center = marker;
        this.currentPlace = null;
      }
    }
  }

</script>

<style lang="scss">
  #smf-show-complex {
    .span-input {
      background-color: #F5F5F5;
      color: #888888;
      cursor: not-allowed;
      border: 1px solid #E3E3E3;
      border-radius: 4px;
      display: block;
      padding: .4em .6em;
    }
    .map {
      margin-bottom: 1em;
    }
    .google-autocomplete {
      text-align: center;
      label {
        width: 65%;
        input {
          width: 80%;
          background-color: #F5F5F5;
          color: #888888;
          border: 1px solid #E3E3E3;
          border-radius: 4px;
          padding: .3em;
          height: 3em;
          //display: block;
        }
        button {
            width: 5.5em;
            height: 3em;
            border-color: #3472F7;
            color: #3472F7;
            border-radius: 4px;
            border-width: 2px;
            background-color: transparent;
            font-weight: 400;
            opacity: 0.8;
            padding: 8px 16px
          }
      }
    }
  }
</style>
