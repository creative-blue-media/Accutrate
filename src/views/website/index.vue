<template>
    <div id="root">
        <div class="fixed-background"></div>
        <main>
            <div class="container-fluid">
                <top-nav-web/>
                <router-view/>
            </div>
        </main>
    </div>
</template>
<script>
import TopNavWeb from '@/containers/TopNavWebsite'
export default {
  components: {
    TopNavWeb
  },
  mounted () {
    document.body.classList.add('background')
  },
  beforeDestroy () {
    document.body.classList.remove('background')
  }
}
</script>
