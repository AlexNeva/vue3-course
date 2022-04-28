<template>
  <div>
    <h1>Страница с постами</h1>
    <label for="search">
      <input
        id="search"
        type="text"
        v-model="searchQuery"
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
      <MySelect v-model="selectedSort" :options="sortOptions"/>
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
import axios from 'axios';
import PostList from '@/components/PostList.vue';
import PostForm from '@/components/PostForm.vue';
import MyModal from '@/components/ui/MyModal.vue';

export default {
  components: { PostList, PostForm, MyModal },
  data() {
    return {
      posts: [],
      show: false,
      isPostsLoading: false,
      selectedSort: '',
      sortOptions: [
        { value: 'title', name: 'По названию' },
        { value: 'body', name: 'По содержанию' },
      ],
      searchQuery: '',
      page: 1,
      limit: 10,
      totalPages: 0,
    };
  },
  methods: {
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
    async fetchPosts() {
      try {
        this.isPostsLoading = true;
        const response = await axios.get('https://jsonplaceholder.typicode.com/posts', {
          params: {
            _page: this.page,
            _limit: this.limit,
          },
        });
        this.totalPages = Math.ceil(response.headers['x-total-count'] / this.limit);
        this.posts = response.data;
      } catch (err) {
        alert('Ошибка');
      } finally {
        this.isPostsLoading = false;
      }
    },
    async loadMorePosts() {
      try {
        this.page += 1;
        const response = await axios.get('https://jsonplaceholder.typicode.com/posts', {
          params: {
            _page: this.page,
            _limit: this.limit,
          },
        });
        this.totalPages = Math.ceil(response.headers['x-total-count'] / this.limit);
        this.posts = [...this.posts, ...response.data];
      } catch (err) {
        alert('Ошибка');
      }
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
    sortedPosts() {
      return [...this.posts].sort((post1, post2) => (
        post1[this.selectedSort]?.localeCompare(post2[this.selectedSort])
      ));
    },
    sortedAndSearchedPosts() {
      return this.sortedPosts
        .filter((post) => post.title.toLowerCase().includes(this.searchQuery.toLowerCase()));
    },
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
