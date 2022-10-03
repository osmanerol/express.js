<template>
  <post-form
    :post="post"
    @submitForm="submit"
  />
</template>

<script>
import PostForm from '@/components/PostForm'
import { inject, reactive } from 'vue'
import { useRouter } from 'vue-router'

export default {
  name: 'Create',
  components: {
    PostForm
  },
  setup() {
    const axios = inject('axios')
    const router = useRouter()
    const post = reactive({
      title: null,
      content: null,
      creator: null
    })

    const submit = async () => {
      await axios.post('/posts', post)
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
