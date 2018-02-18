<template>
  <f7-block>

    <detailHeading
      v-bind:title="setup.productIngredientsTitle"
      v-bind:isEditSection="isEditSection"
      v-bind:sectionID="sectionID"
      v-on:setEditSection="i => $emit('setEditSection', i)"
    />

    <div class="row" v-for="i in products[$f7route.params.id].ingredients"
      v-bind:key="i.id"
      >
      <div v-show="!isItemEdited($f7route.params.id +'-'+ i.id)">
        {{i.qtt}}
        {{i.name}}
        ({{setup.currency}} {{i.price}})

        <em v-show="isEditSection" @click="$emit('setEditItem', $f7route.params.id +'-'+ i.id)" class="icon icon-bold icon-click size-15 color-blue">edit</em>
      </div>

      <div v-show="isItemEdited($f7route.params.id +'-'+ i.id)" class="form-container">
        <input v-on:keyup.enter="$emit('onSubmit', $event)" v-model="i.qtt" />
        <input v-on:keyup.enter="$emit('onSubmit', $event)" v-model="i.name" />
        {{setup.currency}}
        <input v-on:keyup.enter="$emit('onSubmit', $event)" v-model="i.price" autofocus />
        <em @click="$emit('setEditItem')" class="icon icon-bold icon-click size-15 color-blue">done</em>
      </div>
    </div>

    <em
      v-show="!isItemEdited($f7route.params.id +'--0') && isEditSection"
      @click="$emit('setEditItem', $f7route.params.id +'--0')"
      class="icon icon-bold icon-click size-15 color-blue">add</em>

    <div v-show="isItemEdited($f7route.params.id +'--0')" class="form-container">
      <input v-on:keyup.enter="onSubmit" v-model="newItem.qtt" :class="error.qtt" placeholder="Jumlah" />
      <input v-on:keyup.enter="onSubmit" v-model="newItem.name" :class="error.name" placeholder="Bahan-bahan" />
      {{setup.currency}}
      <input v-on:keyup.enter="onSubmit" v-model="newItem.price" :class="error.price" placeholder="Harga" />
      <em @click="save()" class="icon icon-bold icon-click size-15 color-blue">done</em>
    </div>

  </f7-block>

</template>

<script>
import helper from '../helper.js';
import detailHeading from './detail-heading.vue';

export default {
  name: 'product-material',
  mixins: [helper],
  props: ['isEditSection', 'sectionID', 'editedItem'],
  components: {
    detailHeading,
  },
  methods: {
    onSubmit(event) {
      event.preventDefault();
      this.saveData();
    },

    saveData() {
      // console.log(this.newItem.qtt);
      // console.log(this.newItem.name);
      // console.log(this.newItem.price);

      // if incomplate, show error
      this.error.qtt = this.newItem.qtt === '' ? 'error' : '';
      this.error.name = this.newItem.name === '' ? 'error' : '';
      this.error.price = this.newItem.price === '' ? 'error' : '';

      if (
        this.newItem.qtt === '' ||
        this.newItem.name === '' ||
        this.newItem.price === ''
      ) return false;

      // if complete, do save
      // TODO: save data
      alert('save data here');

      // reset form and close
      this.newItem = {
        qtt:'',
        name:'',
        price:'',
      };

      return true;
    }
  },
  data() {
    return {
      newItem: {
        qtt:'',
        name:'',
        price:'',
      },
      error: {
        qtt:'',
        name:'',
        price:'',
      },
      edited: this.$store.state.setup.edited,
      setup: this.$store.state.setup,
      products: this.$store.state.products,
    }
  }
}
</script>
