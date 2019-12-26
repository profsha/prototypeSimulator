<template>
  <div>
    <b-modal ref="modal" @ok="!isEdit ? addItem(editItem) : updateItem(editID, editItem)">
      <div>{{editID}}</div>
      <div>
        <b-form-input type="text" v-model="editItem.name" placeholder="Item Name"/>
      </div>
    </b-modal>
    <b-button @click.prevent="openAdd()">Add New</b-button>
    <b-table striped hover :items="items" :fields="fields" small primary-key="id">
      <template slot="index" slot-scope="data">{{ data.index + 1 }}</template>
      <template slot="buttons" slot-scope="data">
        <b-button @click.prevent="openUpdate(data.item.id)">Update</b-button>
        <b-button @click.prevent="deleteItem(data.item.id)">Delete</b-button>
      </template>
    </b-table>
  </div>
</template>

<script>
export default {
  name: 'Users',
  data () {
    return {
      items: [],
      isEdit: false,
      editID: '',
      editItem: {},
      fields: [
        'index',
        {
          key: 'name',
          sortable: true
        },
        'buttons'
      ]
    }
  },
  firestore () {
    return {
      items: this.$db.collection('users')
    }
  },
  mounted () {},
  methods: {
    addItem (editItem) {
      this.$db.collection('users').add(editItem)
    },
    deleteItem (id) {
      this.$db
        .collection('users')
        .doc(id)
        .delete()
    },
    updateItem (id, editItem) {
      this.$db
        .collection('users')
        .doc(id)
        .update(editItem)
    },
    openUpdate (id) {
      this.isEdit = true
      this.$db
        .collection('users')
        .doc(id)
        .get()
        .then(doc => {
          this.editItem = doc.data()
          this.editID = id
        })
      this.$refs.modal.show()
    },
    openAdd () {
      this.editID = ''
      this.isEdit = false
      this.editItem = {}
      this.$refs.modal.show()
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
