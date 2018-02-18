<template>
  <f7-block>

    <detailHeading
      v-bind:title="products[$f7route.params.id].name"
      v-bind:isEditSection="isEditSection"
      v-bind:sectionID="sectionID"
      v-on:setEditSection="i => $emit('setEditSection', i)"
    />

    <p>
      {{setup.productTotalCost}} {{setup.currency}} {{getTotalCost()}}
      <br />

      {{setup.productQttLabel}}
      <span v-show="!isItemEdited(0)">
        {{products[$f7route.params.id].qtt}}
        <em v-show="isEditSection" @click="$emit('setEditItem', 0)" class="icon icon-bold icon-click size-15 color-blue">edit</em>
      </span>
      <span v-show="isItemEdited(0)">
        <input v-on:keyup.enter="$emit('onSubmit', $event)" v-model="products[$f7route.params.id].qtt" autofocus />
        <em @click="$emit('setEditItem')" class="icon icon-bold icon-click size-15 color-blue">done</em>
      </span>
      <br />

      {{setup.sellingPrice}}:
      <br />

      &middot; {{setup.sellingPriceSuggestion}} {{getSuggestionSellingPrice()}}
      <br />

      &middot; {{setup.sellingPriceSelected}} {{setup.currency}}
        <span v-show="!isItemEdited(1)">
          {{products[$f7route.params.id].sellingPrice}}
          <em v-show="isEditSection" @click="$emit('setEditItem', 1)" class="icon icon-bold icon-click size-15 color-blue">edit</em>
        </span>
        <span v-show="isItemEdited(1)">
          <input v-on:keyup.enter="$emit('onSubmit', $event)" v-model="products[$f7route.params.id].sellingPrice" autofocus />
          <em @click="$emit('setEditItem')" class="icon icon-bold icon-click size-15 color-blue">done</em>
        </span>

      <span v-html="getSingleProfit()" />
      <span v-html="getTotalProfit()" />
    </p>
  </f7-block>
</template>

<script>
import helper from '../helper.js';
import detailHeading from './detail-heading.vue';

export default {
  name: 'product-summary',
  mixins: [helper],
  props: ['isEditSection', 'sectionID', 'editedItem'],
  components: {
    detailHeading,
  },
  methods: {
    getTotalCost() {
      const newTotalCost = (this.products[this.$f7route.params.id].ingredients)
        .reduce((total, item) => ({ price: (total.price * 1) + (item.price * 1) }));

      return this.totalCost = newTotalCost.price;
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
