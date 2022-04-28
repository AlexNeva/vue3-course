<template>
  <div v-if="posts.length > 0">
    <h3>Список постов</h3>
    <transition-group name="posts-list">
      <PostItem
        v-for="post in posts"
        :key="post.id"
        :post="post"
        @remove="$emit('remove', post)"
      />
    </transition-group>
  </div>
  <p v-else>
    Список постов пуст...
  </p>
</template>

<script>
import PostItem from '@/components/PostItem.vue';

export default {
  components: { PostItem },
  props: {
    posts: {
      type: Array,
      required: true,
    },
  },
};
</script>

<style scoped>
.posts-list-item {
  display: inline-block;
  margin-right: 10px;
}
.posts-list-enter-active,
.posts-list-leave-active {
  transition: all 1s ease;
}
.posts-list-enter-from,
.posts-list-leave-to {
  opacity: 0;
  transform: translateX(50%);
}
.posts-list-move {
  transition: transform 0.5s ease;
}
</style>
