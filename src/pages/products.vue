<template>
  <f7-page>
    <f7-navbar :title="setup.storeName" back-link="Back"></f7-navbar>
    <f7-block-title>{{setup.productListTitle}}</f7-block-title>

    <f7-list>
      <f7-list-item
        v-for="(item, index) in products"
        v-bind:key="item.slug"
        :link="`/product-detail/${index}/`"
        :title="item.name">
        </f7-list-item>
    </f7-list>

  </f7-page>
</template>

<script>
export default {
  name: 'product-list',
  data() {
    return {
      setup: this.$store.state.setup,
      products: this.$store.state.products,
    };
  },
};
</script>
