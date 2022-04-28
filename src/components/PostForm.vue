<template>
  <form class="form" @submit.prevent="createPost">
    <label class="form__control" for="postName">
      <strong>Название поста</strong>
      <input
        v-model.trim="post.title"
        id="postName"
        type="text"
        placeholder="Введите название"
      >
    </label>
    <label class="form__control" for="postBody">
      <strong>Описание поста</strong>
      <input
        v-model.trim="post.body"
        id="postBody"
        type="text"
        placeholder="Введите описание"
      >
    </label>
    <MyButton type="submit">
      Добавить
    </MyButton>
    </form>
</template>

<script>
export default {
  data() {
    return {
      post: {
        title: '',
        body: '',
      },
    };
  },
  methods: {
    createPost() {
      this.post.id = Date.now();
      this.$emit('create', this.post);
      this.post = {
        title: '',
        body: '',
      };
    },
  },
};
</script>

<style>

</style>
