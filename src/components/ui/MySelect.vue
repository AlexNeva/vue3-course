<template>
  <select :value="modelValue" @change="changeOptions">
    <option disabled value="">Выберите из списка</option>
    <option
      v-for="option in options"
      :key="option.value"
      :value="option.value">
      {{ option.name }}
    </option>
  </select>
</template>

<script>
export default {
  name: 'MySelect',
  props: {
    modelValue: {
      type: String,
    },
    options: {
      type: Array,
      default: () => [],
    },
  },
  methods: {
    changeOptions(evt) {
      this.$emit('update:modelValue', evt.target.value);
    },
  },
};
</script>

<style>

</style>
