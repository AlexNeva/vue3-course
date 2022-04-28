<template>
  <div class="post">
    <div>likes = {{$store.state.likes}}</div>
    <strong>{{post.id}}</strong>
    <div><strong>Название:</strong>{{post.title}}</div>
    <div><strong>Описание:</strong>{{post.body}}</div>
    <MyButton
      type="button"
      @click="$emit('remove', post)"
    >
      Удалить
    </MyButton>
  </div>
</template>

<script>
export default {
  props: {
    post: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style scoped>
  .post {
    padding: 15px;
    border: 2px solid teal;
    margin-top: 20px;
  }
</style>
