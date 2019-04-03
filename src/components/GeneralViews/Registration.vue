<template>
  
</template>

<script>
  export default {}

</script>

<style>
    /*//////////////////////////////////////////////////////////////////
[ register ]*/

.limiter {
  width: 100%;
  margin: 0 auto;
}

.container-register {
  width: 100%;  
  min-height: 100vh;
  display: -webkit-box;
  display: -webkit-flex;
  display: -moz-box;
  display: -ms-flexbox;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  padding: 15px;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  
  position: relative;
  z-index: 1;
}

.container-register::before {
  content: "";
  display: block;
  position: absolute;
  z-index: -1;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background: #005bea;
  background: -webkit-linear-gradient(bottom, #005bea, #00c6fb);
  background: -o-linear-gradient(bottom, #005bea, #00c6fb);
  background: -moz-linear-gradient(bottom, #005bea, #00c6fb);
  background: linear-gradient(bottom, #005bea, #00c6fb);
  opacity: 0.9;
}

.wrap-register {
  width: 390px;
  background: transparent;
}



/*------------------------------------------------------------------
[  ]*/
.register-form {
  width: 100%;
  display: -webkit-box;
  display: -webkit-flex;
  display: -moz-box;
  display: -ms-flexbox;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
}

.register-form-title {
  font-family: Montserrat-ExtraBold;
  font-size: 2.6em;
  color: #fff;
  line-height: 1.2;
  text-align: center;
  margin-bottom: 2em;
  width: 100%;
  display: block;
  font-weight: bold;
}

/*---------------------------------------------*/
.register-form-avatar {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  overflow: hidden;
  margin: 0 auto;
}
.register-form-avatar img {
  width: 100%;
}


/*---------------------------------------------*/
.wrap-input {
  position: relative;
  width: 100%;
  z-index: 1;
}

.input::placeholder {
    color: #B3B7BC;
}

.input {
  font-family: Montserrat-Bold;
  font-size: 1.5em;
  line-height: 1.2;
  color: #333333;
  border-color: transparent;
  display: block;
  width: 100%;
  background: #fff;
  height: 50px;
  margin: 0 0 2em 0;
  border-radius: 25px;
  padding: 0 30px 0 53px;
}

.forgot-credentials {
    margin-top: 1.7em;
    width: 100%;
}

.new-account {
    margin-top: 4.7em;
    width: 100%;
}

.symbol-input {
  font-size: 1.5em;
  color: #999999;

  display: -webkit-box;
  display: -webkit-flex;
  display: -moz-box;
  display: -ms-flexbox;
  display: flex;
  align-items: center;
  position: absolute;
  border-radius: 25px;
  bottom: 1em;
  left: -0.2em;
  width: 100%;
  height: 100%;
  padding-left: 30px;
  pointer-events: none;

  -webkit-transition: all 0.4s;
  -o-transition: all 0.4s;
  -moz-transition: all 0.4s;
  transition: all 0.4s;
}

.container-register-form-btn {
  width: 100%;
  display: -webkit-box;
  display: -webkit-flex;
  display: -moz-box;
  display: -ms-flexbox;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}

.register-form-btn {
  font-family: Montserrat-Bold;
  font-size: 1.5em;
  line-height: 1.5;
  color: #e0e0e0;
  border: transparent;
  width: 100%;
  height: 50px;
  border-radius: 25px;
  background: #333333;
  display: -webkit-box;
  display: -webkit-flex;
  display: -moz-box;
  display: -ms-flexbox;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 25px;
  
  -webkit-transition: all 0.4s;
  -o-transition: all 0.4s;
  -moz-transition: all 0.4s;
  transition: all 0.4s;

  position: relative;
  z-index: 1;
}

.register-form-btn::before {
  content: "";
  display: block;
  position: absolute;
  z-index: -1;
  width: 100%;
  height: 100%;
  border-radius: 25px;
  top: 0;
  left: 0;
  background: #005bea;
  background: -webkit-linear-gradient(left, #005bea, #00c6fb);
  background: -o-linear-gradient(left, #005bea, #00c6fb);
  background: -moz-linear-gradient(left, #005bea, #00c6fb);
  background: linear-gradient(left, #005bea, #00c6fb);
  -webkit-transition: all 0.4s;
  -o-transition: all 0.4s;
  -moz-transition: all 0.4s;
  transition: all 0.4s;
  opacity: 0;
}

.register-form-btn:hover {
  background: transparent;
  color: #fff;
  cursor: pointer;
}

.register-form-btn:hover:before {
  opacity: 1;
}

@media (max-width: 576px) {
  .wrap-register {
    padding-top: 80px;
    padding-left: 15px;
    padding-right: 15px;
  }
}
</style>
