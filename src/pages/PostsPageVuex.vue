<template>
  <div>
    <h1>Страница с постами</h1>
    <h2>{{ $store.getters.addLikes }}</h2>
    <div>
      <button type="button" @click="$store.commit('incrementLikes')">
        inc likes
      </button>
      <button type="button" @click="$store.commit('decrementLikes')">
        dec likes
      </button>
    </div>
    <label for="search">
      <input
        id="search"
        type="text"
        modalValue="searchQuery"
        @update:modalValue="setSearchQuery"
        placeholder="Поиск..."
      >
    </label>
    <div class="app__btns">
      <MyButton
        type="button"
        @click="openModal"
      >
          Добавить пост
      </MyButton>
      <MySelect
        :modelValue="selectedSort"
        @update:modelValue="setSelectedSort"
        :options="sortOptions"
      />
    </div>
    <MyModal v-model:show="show">
      <PostForm
        @create="createPost"
      />
    </MyModal>
    <PostList
      v-if="!isPostsLoading"
      :posts="sortedAndSearchedPosts"
      @remove="removePost"
    />
    <div v-else>
      Идет загрузка...
    </div>
    <div ref="observer" class="observer"></div>
    <!-- <div class="pagination">
      <button
        type="button"
        class="pagination__item"
        :class="{
          'pagination__item--current': page === pageNumber,
        }"
        v-for="pageNumber in totalPages"
        :key="pageNumber"
        @click="changePage(pageNumber)"
        @keypress="changePage(pageNumber)"
      >
        {{pageNumber}}
      </button>
    </div> -->
  </div>
</template>

<script>
import PostList from '@/components/PostList.vue';
import PostForm from '@/components/PostForm.vue';
import MyModal from '@/components/ui/MyModal.vue';
import {
  mapState,
  mapGetters,
  mapActions,
  mapMutations,
} from 'vuex';

export default {
  components: { PostList, PostForm, MyModal },
  data() {
    return {
      show: false,
    };
  },
  methods: {
    ...mapMutations({
      setPage: 'post/setPage',
      setSearchQuery: 'post/setSearchQuery',
      setSelectedSort: 'post/setSelectedSort',
    }),
    ...mapActions({
      loadMorePosts: 'post/loadMorePosts',
      fetchPosts: 'post/fetchPosts',
    }),
    createPost(post) {
      this.posts.push(post);
      this.show = false;
    },
    removePost(post) {
      this.posts = this.posts.filter((p) => p.id !== post.id);
    },
    openModal() {
      this.show = true;
    },
    // changePage(pageNumber) {
    //   this.page = pageNumber;
    // },
  },
  mounted() {
    this.fetchPosts();
    const options = {
      rootMargin: '0px',
      threshold: 1.0,
    };
    const callback = (entries) => {
      if (entries[0].isIntersecting && this.page < this.totalPages) {
        this.loadMorePosts();
      }
    };
    const observer = new IntersectionObserver(callback, options);
    observer.observe(this.$refs.observer);
  },
  computed: {
    ...mapState({
      posts: (state) => state.post.posts,
      isPostsLoading: (state) => state.post.isPostsLoading,
      selectedSort: (state) => state.post.selectedSort,
      sortOptions: (state) => state.post.sortOptions,
      searchQuery: (state) => state.post.searchQuery,
      page: (state) => state.post.page,
      limit: (state) => state.post.limit,
      totalPages: (state) => state.post.totalPages,
    }),
    ...mapGetters({
      sortedPosts: 'post/sortedPosts',
      sortedAndSearchedPosts: 'post/sortedPosts',
    }),
  },
};
</script>

<style>
  .app__btns {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .pagination {
    margin-top: 20px;
    margin-bottom: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .pagination__item {
    user-select: none;
    cursor: pointer;
    padding: 10px;
    border: 1px solid teal;
  }

  .pagination__item:not(:last-child) {
    margin-right: 5px;
  }

  .pagination__item--current {
    border-color: aqua;
    color: aqua;
    font-weight: bold;
  }
  .observer {
    height: 50px;
    background-color: aqua;
    margin-bottom: 50px;
  }
</style>
