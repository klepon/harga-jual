<template>
    <f7-block>
      <f7-block-header>{{setup.productProcessingTitle}}</f7-block-header>
      <div>
        <i @click="currentEdited = $f7route.params.id" class="f7-icons icon-bold size-15 color-blue">compose</i>

        <div v-show="!isEdited($f7route.params.id)" v-html="products[$f7route.params.id].processing" />
        <div v-show="isEdited($f7route.params.id)">
          <wysiwyg v-model="products[$f7route.params.id].processing" />
          <i @click="resetEdited()" class="f7-icons icon-bold size-15 color-blue">check</i>
        </div>
      </div>
    </f7-block>
</template>

<script>
export default {
  name: 'product-how-to',
  methods: {

    isEdited(id) {
      return id === this.currentEdited;
    },

    resetEdited() {
      this.currentEdited = -1;
    },
  },
  data() {
    return {
      currentEdited: -1,
      setup: this.$store.state.setup,
      products: this.$store.state.products,
    }
  }
}
</script>
