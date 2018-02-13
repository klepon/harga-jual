<template>
  <f7-page>
    
    <f7-navbar :title="setup.productDetailTileSuffix" back-link="Back"></f7-navbar>

    <ProductSummary />

    <ProductMaterial />

    <ProductHowTo />

    <f7-block>
      <f7-link @click="$f7router.back()">Kembali ke {{setup.productListTitle}}</f7-link>
    </f7-block>

  </f7-page>
</template>

<script>
import ProductSummary from '../partial/product-summary.vue';
import ProductMaterial from '../partial/product-material.vue';
import ProductHowTo from '../partial/product-how-to.vue';

export default {
  name: 'product-detail',
  components: {
    ProductSummary,
    ProductMaterial,
    ProductHowTo,
  },
  beforeMount() {
    this.totalCost = this.getTotalCost();
  },
  methods: {
    getTotalCost() {
      const newTotalCost = (this.products[this.$f7route.params.id].ingredients)
        .reduce((total, item) => ({ price: (total.price) + (item.price) }));

      return newTotalCost.price;
    },

    getSuggestionSellingPrice() {
      const unitCost = (this.totalCost / this.products[this.$f7route.params.id].qtt) * 1;
      return `${this.setup.currency} ${unitCost + (unitCost * 0.20)}`;
    },

    getSingleProfit() {
      const product = this.products[this.$f7route.params.id];

      if (product.sellingPrice <= 0) {
        return `<br />${this.setup.setPriceText}`;
      }

      this.totalCost = typeof (this.totalCost) === 'undefined' ? this.getTotalCost() : this.totalCost;
      return `<br />${this.setup.singleProfitLabel} ${this.setup.currency} ${product.sellingPrice - (this.totalCost / product.qtt)}`;
    },

    getTotalProfit() {
      const product = this.products[this.$f7route.params.id];

      if (product.sellingPrice > 0) {
        this.totalCost = typeof (this.totalCost) === 'undefined' ? this.getTotalCost() : this.totalCost;
        return `<br />${this.setup.totalProfitLabel} ${this.setup.currency} ${(product.sellingPrice * product.qtt) - this.totalCost}`;
      }

      return '';
    },

    getActiveClass(i) {
      return i === this.$f7route.params.id ? 'active' : '';
    },

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
      totalCost: 0,
      currentHover: -1,
      currentEdited: -1,
      setup: this.$store.state.setup,
      products: this.$store.state.products,
    }
  }
}
</script>
