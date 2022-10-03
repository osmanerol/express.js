<template>
  <post-form
    :post="post"
    @submitForm="submit"
  />
</template>

<script>
import PostForm from '@/components/PostForm'
import { useRouter, useRoute } from 'vue-router'
import { inject, ref, onMounted } from 'vue'

export default {
  name: 'Update',
  components: {
    PostForm
  },
  setup() {
    const router = useRouter()
    const axios = inject('axios')
    const route = useRoute()
    const post = ref({
      title: null,
      content: null,
      creator: null
    })

    onMounted(() => {
      getPost()
    })

    const getPost = async () => {
      axios.get(`/posts/${route.params.id}`)
        .then(({ data }) => {
          if(data.isSuccess) {
            post.value = data.data
          }
        })
        .catch(error => console.log(error))
    }

    const submit = async () => {
      axios.put(`/posts/${route.params.id}`, post.value)
        .then(({ data }) => {
          if(data.isSuccess) {
            router.push({ name: 'Home' })
          }
        })
        .catch(error => console.log(error))
    }

    return {
      post,
      submit
    }
  }
}
</script>
