<template>
  <div class="root-home">
    <b-container class="home-header" fluid>
      <b-container class="h-header">
        <b-row class="home-pad" style="z-index: 999;">
          <b-col class="header-text" xs=12 md=6>
            <h5>Better Breathing for Life</h5>
            <h1 style="font-size: 4em;"><strong>Wearable pulse-oximetry enabled biosensor</strong></h1>
            <h5>Low-cost, low-power, miniature, wearable sensor for continuoues remote monitoring of vital signs</h5>
            <br>
            <router-link tag="a" to="learnmore">
              <b-button class="mb-1 button-home" >{{'Learn More'}}</b-button>
            </router-link>
          </b-col>
          <div class="box col-md-6">
            <b-card sm="6" class="header-form mb-4">
                <b-form class="mb-12">
                  <b-row>
                    <h2 style="padding:10px;">Get More Information</h2>
                    <b-col sm="12">
                      <b-form-group :label="$t('forms.firstname')"  >
                        <b-form-input type="text" v-model="prospect.firstname" /> <!--:state="!$v.validateForm.firstname.$invalid"-->
                        <b-form-invalid-feedback>{{ $t('forms.firstname-message')}}</b-form-invalid-feedback>
                      </b-form-group>
                    </b-col>
                    <b-col sm="12">
                      <b-form-group :label="$t('forms.lastname')">
                        <b-form-input type="text" v-model="prospect.lastname"/>
                        <b-form-invalid-feedback>{{ $t('forms.lastname-message')}}</b-form-invalid-feedback>
                      </b-form-group>
                    </b-col>
                    <b-col sm="12">
                      <b-form-group :label="$t('forms.email')">
                        <b-form-input type="text" v-model="prospect.email"/>
                        <b-form-invalid-feedback>{{ $t('forms.email-message')}}</b-form-invalid-feedback>
                      </b-form-group>
                    </b-col>
                  </b-row>
                  <b-button style="width:100%;" type="button" variant="primary" class="mt-4" @click="getProspectInfo()">{{ $t('forms.submit') }}</b-button> <!--:disabled="$v.validateForm.$invalid"-->
                </b-form>
              </b-card>
          </div>
        </b-row>
      </b-container>
      <!-- <div class="container-fluid curveSVG">
        <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
          viewBox="0 0 2000 1117" style="enable-background:new 0 0 2000 1117;" xml:space="preserve">
        <title>SVGArtboard 3</title>
        <path style="fill:#F5F9FD;" d="M0,1116.78c0,0,1360.42-586.57,2000-576.56l-0.42,576.78L0,1116.78z"/>
        </svg>
      </div> -->
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
