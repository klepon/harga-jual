<template>
  <f7-block>
    <f7-block-header>{{setup.productIngredientsTitle}}</f7-block-header>
    <div class="row"
      v-for="i in products[$f7route.params.id].ingredients"
      v-bind:key="i.id"
      @mouseover="currentHover = $f7route.params.id +'-'+ i.id"
      @mouseleave="resetHover()">
      <div v-show="!isEdited($f7route.params.id +'-'+ i.id)">
        <i @click="currentEdited = $f7route.params.id +'-'+ i.id" class="f7-icons icon-bold size-15 color-blue">gear_fill</i>

        {{i.qtt}}
        {{i.name}}
        ({{setup.currency}} {{i.price}})
      </div>

      <div v-show="isEdited($f7route.params.id +'-'+ i.id)">
        <input v-model="i.qtt" />
        <input v-model="i.name" />
        <input v-model="i.price" />
        <i @click="resetEdited()" class="f7-icons icon-bold size-15 color-blue">check</i>
      </div>

      <div v-show="isHover($f7route.params.id +'-'+ i.id)" class="editor">
        <i @click="currentEdited = $f7route.params.id +'-'+ i.id" class="f7-icons icon-bold size-15 color-blue">compose</i>
        <i class="f7-icons size-15 color-red">trash</i>
      </div>
    </div>
  </f7-block>

</template>

<script>
export default {
  name: 'product-material',
  methods: {
    isHover(id) {
      return id === this.currentHover && id !== this.currentEdited;
    },

    isEdited(id) {
      return id === this.currentEdited;
    },

    resetHover() {
      this.currentHover = -1;
    },

    resetEdited() {
      this.currentEdited = -1;
    },
  },
  data() {
    return {
      currentHover: -1,
      currentEdited: -1,
      setup: this.$store.state.setup,
      products: this.$store.state.products,
    }
  }
}
</script>
