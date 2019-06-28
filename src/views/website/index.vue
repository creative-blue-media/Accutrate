<template>
    <div id="root">
        <div class="fixed-background"></div>
        <top-nav-web/>
        <main>
            <div class="container-fluid website-home">
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
