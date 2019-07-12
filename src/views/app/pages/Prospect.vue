<template>
  <div class="root-home">
    <b-container class="" fluid>
      <b-container class="">
        <b-card class="mb-4" :title="'Your Prospect'" >
            <b-input-group class="mb-3">
                <b-form-input :placeholder="'Name'"></b-form-input>
            </b-input-group>
            <b-input-group class="mb-3">
                <b-form-input :placeholder="'Email'"></b-form-input>
            </b-input-group>
            <b-input-group prepend="https://example.com/" class="mb-3">
                <b-form-input :placeholder="'Website'"></b-form-input>
            </b-input-group>
            <b-input-group prepend="Phone" class="mb-3">
                <b-form-input :placeholder="'Phone Number'"></b-form-input>
            </b-input-group>
            <b-form-group :label="'Contacted?'">
            <b-form-checkbox-group>
              <b-form-checkbox value="first">Yes</b-form-checkbox>
              <b-form-checkbox value="second">No</b-form-checkbox>
            </b-form-checkbox-group>
          </b-form-group>
            <b-input-group prepend="Contribution $" append=".00" class="mb-3">
                <b-form-input type="number"></b-form-input>
            </b-input-group>
              <b-input-group prepend="Notes" class="mb-3">
                <b-form-textarea rows="2" max-rows="6" v-model="textarea" no-resize></b-form-textarea>
            </b-input-group>
        </b-card>
      </b-container>
    </b-container>
  </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
import { learnmoreUrl } from '@/constants/config'

export default {
  props: {
    title: { type: String, default: 'icon-card-title' },
    icon: { type: String, default: 'iconsminds-clock' },
    value: { type: Number, default: 0 }
  },
  data () {
    return {
      email: '',
      password: '',
      prospect: {
        firstname: '',
        lastname: '',
        company: '',
        email: ''
      },
      learnmoreUrl,
      textarea: ''
    }
  },
  computed: {
    name: {
      get: function () {
        if (this.prospect.firstname && this.prospect.lastname) {
          return this.prospect.firstname + ' ' + this.prospect.lastname
        } else {
          return this.prospect.firstname || this.prospect.lastname
        }
      },
      set: function (newFullName) {
        const names = newFullName.split(' ')
        if (names.length === 2) {
          this.prospect.firstname = names[0]
          this.prospect.lastname = names[1]
        }
        if (names.length <= 1) {
          this.prospect.firstname = names[0] || ''
          this.prospect.lastname = ''
        }
      }
    },
    ...mapGetters(['currentUser', 'processing', 'loginError'])
  },
  methods: {
    ...mapActions(['login', 'saveProspectInfo']),
    formSubmit () {
      console.log('WHER DOES THIS GO?')
      // this.email = 'demo@gogo.com'
      // this.password = 'gogo123'
      this.login({ email: this.email, password: this.password })
    },
    getProspectInfo () {
      console.log('GETTING INFO:')
      this.saveProspectInfo({ firstname: this.prospect.firstname, lastname: this.prospect.lastname, email: this.prospect.email })
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
