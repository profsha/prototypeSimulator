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
      <div v-for="(attribute, idx) in attributies" :key="idx">
        <b-form-input
          :type="attribute.type"
          v-model="editItem.attributies[attribute.name]"
          :placeholder="'Item ' + attribute.name"
        />
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
  name: 'Items',
  data () {
    return {
      items: [],
      attributies: [],
      isEdit: false,
      editID: '',
      editItem: {
        attributies: {}
      },
      name: '',
      desription: '',
      currentAttributies: {},
      defaultFields: [
        'index',
        {
          key: 'name',
          sortable: true
        },
        {
          key: 'description',
          sortable: true
        }
      ],
      fields: []
    }
  },
  props: ['collection'],
  firestore () {
    return {
      items: this.$db.collection(this.collection)
    }
  },
  mounted () {
    this.$db.collection('attributies').onSnapshot(querySnapshot => {
      this.fields = this.defaultFields.slice(0)
      this.attributies = []
      querySnapshot.forEach(doc => {
        var attr = doc.data()
        this.fields.push({
          key: 'attributies.' + attr.name,
          label: attr.description,
          sortable: true
        })
        this.attributies.push(attr)
      })
      this.fields.push({
        key: 'buttons',
        label: ''
      })
    })
  },
  methods: {
    addItem (editItem) {
      this.$db.collection(this.collection).add(editItem)
    },
    deleteItem (id) {
      this.$db
        .collection(this.collection)
        .doc(id)
        .delete()
    },
    updateItem (id, editItem) {
      this.$db
        .collection(this.collection)
        .doc(id)
        .update(editItem)
    },
    openUpdate (id) {
      this.isEdit = true
      this.$db
        .collection(this.collection)
        .doc(id)
        .get()
        .then(doc => {
          this.editItem = doc.data()
          this.editID = id
        })
      this.$refs.modal.show()
    },
    openAdd () {
      this.isEdit = false
      this.editItem = {
        attributies: {}
      }
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
