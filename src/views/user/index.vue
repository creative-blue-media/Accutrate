<template>
    <div id="root">
        <top-nav-web/>
        <main>
            <div class="container-fluid fixed-background">
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
