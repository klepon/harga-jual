<template>
  <f7-block-header>
    {{title}}
    <em v-show="!isEditSection" @click="$emit('setEditSection', sectionID)" class="icon icon-bold icon-click size-15 color-blue">settings application</em>
    <em v-show="isEditSection" @click="$emit('setEditSection', -1)" class="icon icon-bold icon-click size-15 color-blue">done</em>
  </f7-block-header>
</template>

<script>

export default {
  name: 'detail-heading',
  props: ['title', 'isEditSection', 'sectionID']
}
</script>
