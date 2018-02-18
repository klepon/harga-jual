export default {
  methods: {
    isItemEdited(i) {
      return this.editedItem === i && this.isEditSection;
    },
  }
}
