<template>
  <f7-block>
    <f7-block-header>{{products[$f7route.params.id].name}}</f7-block-header>

    <p v-bind="products">{{setup.productTotalCost}} {{setup.currency}} {{totalCost}}
      <br />
      {{setup.productQttLabel}} {{products[$f7route.params.id].qtt}}
      <br />
      {{setup.selingPriceSuggestion}} {{getSuggestionSellingPrice()}}
      <br />
      {{setup.selingPriceSelected}} {{setup.currency}}
      <input v-model="products[$f7route.params.id].sellingPrice" />

      <span v-html="getSingleProfit()" />
      <span v-html="getTotalProfit()" />
    </p>
  </f7-block>
</template>

<script>
export default {
  name: 'product-summary',
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
  },
  data() {
    return {
      totalCost: 0,
      setup: this.$store.state.setup,
      products: this.$store.state.products,
    }
  }
}
</script>
