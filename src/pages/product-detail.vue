<template>
  <f7-page>

    <f7-navbar :title="setup.productDetailTileSuffix" back-link="Back"></f7-navbar>

    <productSummary
      v-bind:isEditSection="editedSection === 0"
      v-bind:sectionID="0"
      v-on:setEditSection="setEditSection"
      v-bind:editedItem="editedItem"
      v-on:setEditItem="setEditItem"
      v-on:onSubmit="onSubmit" />

    <productMaterial
      v-bind:isEditSection="editedSection === 1"
      v-bind:sectionID="1"
      v-on:setEditSection="setEditSection"
      v-bind:editedItem="editedItem"
      v-on:setEditItem="setEditItem"
      v-on:onSubmit="onSubmit" />

    <productHowTo
      v-bind:isEditSection="editedSection === 2"
      v-bind:sectionID="2"
      v-on:setEditSection="setEditSection"
      v-bind:editedItem="editedItem"
      v-on:setEditItem="setEditItem"
      v-on:onSubmit="onSubmit" />

    <f7-block>
      <f7-link @click="$f7router.back()">Kembali ke {{setup.productListTitle}}</f7-link>
    </f7-block>

  </f7-page>
</template>

<script>
import productSummary from '../partial/product-summary.vue';
import productMaterial from '../partial/product-material.vue';
import productHowTo from '../partial/product-how-to.vue';

export default {
  name: 'product-detail',
  components: {
    productSummary,
    productMaterial,
    productHowTo,
  },
  methods: {
    setEditSection(i) {
      this.editedSection = i;
      this.editedItem = -1;
    },

    setEditItem(i) {
      this.editedItem = typeof(i) === undefined ? -1 : i;
    },

    onSubmit(event) {
      event.preventDefault();
      this.editedItem = '';
    },
  },
  data() {
    return {
      editedSection: -1,
      editedItem: -1,
      setup: this.$store.state.setup,
    }
  }
}
</script>
