<template>
    <f7-block>
      <f7-block-header>
        {{setup.productProcessingTitle}}
        <em @click="edit($f7route.params.id)" v-show="!isItemEdited($f7route.params.id)" class="icon icon-bold icon-click size-15 color-blue">edit</em>
        <em @click="edit()" v-show="isItemEdited($f7route.params.id)" class="icon icon-bold icon-click size-15 color-blue">done</em>
      </f7-block-header>

      <div>
        <div v-show="!isItemEdited($f7route.params.id)" v-html="products[$f7route.params.id].processing" />
        <wysiwyg v-show="isItemEdited($f7route.params.id)" v-model="products[$f7route.params.id].processing" />
      </div>
    </f7-block>
</template>

<script>
import helper from '../helper.js';
import detailHeading from './detail-heading.vue';

export default {
  name: 'product-how-to',
  mixins: [helper],
  props: ['isEditSection', 'sectionID', 'editedItem'],
  components: {
    detailHeading,
  },
  methods: {
    edit(i) {
      this.$emit('setEditSection', typeof(i) === undefined ? -1 : this.sectionID);
      this.$emit('setEditItem', i);
    }
  },
  data() {
    return {
      showEditIcons: true,
      edited: this.$store.state.setup.edited,
      setup: this.$store.state.setup,
      products: this.$store.state.products,
    }
  }
}
</script>
