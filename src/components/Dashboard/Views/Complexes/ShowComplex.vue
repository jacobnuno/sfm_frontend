<template>
<div class="content" id="smf-show-complex">
    <div class="container-fluid">
      <div class="row">
        <div class="col-sm-12 col-md-10 offset-md-1">
          <card>
            <h4 slot="header" class="card-title">Unidades</h4>

            <div class="row">
              <div class="col-sm-12 col-md-6">
                <div class="row">
                  <div class="form-group col-sm-12">
                    <label for="ComplexName">Nombre</label>
                    <span class="span-input form-control">{{ ComplexName }}</span>
                  </div>
                </div>
                <div class="row">
                  <div class="form-group col-sm-12">
                    <label for="Address">Ubicación</label>
                    <span class="span-input form-control">{{ Address }}</span>
                  </div>
                </div>
              </div>
              <!-- Google Map -->
              <div class="col-sm-12 col-md-6">
                <gmap-map
                  :center="center"
                  :zoom="12"
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
  import Card from 'src/components/UIComponents/Cards/Card.vue';
  import complexTypes from '@/types/complex';
  import { mapActions } from 'vuex';

  export default {
    components: {
      Card
    },
    data () {
      return {
        id: 1,
        ComplexName: null,
        Latitude: null,
        Longitude: null,
        Address: null,
        center: { lat: 45.508, lng: -73.587 },
        markers: [],
        places: [],
        currentPlace: null
      }
    },
    created() {      
      //this.id = this.$route.params.id;
      this.getData();
    },
    mounted() {
      this.geolocate();
    },
    methods: {
      ...mapActions({
        getComplex: complexTypes.actions.getComplex
      }),
      getData() {
       this.getComplex(this.id)
            .then(matchEvent => {
                this.ComplexName = matchEvent.data.data.ComplexName
                this.Latitude = matchEvent.data.data.Latitude
                this.Longitude = matchEvent.data.data.Longitude
                this.Address = matchEvent.data.data.Address
            })
            .catch(err => console.log('err: ', err))
      },
      geolocate: function() {
        navigator.geolocation.getCurrentPosition(position => {
          this.center = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };
        });
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
  }
</style>
