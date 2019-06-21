<template>
  <b-row class="h-100">
    <b-colxx xxs="6" md=6  class="mx-auto my-auto">
      <b-card class="auth-card" >
          <div class="form-side">
            <h6 class="mb-4">{{ $t('user.register')}}</h6>
            <b-form @submit.prevent="formSubmit">
               <label class="form-group has-float-label mb-4">
                <input type="text" class="form-control" v-model="firstname">
                <span>{{ $t('user.firstname') }}</span>
              </label>
              <label class="form-group has-float-label mb-4">
                <input type="text" class="form-control" v-model="lastname">
                <span>{{ $t('user.lastname') }}</span>
              </label>
              <label class="form-group has-float-label mb-4">
                <input type="email" class="form-control" v-model="email">
                <span>{{ $t('user.email') }}</span>
              </label>
              <label class="form-group has-float-label mb-4">
                <input type="password" class="form-control" v-model="password">
                <span>{{ $t('user.password') }}</span>
              </label>
              <div class="d-flex justify-content-end align-items-center">
                  <b-button type="submit" variant="primary" size="lg" class="btn-shadow">{{ $t('user.register-button')}}</b-button>
              </div>
          </b-form>
        </div>
      </b-card>
    </b-colxx>
  </b-row>
</template>
<script>
import { mapActions } from 'vuex'

export default {
  data () {
    return {
      firstname: '',
      lastname: '',
      email: '',
      password: ''
    }
  },
  methods: {
    ...mapActions(['register']),
    formSubmit () {
      var user = {
        firstname: this.firstname,
        lastname: this.lastname,
        email: this.email,
        password: this.password
      }
      // console.log('register', user)
      this.register(user)
      this.$router.push('/')
    }
  }
}
</script>
