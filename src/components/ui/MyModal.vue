<template>
  <div class="modal" v-if="show" @click.stop="closeModal" @keypress="closeAnotherModal">
    <div @click.stop class="modal__body">
      <div class="modal__header">
        хедер
      </div>
      <div class="modal__content">
        <slot></slot>
      </div>
      <div class="modal__footer">
        футер
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MyModal',
  props: {
    show: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    closeModal() {
      this.$emit('update:show', false);
    },
  },
};
</script>

<style lang="scss" scoped>
  .modal {
    display: flex;
    justify-content: center;
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background-color: rgba(0, 0, 0, 0.5);

    &__body {
      width: 100%;
      max-width: 600px;
      margin: auto 15px;
      background-color: #fff;
      border-radius: 10px;
      box-shadow: 0 0 10px rgba($color: #000000, $alpha: 0.5);
    }
  }
</style>
