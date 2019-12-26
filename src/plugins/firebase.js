'use strict'

import Vue from 'vue'
import VueFire from 'vuefire'
import firebase from 'firebase/app'
import 'firebase/firestore'
Vue.use(VueFire)
firebase.initializeApp({
 	projectId: 'prototypesimulator',
 	databaseURL: 'https://prototypesimulator.firebaseio.com'
})

const _db = firebase.firestore()

const firebasePlugin = {
  install (Vue, options) {
    Vue.db = _db
    window.db = _db
    Object.defineProperties(Vue.prototype, {
      db: {
        get () {
          return _db
        }
      },
      $db: {
        get () {
          return _db
        }
      }
    })
  }
}

Vue.use(firebasePlugin)

export default firebasePlugin
