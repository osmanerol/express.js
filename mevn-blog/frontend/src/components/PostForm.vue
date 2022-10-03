<template>
  <div class="container mt-5">
    <form @submit.prevent="$emit('submitForm')">
      <div class="field">
        <label class="label">Title</label>
        <div class="control">
          <input 
            v-model="post.title"
            type="text" 
            class="input" 
            placeholder="Title"
          />
        </div>
      </div>
      <div class="field">
        <label class="label">Content</label>
        <div class="control">
          <textarea 
            v-model="post.content"
            class="textarea" 
            placeholder="Content"
          />
        </div>
      </div>
      <div class="field">
        <label class="label">Creator</label>
        <div class="control">
          <input 
            v-model="post.creator"
            type="text" 
            class="input" 
            placeholder="Creator"
          />
        </div>
      </div>
      <div class="field is-grouped">
        <div class="control">
          <button 
            type="submit"
            class="button is-primary"
          >
            Submit
          </button>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  name: 'PostForm',
  props: [
    'post'
  ]
}
</script>