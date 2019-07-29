<template>
    <div id="root">
        <!-- <div ></div> -->
        <main>
            <div class="container-fluid soon-background">
                <router-view/>
            </div>
        </main>
    </div>
</template>
<script>
// import TopNavWeb from '@/containers/TopNavWebsite'
export default {
  components: {
    // TopNavWeb
  },
  mounted () {
    document.body.classList.add('background')
  },
  beforeDestroy () {
    document.body.classList.remove('background')
  }
}
</script>
