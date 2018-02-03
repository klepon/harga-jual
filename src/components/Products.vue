<template>
  <div class="row">
    <div class="col-12 col-sm-5 col-md-4 sidebar">
      <h2>{{setup.productListTitle}}</h2>

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
      <h2>{{setup.productDetailTileSuffix}} {{products[setup.currentProductIndex].name}}</h2>

      <p>{{setup.productTotalCost}} {{setup.currency}} {{setup.totalCost}}
        <br />
        {{setup.productQttLabel}} {{products[setup.currentProductIndex].qtt}}
        <br />
        {{setup.selingPriceSuggestion}} {{getSuggestionSellingPrice()}}
        <br />
        {{setup.selingPriceSelected}} {{setup.currency}}
        <input v-model="products[setup.currentProductIndex].sellingPrice" />

        <span v-html="getSingleProfit()" />
        <span v-html="getTotalProfit()" />
      </p>

      <h3>{{setup.productIngredientsTitle}}</h3>

      <ul>
        <li class="row"
          v-for="i in products[setup.currentProductIndex].ingredients"
          v-bind:key="i.id"
          @mouseover="setup.currentHover = setup.currentProductIndex +'-'+ i.id"
          @mouseleave="resetHover()">
          <div v-show="!isEdited(setup.currentProductIndex +'-'+ i.id)">
            {{i.qtt}}
            {{i.name}}
            ({{setup.currency}} {{i.price}})
          </div>
          <div v-show="isEdited(setup.currentProductIndex +'-'+ i.id)">
            <input v-model="i.qtt" />
            <input v-model="i.name" />
            <input v-model="i.price" />
            <span @click="resetEdited()" class="oi oi-check" title="icon done" aria-hidden="true"></span>
          </div>
          <div v-show="isHover(setup.currentProductIndex +'-'+ i.id)" class="editor">
            <span @click="setup.currentEdited = setup.currentProductIndex +'-'+ i.id" class="oi oi-pencil" title="icon pencil" aria-hidden="true"></span>
            <span class="oi oi-trash" title="icon trash" aria-hidden="true"></span>
          </div>
        </li>
      </ul>

      <h3>{{setup.productProcessingTitle}}</h3>
      <div
        @mouseover="setup.currentHover = setup.currentProductIndex"
        @mouseleave="resetHover()">
        <div v-show="isHover(setup.currentProductIndex)" class="editor">
          <span @click="setup.currentEdited = setup.currentProductIndex" class="oi oi-pencil" title="icon pencil" aria-hidden="true"></span>
          <span class="oi oi-trash" title="icon trash" aria-hidden="true"></span>
        </div>

        <div v-show="!isEdited(setup.currentProductIndex)" v-html="products[setup.currentProductIndex].processing" />
        <div v-show="isEdited(setup.currentProductIndex)">
          <tiny-mce id="description" v-model="products[setup.currentProductIndex].processing"></tiny-mce>
          <span @click="resetEdited()" class="oi oi-check" title="icon done" aria-hidden="true"></span>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
export default {
  name: 'ProductList',
  beforeMount() {
    this.setup.totalCost = this.getTotalCost();
  },
  methods: {
    openDetail(i) {
      this.setup.currentProductIndex = i;
      this.setup.totalCost = this.getTotalCost();
    },

    getTotalCost() {
      const totalCost = (this.products[this.setup.currentProductIndex].ingredients)
        .reduce((total, item) => ({ price: (total.price) + (item.price) }));

      return totalCost.price;
    },

    getSuggestionSellingPrice() {
      const unitCost = (this.setup.totalCost / this.products[this.setup.currentProductIndex].qtt) * 1;
      return `${this.setup.currency} ${unitCost + (unitCost * 0.20)}`;
    },

    getSingleProfit() {
      const product = this.products[this.setup.currentProductIndex];

      if (product.sellingPrice <= 0) {
        return `<br />${this.setup.setPriceText}`;
      }

      this.setup.totalCost = typeof (this.setup.totalCost) === 'undefined' ? this.getTotalCost() : this.setup.totalCost;
      return `<br />${this.setup.singleProfitLabel} ${this.setup.currency} ${product.sellingPrice - (this.setup.totalCost / product.qtt)}`;
    },

    getTotalProfit() {
      const product = this.products[this.setup.currentProductIndex];

      if (product.sellingPrice > 0) {
        this.setup.totalCost = typeof (this.setup.totalCost) === 'undefined' ? this.getTotalCost() : this.setup.totalCost;
        return `<br />${this.setup.totalProfitLabel} ${this.setup.currency} ${(product.sellingPrice * product.qtt) - this.setup.totalCost}`;
      }

      return '';
    },

    getActiveClass(i) {
      return i === this.setup.currentProductIndex ? 'active' : '';
    },

    isHover(id) {
      return id === this.setup.currentHover && id !== this.setup.currentEdited;
    },

    isEdited(id) {
      return id === this.setup.currentEdited;
    },

    resetHover() {
      this.setup.currentHover = -1;
    },

    resetEdited() {
      this.setup.currentEdited = -1;
    },
  },
  data() {
    return {
      setup: {
        currency: 'Rp',
        productListTitle: 'Daftar Produk',
        productDetailTileSuffix: 'Detil',
        productTotalCost: 'Total pengeluaran:',
        productQttLabel: 'Jumlah produk jadi:',
        selingPriceSuggestion: 'Harga jual persatuan yang disarankan',
        selingPriceSelected: 'Harga jual persatuan yang digunakan',
        singleProfitLabel: 'Keuntungan persatuan:',
        totalProfitLabel: 'Keuntungan perproduksi:',
        setPriceText: 'Masukkan harga jual satuan untuk melihat keuntungan.',
        productIngredientsTitle: 'Bahan-bahan dan Kebutuhan',
        productProcessingTitle: 'Cara memasak',
        totalCost: 0,
        currentProductIndex: 0,
        currentHover: -1,
        currentEdited: -1,
      },
      products: [
        {
          name: 'pisang goreng',
          slug: 'pisang-goreng',
          qtt: 20,
          sellingPrice: 0,
          processing: '<p><em>dipotong</em> dan digoreng</p>',
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
          processing: '<p>sama ini juga dipotong dan <br /> digoreng</p>',
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
