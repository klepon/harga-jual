// Import Vue
import Vue from 'vue';
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  // mutations: {
  //   updateIngredients (state, data) {
  //     state.products = state.products.map((product, i) => {
  //       if(i === data.productIndex) {
  //         return {
  //           ...product,
  //           ingredients: state.products[i].ingredients.map((ingredient, i) => {
  //             if(i === data.ingredientIndex) {
  //               return data.ingredient;
  //             }
  //
  //             return ingredient;
  //           })
  //         }
  //       }
  //
  //       return product;
  //     })
  //   }
  // },
  state: {
    setup: {
      // edited: -1,
      logo: '/static/logo.png',
      storeName: 'Warung Gorengan',
      currency: 'Rp',
      productListTitle: 'Daftar Produk',
      productDetailTileSuffix: 'Detil product',
      productTotalCost: 'Total pengeluaran:',
      productQttLabel: 'Jumlah produk jadi:',
      sellingPrice: 'Harga jual persatuan',
      sellingPriceSuggestion: 'disarankan',
      sellingPriceSelected: 'digunakan',
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
        qtt: 30,
        sellingPrice: '',
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
        qtt: 25,
        sellingPrice: '',
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
