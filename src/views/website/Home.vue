<template>
  <b-row class="h-100">
    <b-colxx xxs="12" md=4  class="">
      
    </b-colxx>
  </b-row>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  props: {
    title: { type: String, default: 'icon-card-title' },
    icon: { type: String, default: 'iconsminds-clock' },
    value: { type: Number, default: 0 }
  },
  data () {
    return {
      email: '',
      password: ''
    }
  },
  computed: {
    ...mapGetters(['currentUser', 'processing', 'loginError'])
  },
  methods: {
    ...mapActions(['login']),
    formSubmit () {
      console.log('WHER DOES THIS GO?')
      // this.email = 'demo@gogo.com'
      // this.password = 'gogo123'
      this.login({ email: this.email, password: this.password })
    }
  },
  watch: {
    currentUser (val) {
      if (val && val.uid && val.uid.length > 0) {
        setTimeout(() => {
          this.$router.push('/')
        }, 500)
      }
    },
    loginError (val) {
      if (val != null) {
        this.$notify('error', 'Login Error', val, { duration: 3000, permanent: false })
      }
    }
  }
}
</script>
