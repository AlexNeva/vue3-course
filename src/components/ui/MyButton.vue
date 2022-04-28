<template>
  <button
    class="btn"
    :type="type"
    >
    <slot></slot>
  </button>
</template>

<script>
export default {
  name: 'MyButton',
  props: {
    type: {
      type: String,
      required: true,
    },
  },
};
</script>

<style scoped>
  .btn {
    cursor: pointer;
    padding: 10px 15px;
    background-color: transparent;
    color: teal;
    border: 1px solid teal;
  }
</style>
