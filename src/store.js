// Import Vue
import Vue from 'vue';
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    setup: {
      logo: '/static/logo.png',
      storeName: 'Warung Gorengan',
      currency: 'Rp',
      productListTitle: 'Daftar Produk',
      productDetailTileSuffix: 'Detil product',
      productTotalCost: 'Total pengeluaran:',
      productQttLabel: 'Jumlah produk jadi:',
      selingPriceSuggestion: 'Harga jual persatuan yang disarankan',
      selingPriceSelected: 'Harga jual persatuan yang digunakan',
      singleProfitLabel: 'Keuntungan persatuan:',
      totalProfitLabel: 'Keuntungan perproduksi:',
      setPriceText: 'Masukkan harga jual satuan untuk melihat keuntungan.',
      productIngredientsTitle: 'Bahan-bahan dan Kebutuhan',
      productProcessingTitle: 'Cara memasak',
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
  },
})
