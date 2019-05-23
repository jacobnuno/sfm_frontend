<template>
    <div class="wrapper wrapper-full-page section content">
      <div class="">
        <div class="container">
          <div class="row">
            <div class="col-md-12 text-center not-found">
              <h2 class="title text-danger number">404</h2>
              <h2 class="title">Oops! Parece ser que está página no existe.</h2>
              <router-link class="btn btn-link back-home" :to="{ name: 'Overview' }">
                Regresar al Inicio
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
  export default {}

</script>

<style lang="scss">
  .not-found {
    margin-top: 25%;
    .number {
      font-size: 5em;
      -webkit-animation: spin-360 5s infinite;
    }
    .back-home{
      margin-top: 2em;
    }
  }

  @-webkit-keyframes spin-360 {
    from {
      -webkit-transform: rotate(0deg);
    }
    to {
      -webkit-transform: rotate(360deg);
    }
  }
</style>


