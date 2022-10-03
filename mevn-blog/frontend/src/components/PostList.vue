<template>
  <div class="container">
    <div 
      v-for="(item, index) in posts"
      :key="index"
      class="card my-5"
    >
      <div class="card-content">
        <div class="media">
          <div class="media-content">
            <p class="title is-4">{{ item.title }}</p>
          </div>
        </div>
        <div class="content">
          {{ item.content }}
          <strong>{{ item.creator }}</strong>
        </div>
        <footer class="card-footer">
          <button 
            class="card-footer-item button is-warning"
            @click="updatePost(item._id)"
          >
            Edit
          </button>
          <button 
            class="card-footer-item button is-danger"
            @click="deletePost(item._id)"
          >
            Delete
          </button>
        </footer>
      </div>
    </div>
  </div>
</template>

<script>
import { useRouter } from 'vue-router'
import { inject, ref, onMounted } from 'vue'

export default {
  name: 'PostList',
  setup() {
    const router = useRouter()
    const axios = inject('axios')
    const posts = ref([])

    onMounted(() => {
      getPosts()
    })

    const getPosts = async () => {
      await axios.get('/posts').then(({ data }) => {
        if(data.isSuccess) {
          posts.value = data.data
        }
      }).catch(error => {
        console.log(error)
      })
    }

    const updatePost = id => {
      router.push({ name: 'Update', params: { id } })
    }

    const deletePost = async id => {
      await axios.delete(`/posts/${id}`).then(({ data }) => {
        if(data.isSuccess) {
          getPosts()
        }
      }).catch(error => {
        console.log(error)
      })
    }

    return {
      posts,
      updatePost,
      deletePost
    }
  }
}
</script>
