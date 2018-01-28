<template>
  <div class="row">
    <div class="col-12 col-sm-5 col-md-4 sidebar">
      <h2>{{productListTitle}}</h2>

      <ul>
        <li v-for="(product, index) in products"
          v-bind:key="product.slug"
          v-on:click="openDetail(index)"
          :class="getActiveClass(index)">
          {{product.name}}
        </li>
      </ul>
    </div>

    <div class="col-12 col-sm-7 col-md-8">
      <h2>{{productDetailTileSuffix}} {{products[currentProductIndex].name}}</h2>

      <p>{{productTotalCost}} {{currency}} {{totalCost}}
        <br />
        {{productQttLabel}} {{products[currentProductIndex].qtt}}
        <br />
        {{selingPriceSugestion}} {{getSugestionSellingPrice()}}
        <br />
        {{selingPriceSelected}} {{currency}}
        <input v-model="products[currentProductIndex].sellingPrice" />

        <span v-html="getSingleProfit()" />
        <span v-html="getTotalProfit()" />
      </p>

      <h3>{{productIngredientsTitle}}</h3>

      <ul>
        <li v-for="i in products[currentProductIndex].ingredients"
          v-bind:key="i.id"
          v-o:mouseover="modifierTools">
          {{i.qtt}}
          {{i.name}}
          ({{currency}} {{i.price}})
          <span class="hide">xx</span>
        </li>
      </ul>

    </div>
  </div>
</template>

<script>
export default {
  name: 'ProductList',
  beforeMount() {
    this.totalCost = this.getTotalCost();
  },
  methods: {
    modifierTools() {
      return `<span class="oi oi-pencil" title="icon pencil" aria-hidden="true"></span>`;
    },

    openDetail(i) {
      this.currentProductIndex = i;
      this.totalCost = this.getTotalCost();
    },

    getTotalCost() {
      const totalCost = (this.products[this.currentProductIndex].ingredients)
        .reduce((total, item) => ({ price: (total.price) + (item.price) }));

      return totalCost.price;
    },

    getSugestionSellingPrice() {
      const unitCost = (this.totalCost / this.products[this.currentProductIndex].qtt) * 1;
      return `${this.currency} ${unitCost + (unitCost * 0.20)}`;
    },

    getSingleProfit() {
      const product = this.products[this.currentProductIndex];

      if (product.sellingPrice <= 0) {
        return `<br />${this.setPriceText}`;
      }

      this.totalCost = typeof (this.totalCost) === 'undefined' ? this.getTotalCost() : this.totalCost;
      return `<br />${this.singleProfitLabel} ${this.currency} ${product.sellingPrice - (this.totalCost / product.qtt)}`;
    },

    getTotalProfit() {
      const product = this.products[this.currentProductIndex];

      if (product.sellingPrice > 0) {
        this.totalCost = typeof (this.totalCost) === 'undefined' ? this.getTotalCost() : this.totalCost;
        return `<br />${this.totalProfitLabel} ${this.currency} ${(product.sellingPrice * product.qtt) - this.totalCost}`;
      }

      return '';
    },

    getActiveClass(i) {
      return i === this.currentProductIndex ? 'active' : '';
    },
  },
  data() {
    return {
      currency: 'Rp',
      totalCost: 0,
      currentProductIndex: 0,
      productListTitle: 'Daftar Produk',
      productDetailTileSuffix: 'Detil',
      productTotalCost: 'Total pengeluaran:',
      productQttLabel: 'Jumlah produk jadi:',
      selingPriceSugestion: 'Harga jual persatuan yang disarankan',
      selingPriceSelected: 'Harga jual persatuan yang digunakan',
      productIngredientsTitle: 'Bahan-bahan dan Kebutuhan',
      singleProfitLabel: 'Keuntungan persatuan:',
      totalProfitLabel: 'Keuntungan perproduksi:',
      setPriceText: 'Masukkan harga jual satuan untuk melihat keuntungan.',
      products: [
        {
          name: 'pisang goreng',
          slug: 'pisang-goreng',
          qtt: 20,
          sellingPrice: 0,
          ingredients: [
            {
              id: 0,
              name: 'pisang',
              qtt: '10 buah',
              price: 5000,
            },

            {
              id: 1,
              name: 'tepung',
              qtt: '100gr',
              price: 3000,
            },

            {
              id: 2,
              name: 'minyak goreng',
              qtt: '1/2 liter',
              price: 15000,
            },

            {
              id: 3,
              name: 'gas',
              qtt: 'secukupnya',
              price: 6000,
            },
          ],
        },
        {
          name: 'tape goreng',
          slug: 'tape',
          qtt: 20,
          sellingPrice: 0,
          ingredients: [
            {
              id: 0,
              name: 'tape',
              qtt: '2 bungkus',
              price: 7000,
            },

            {
              id: 1,
              name: 'tepung',
              qtt: '100gr',
              price: 3000,
            },

            {
              id: 2,
              name: 'minyak goreng',
              qtt: '1/2 liter',
              price: 15000,
            },

            {
              id: 3,
              name: 'gas',
              qtt: 'secukupnya',
              price: 6000,
            },
          ],
        },
      ],
    };
  },
};
</script>
