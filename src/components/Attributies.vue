<template>
  <div>
    <b-modal ref="modal" @ok="!isEdit ? addItem(editItem) : updateItem(editID, editItem)">
      <div>{{editID}}</div>
      <div>
        <b-form-input type="text" v-model="editItem.name" placeholder="Item Name"/>
      </div>
      <div>
        <b-form-input type="text" v-model="editItem.description" placeholder="Item Desription"/>
      </div>
      <div>
        <b-form-select v-model="editItem.type" :options="options"/>
      </div>
    </b-modal>
    <b-button @click.prevent="openAdd()">Add New</b-button>
    <b-table striped hover :items="items" :fields="fields" small primary-key="id">
      <template slot="index" slot-scope="data">{{ data.index + 1 }}</template>
<!-- <template v-for="(field) in fields" :slot="field.label" slot-scope="data">
{{data.item[field.key]}}
</template>-->
      <template slot="buttons" slot-scope="data">
        <b-button @click.prevent="openUpdate(data.item.id)">Update</b-button>
        <b-button @click.prevent="deleteItem(data.item.id)">Delete</b-button>
      </template>
    </b-table>
  </div>
</template>

<script>
export default {
  name: 'Attributies',
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
        {
          key: 'description',
          sortable: true
        },
        {
          key: 'type',
          sortable: true
        },
        'buttons'
      ],
      options: [
        'text',
        'password',
        'email',
        'number',
        'url',
        'tel',
        'date',
        'time',
        'range',
        'color'
      ]
    }
  },
  firestore () {
    return {
      items: this.$db.collection('attributies')
    }
  },
  mounted () {},
  methods: {
    addItem (editItem) {
      this.$db.collection('attributies').add(editItem)
    },
    deleteItem (id) {
      this.$db
        .collection('attributies')
        .doc(id)
        .delete()
    },
    updateItem (id, editItem) {
      this.$db
        .collection('attributies')
        .doc(id)
        .update(editItem)
    },
    openUpdate (id) {
      this.isEdit = true
      this.$db
        .collection('attributies')
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
