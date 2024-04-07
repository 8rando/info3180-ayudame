<template>
    <form id="movieForm" @submit.prevent="saveMovie">
      <div class="form-group mb-3">
        <label for="title" class="form-label">Movie Title</label>
        <input type="text" v-model="movie.title" class="form-control" id="title" name="title" required>
      </div>
      <div class="form-group mb-3">
        <label for="description" class="form-label">Description</label>
        <textarea v-model="movie.description" class="form-control" id="description" name="description" required></textarea>
      </div>
      <div class="form-group mb-3">
        <label for="poster" class="form-label">Movie Poster</label>
        <!-- Here we remove v-model and add a change event handler -->
        <input type="file" @change="handleFileChange" class="form-control" id="poster" name="poster" accept="image/png, image/jpeg" required>
      </div>
      <button type="submit" class="btn btn-primary">Submit</button>
    </form>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  
  const movie = ref({
    title: '',
    description: '',
    poster: null // We will store the file object here
  });
  
  const csrfToken = ref('');
  
  // Fetch the CSRF token when the component mounts
  onMounted(() => {
    fetch('/api/v1/csrf-token')
      .then(response => response.json())
      .then(data => {
        csrfToken.value = data.csrf_token;
      });
  });
  
  // Handler for when the file input changes
  const handleFileChange = (event) => {
    movie.value.poster = event.target.files[0];
  };
  
  const saveMovie = () => {
    const formData = new FormData();
    formData.append('title', movie.value.title);
    formData.append('description', movie.value.description);
    // Append the file object stored in movie.poster
    formData.append('poster', movie.value.poster);
    
    // Include the CSRF token in the request headers
    fetch('/api/v1/movies', {
      method: 'POST',
      body: formData,
      headers: {
        'X-CSRFToken': csrfToken.value
      }
    })
    .then(response => response.json())
    .then(data => {
      console.log('Success:', data);
      // Handle success such as showing a message or redirecting
    })
    .catch((error) => {
      console.error('Error:', error);
      // Handle errors such as showing error messages
    });
  };
  </script>
  
  <style scoped>
  .form-group {
    margin-bottom: 1rem;
  }
  </style>
  