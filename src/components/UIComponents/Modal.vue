<template>
    <div class="customModal" v-if="showModal">
    <div class="customModalTitle">
      <button class="close" @click.prevent="showModal = !showModal">&times;</button>
      {{ title }}
    </div>
    <div class="customModalBody">
      <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Magnam tenetur veritatis saepe natus? Ex sunt, maxime quod hic repudiandae incidunt eligendi autem dignissimos mollitia, vel laborum quasi expedita ullam voluptate veniam nesciunt sequi est necessitatibus. Eum repellat nam animi laudantium?</p>
    </div>
  </div>
</template>


<script>
export default {
    props: {
      title: String
    },
    data() {
        return {
            showModal: false
        }
    }
}
</script>

<style lang="scss">
    .customModal {
        box-shadow: 0px 1px 12px rgba(0,0,0,0.4);
        left: calc(50vw - 300px);
        position: absolute;
        z-index: 999;
        width: 600px;
        top: 20vh;
        border-radius: 5px;
        overflow: hidden;
        
        .customModalTitle {
            background-color: #eee;
            text-align: left;
            padding: 8px 12px;
            font-size: 1.5em;
            .close {
            line-height: 32px;
            color: $purple;
            }
        }
        .customModalBody {
            background-color: #fff;
            padding: 8px 12px;
            text-align: left;
            padding: 12px;
        }
        .customModalFooter {
            background-color: #eee;
            padding: 4px 12px;
            text-align: left;
        }
    }
</style>
