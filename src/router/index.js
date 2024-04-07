import { createRouter, createWebHistory } from 'vue-router';
import AddMovieView from '@/views/AddMovieView.vue';
// import { ref } from "vue"; 
import { ref, onMounted } from "vue";
const routes = [
  {
    path: '/movies/create',
    name: 'AddMovie',
    component: AddMovieView
  },
  // ... other routes
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
});

onMounted(() => { 
  getCsrfToken(); 
}); 

let csrf_token = ref(""); 
  function getCsrfToken() { 
    fetch('/api/v1/csrf-token') 
      .then((response) => response.json()) 
      .then((data) => { 
        console.log(data); 
        csrf_token.value = data.csrf_token; 
      }) 
  }

  function saveMovie() { 
    let movieForm = 
document.getElementById('movieForm'); 
    let form_data = new FormData(uploadForm); 
    fetch("/api/v1/movies", { 
        method: 'POST', 
        body: form_data, 
        headers: { 
            'X-CSRFToken': csrf_token.value 
        } 
    }) 
    .then(function (response) { 
        return response.json(); 
    }) 
    .then(function (data) { 
        // display a success message 
        console.log(data); 
    }) 
    .catch(function (error) { 
        console.log(error); 
    }); 
},
export default router;
