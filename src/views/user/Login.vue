<template>
  <b-row class="h-100">
    <b-colxx xxs="6" md=6  class="mx-auto my-auto">
      <b-card class="auth-card">
          <div class="form-side">
            <!-- <router-link tag="a" to="/"><span class="logo-single"/></router-link> -->
            <h6 class="mb-4">{{ $t('user.login-title')}}</h6>
            <b-form @submit.prevent="formSubmit">
              <label class="form-group has-float-label mb-4">
                <input type="email" class="form-control" v-model="email">
                <span>{{ $t('user.email') }}</span>
              </label>
              <label class="form-group has-float-label mb-4">
                <input type="password" class="form-control" v-model="password">
                <span>{{ $t('user.password') }}</span>
              </label>
              <div class="d-flex justify-content-between align-items-center">
                <router-link tag="a" to="/user/forgot-password">{{ $t('user.forgot-password-question')}}</router-link>
              </div>
              <div class="d-flex justify-content-between align-items-center">
                  <router-link tag="a" to="/user/register" class="black"><b>Register Now</b></router-link>
                  <!-- :disabled="processing" -->
                  <b-button type="submit" variant="primary" size="lg" class="btn-shadow" >{{ $t('user.login-button')}}</b-button>
              </div>
          </b-form>
        </div>
      </b-card>
    </b-colxx>
  </b-row>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'

export default {
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
