<template>
    <section id="smf-edit-complex">
        <form @submit.prevent="beforeUpdateComplex" class="col-sm-12 col-md-10 offset-md-1">
            <h2 class="edit-title">Editar una Unidad</h2>
            
            <div class="row">
                <div class="form-group col-sm-12 col-md-4">
                    <label for="ComplexName">Nombre de la Unidad</label>
                    <input type="text" autocomplete="off" class="form-control" id="ComplexName" v-model="ComplexName" v-validate="'required|alpha_spaces'" data-vv-name="ComplexName" placeholder="Ingresa el nombre" required>
                    <div class="invalid-feedback">{{ errors.first("ComplexName") }}</div>
                </div>

                <div class="form-group col-sm-12 col-md-8 google-autocomplete">
                    <label class="autocomplete">Dirección de la Unidad</label>
                    <gmap-autocomplete
                        @place_changed="setPlace">
                    </gmap-autocomplete>
                    <button @click="addMarker" type="button" class="btn btn-primary">Agregar</button>
                </div>
            </div>

            <div class="row map">
              <div class="col-sm-12">
                <gmap-map
                  :center="center"
                  :zoom="15"
                  style="width:100%;  height: 350px;"
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
            
            <span class="alert alert-danger validation-error" v-if="error">A ocurrido un error</span>
            
            <div class="text-center buttons">
                <div class="form-group">
                    <button type="submit" class="btn btn-primary">Guardar</button>
                    <router-link class="btn btn-danger btn-close" :to="{ name: 'Complexes' }">
                        Cerrar
                    </router-link>
                </div>
            </div>
        </form>
    </section>
</template>

<script>
import complexTypes from '@/types/complex';
import { mapActions } from 'vuex';

export default {
    data() {
        return {
            id: null,
            ComplexName: null,
            Latitude: null,
            Longitude: null,
            Address: null,
            center: { lat: 45.508, lng: -73.587 },
            markers: [],
            places: [],
            currentPlace: null,
            error: null
        }
    },
    created() {      
      this.id = this.$route.params.id;
      this.getData();
    }, 
    methods: {
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
         ...mapActions({
            updateComplex: complexTypes.actions.updateComplex,
            getComplex: complexTypes.actions.getComplex
        }),
        getData() {
            this.getComplex(this.id)
                .then(complex => {
                    console.log(complex)
                    this.ComplexName = complex.data.data.ComplexName
                    this.Latitude = complex.data.data.Latitude
                    this.Longitude = complex.data.data.Longitude
                    this.Address = complex.data.data.Address
                    this.currentPlace = complex.data.data.Address
                    this.addMarkerFirst(this.Latitude, this.Longitude)
                })
                .catch(err => console.log('err: ', err))
        },
        beforeUpdateComplex() {
            this.$validator.validateAll()
            if (!this.errors.any()) {
                this.updateComplex({
                    id: this.id,
                    ComplexName: this.ComplexName,
                    Address: this.Address,
                    Latitude: this.Latitude,
                    Longitude: this.Longitude
                })
                .then(
                    complex => {
                        this.notifyVue('top', 'right', '¡Actualizado exitosamente!', 'success')
                        this.$router.push({ name: 'Complexes'});
                    },
                    error => {
                        console.log(error)
                        this.notifyVue('top', 'right', error, 'danger')
                    }
                )
            }
        },
        setPlace(place) {
            this.currentPlace = place;
        },
        addMarker() {
            if (this.currentPlace) {
            this.Address = this.currentPlace.formatted_address
            const marker = {
                lat: this.currentPlace.geometry.location.lat(),
                lng: this.currentPlace.geometry.location.lng()
            };
            this.Latitude = marker.lat;
            this.Longitude = marker.lng;
            this.markers.pop()
            this.places.pop()
            this.markers.push({ position: marker });
            this.places.push(this.currentPlace);
            this.center = marker;
            this.currentPlace = null;
            }
        },
        addMarkerFirst(latitude, longitude) {
            const marker = {
                lat: parseFloat(latitude),
                lng: parseFloat(longitude)
            };
            this.markers.push({ position: marker });
            this.center = marker;
            this.currentPlace = null;
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
    #smf-edit-complex {
        .buttons {
            margin-top: 3em;
        }
        .edit-title {
            color: var(--primary) !important;
        }
        .validation-error {
            text-align: center;
            margin-bottom: 2em;
            width: 100%;
            display: block;
            border-radius: 4px;
        }
        .map {
            margin-bottom: 1em;
        }
        .google-autocomplete {
            .autocomplete {
                width: 55%;
                display: block;
            }
            input {
                width: 75%;
                background-color: #FFFFFF;
                color: #565656;
                border: 1px solid #E3E3E3;
                border-radius: 4px;
                padding: 8px 12px;
                height: 40px;

                &::placeholder {
                    color: #E3E3E3;
                }
            }
        }
    }
</style>


