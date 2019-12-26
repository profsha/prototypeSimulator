<template>
  <div>
    <b-tabs content-class="mt-3">
      <b-tab title="Attributies" active>
        <Attributies></Attributies>
      </b-tab>
      <b-tab title="heads">
        <Items :collection="'heads'"></Items>
      </b-tab>
      <b-tab title="bodies">
        <Items :collection="'bodies'"></Items>
      </b-tab>
      <b-tab title="arms">
        <Items :collection="'arms'"></Items>
      </b-tab>
      <b-tab title="legs">
        <Items :collection="'legs'"></Items>
      </b-tab>
      <b-tab title="weapons">
        <Items :collection="'weapons'"></Items>
      </b-tab>
      <b-tab title="users">
        <Users></Users>
      </b-tab>
      <b-tab title="units">
        <Units></Units>
      </b-tab>
      <b-tab title="slots">
        <Slots></Slots>
      </b-tab>
      <b-tab title="characters">
        <Characters></Characters>
      </b-tab>
    </b-tabs>
  </div>
</template>

<script>
// @ is an alias to /src
import Attributies from '@/components/Attributies.vue'
import Items from '@/components/Items.vue'
import Users from '@/components/Users.vue'
import Units from '@/components/Units.vue'
import Slots from '@/components/Slots.vue'
import Characters from '@/components/Characters.vue'

export default {
  name: 'home',
  components: {
    Attributies,
    Items,
    Users,
    Units,
    Slots,
    Characters
  }
}
</script>
