<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <p>{{ $t('message') }}</p>
    <div>
      <article v-for="(location, idx) in locations" :key="idx">
        <h1>{{ location.name }}</h1>
        <button @click="deleteLocation(location.id)">Delete</button>
      </article>
    </div>
    <form @submit.prevent="addLocation(name)">
    <input v-model="name" placeholder="Location Name">
    <button type="submit">Add New Location</button>
    </form>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      locations: [],
      name: ''
    }
  },
  firestore () {
    return {
      locations: this.$db.collection('locations').orderBy('createdAt')
    }
  },
  props: {
    msg: String
  },
  created () {
  },
  methods: {
    addLocation (name) { // <-- новый метод
      const createdAt = new Date()
      this.$db.collection('locations').add({ name, createdAt })
    },
    deleteLocation (id) { // <-- новый метод
      this.$db.collection('locations').doc(id).delete()
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
