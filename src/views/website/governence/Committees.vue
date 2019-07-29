<template>
  <div class="root-home">
    <b-container class="home-header" fluid>
      <b-container class="h-header">
        <b-row class="home-pad" style="z-index: 999; text-align: center;">
          <b-col class="header-text" xs=12 md=12>
            <h1 style="font-size: 4em;"><strong>Committes and Charter</strong></h1>
            <br>
          </b-col>
        </b-row>
      </b-container>
    </b-container>
    <b-container class="publications-section" fluid>
      <b-container class="publications">
        <b-row class="home-pad">
          <b-row style="padding-bottom: 2vh; width: 100%;">
            <!-- <b-col md=12> -->
              <b-container>
                <b-row>
                  <b-col xs=12 md=6 style="height: 40vh; background: linear-gradient(to bottom right, #77B2E6, #304772);">
                    <h1 style="margin: 0; color: #fff; border-bottom: 0px; text-align: center; padding: 15px;"><strong>The Problem</strong></h1>
                  </b-col>
                  <b-col xs=12 md=6 style="height: 40vh; background: #fff;">
                    <h1 style="color: #555; border-bottom: 0px; padding-top: 8px;">I QUO REPRIMIQUE </h1>
                    <hr>
                  </b-col>
                </b-row>
                <b-row>
                  <b-col md=6 style="height: 40vh; background: #fff;">
                    <h1 style="color: #555; border-bottom: 0px; padding-top: 8px;">I QUO REPRIMIQUE </h1>
                    <hr>
                  </b-col>
                  <b-col md=6 style="height: 40vh; background: linear-gradient(to bottom right, #77B2E6, #304772);">
                    <h1 style="color: #fff; border-bottom: 0px; padding: 15px;"><strong>Our Solution</strong></h1>
                  </b-col>
                </b-row>
              </b-container>
            <!-- </b-col> -->
          </b-row>
        </b-row>
      </b-container>
    </b-container>
    <b-container class="shops-section" fluid>
      <b-container class="shops">
        <b-row class="home-pad">
          <b-col xs=12 md=4>
            <h1><Strong>Shop</Strong></h1>
            <h2>Lorem Ipsum</h2>
            <p>Lorem ipsum dolor sit amet,
              consectetur adipiscing elit.
              Cras porta aliquet erat condimentum pulvinar.
              Nullam congue arcu ac turpis pretium venenatis
              elementum sit amet libero. Morbi eleifend suscipit
              velit luctus placerat. Quisque mattis neque sit amet
              lectus ornare, vel sagittis nibh tempor.
            </p>
            <b-button class="mb-1 button-home">{{ 'Buy Now' }}</b-button>
          </b-col>
          </b-row>
      </b-container>
    </b-container>
    <b-container class="contact-section" fluid>
      <b-container class="contact">
        <b-row style="height:auto; width:100%;">
              <b-card class="footer-contact">
                <b-form class="mr-0 ml-0" style="width:100%;">
                  <b-row>
                    <b-col sm="3">
                      <h2>Subscribe to recieve the latest news</h2>
                    </b-col>
                    <b-col sm="3">
                      <b-form-group :label="$t('forms.firstname')"  >
                        <b-form-input type="text" v-model="name" /> <!--:state="!$v.validateForm.firstname.$invalid"-->
                        <b-form-invalid-feedback>{{ $t('forms.firstname-message')}}</b-form-invalid-feedback>
                      </b-form-group>
                    </b-col>
                    <b-col sm="3">
                      <b-form-group :label="$t('forms.email')">
                        <b-form-input type="text" v-model="prospect.email"/>
                        <b-form-invalid-feedback>{{ $t('forms.email-message')}}</b-form-invalid-feedback>
                      </b-form-group>
                    </b-col>
                     <b-col sm="3">
                      <b-button type="submit" variant="primary" class="mt-4" style="width:100%;">{{ $t('forms.submit') }}</b-button> <!--:disabled="$v.validateForm.$invalid"-->
                     </b-col>
                  </b-row>
                </b-form>
              </b-card>
        </b-row>
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
      learnmoreUrl
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
