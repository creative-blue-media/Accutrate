<template>
  <div id="app-container" :class="getMenuType">
    <nav-auth/>
    <sidebar/>
    <main>
      <div class="container-fluid">
        <router-view/>
      </div>
    </main>
  </div>
</template>
<script>
import Sidebar from '@/containers/Sidebar'
import NavAuth from '@/containers/NavAuth'
import { mapGetters } from 'vuex'

export default {
  data () {
    return { show: false }
  },
  components: {
    NavAuth,
    Sidebar
  },
  computed: {
    ...mapGetters(['getMenuType'])
  }
}
</script>
