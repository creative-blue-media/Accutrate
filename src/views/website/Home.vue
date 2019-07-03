<template>
  <div class="root-home">
    <b-container class="home-header" fluid>
      <b-container class="h-header">
        <b-row class="home-pad" style="z-index: 999;">
          <b-col xs=12 md=6>
            <h5>Better Breathing for Life</h5>
            <h1 style="font-size: 4.5em;"><strong>Continuous SPO2 Monitoring Cloud Technology</strong></h1>
            <h5>Live Longer, Breathe Better</h5>
            <br>
            <b-button class="mb-1 button-home">{{ 'Learn More' }}</b-button>
          </b-col>
          <div class="box col-md-6">
          </div>
        </b-row>
      </b-container>
      <div class="container-fluid curveSVG">
        <!-- Generator: Adobe Illustrator 22.1.0, SVG Export Plug-In . SVG Version: 6.00 Build 0)  -->
        <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
          viewBox="0 0 2000 1117" style="enable-background:new 0 0 2000 1117;" xml:space="preserve">
        <title>SVGArtboard 3</title>
        <path style="fill:#fff;" d="M0,1116.78c0,0,1360.42-586.57,2000-576.56l-0.42,576.78L0,1116.78z"/>
        </svg>
      </div>
    </b-container>
    <b-container class="publications-section" fluid>
      <b-container class="publications">
        <b-row class="home-pad">
          <b-row style="padding-bottom: 2vh;">
            <!-- <b-col md=12> -->
              <b-container fluid>
                <b-row>
                  <b-col md=12 style="height: 40vh; border-radius: 2%; background: linear-gradient(to bottom right, #5BBCDA, #fff);">
                  </b-col>
                  <b-col md=12 style="height: 40vh; background: #fff;">
                    <h1 style="color: #555; border-bottom: 0px; padding-top: 8px;">I QUO REPRIMIQUE </h1>
                    <hr>
                  </b-col>
                </b-row>
                <b-row>
                  <b-col md=12 style="height: 40vh; background: #fff;">
                    <h1 style="color: #555; border-bottom: 0px; padding-top: 8px;">I QUO REPRIMIQUE </h1>
                    <hr>
                  </b-col>
                  <b-col md=12 style="height: 40vh; border-radius: 2%; background: linear-gradient(to bottom right, #5BBCDA, #fff);">
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
  </div>
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
