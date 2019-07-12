<template>
    <nav class="navbar fixed-top" v-scroll="handleScroll">
        <router-link class="navbar-logo" tag="a" to="/website/home">
            <span class="logo d-none d-xs-block"></span>
            <span class="logo-mobile d-block d-xs-none"></span>
        </router-link>
        <div class="ml-auto">
            <div class="header-icons d-inline-block align-right">
                <div class="position-relative d-none d-none d-lg-inline-block">
                  <b-dropdown id="ddown1" hoverable :text="'ABOUT US'" class="mb-0 mr-0" variant="outline">
                    <b-dropdown-item @click.prevent="goTo('/website/company')"><span class="center mb-0 mr-0" target="_top">{{$t('website.company')}}</span></b-dropdown-item>
                    <b-dropdown-item @click.prevent="goTo('/website/governence/management')"><span class="center mb-0 mr-0" target="_top">{{ 'LEADERSHIP' }}</span></b-dropdown-item>
                </b-dropdown>
                </div>
            </div>
            <div class="header-icons d-inline-block align-right">
                <div class="position-relative d-none d-none d-lg-inline-block">
                <b-dropdown id="ddown1" hoverable :text="'TECHNOLOGY'" class="mb-0 mr-0" variant="outline">
                    <b-dropdown-item @click.prevent="goTo('/website/technology/patient')"><span class="center mb-0 mr-0" target="_top">{{$t('website.tech[0]')}}</span></b-dropdown-item>
                    <b-dropdown-item @click.prevent="goTo('/website/technology/clinician')"><span class="center mb-0 mr-0" target="_top">{{$t('website.tech[1]')}}</span></b-dropdown-item>
                    <b-dropdown-item @click.prevent="goTo('/website/resources')"><span class="center mb-0 mr-0" target="_top">{{$t('website.resources')}}</span></b-dropdown-item>
                </b-dropdown>
                </div>
            </div>

            <div class="header-icons d-inline-block align-right">
                <div class="position-relative d-none d-none d-lg-inline-block">
                <b-dropdown id="ddown1" hoverable :text="'GOVERNENCE (New) '" class="mb-0 mr-0" variant="outline">
                    <b-dropdown-item @click.prevent="goTo('/website/governence/management')"><span class="center mb-0 mr-0" target="_top">{{$t('website.governence[0]')}}</span></b-dropdown-item>
                    <b-dropdown-item @click.prevent="goTo('/website/governence/board')"><span class="center mb-0 mr-0" target="_top">{{$t('website.governence[1]')}}</span></b-dropdown-item>
                    <b-dropdown-item @click.prevent="goTo('/website/governence/committees')"><span class="center mb-0 mr-0" target="_top">{{$t('website.governence[2]')}}</span></b-dropdown-item>
                    <b-dropdown-item @click.prevent="goTo('/website/governence/documents')"><span class="center mb-0 mr-0" target="_top">{{$t('website.governence[3]')}}</span></b-dropdown-item>
                </b-dropdown>
                </div>
            </div>
            <div class="header-icons d-inline-block align-right">
                <div class="position-relative d-none d-none d-lg-inline-block">
                <router-link tag="a" to="/website/investors"><a class="btn btn-sm mb-0 mr-0" target="_top">{{$t('website.investors')}}</a></router-link>
                </div>
            </div>
            <div class="header-icons d-inline-block align-right">
                <div class="position-relative d-none d-none d-lg-inline-block">
                <router-link tag="a" to="/website/contact"><a class="btn btn-sm mb-0 mr-0" target="_top">{{$t('website.contact')}}</a></router-link>
                </div>
            </div>
            <div class="header-icons d-inline-block align-right" id="login_button" v-if="0">
                <div class="position-relative d-none d-none d-lg-inline-block">
                <a class="btn btn-primary btn-sm mb-0 mr-0" target="_top" :href="loginUrl">{{$t('website.login')}}</a>
                </div>
            </div>
        </div>
    </nav>
</template>
<script>
import { mapGetters, mapMutations, mapActions } from 'vuex'
// import { MenuIcon, MobileMenuIcon } from '@/components/Svg'

// import { changeNavbar } from '@/utils'

import notifications from '@/data/notifications'
import { searchPath, menuHiddenBreakpoint, localeOptions, buyUrl, homeUrl, publicationsUrl, resourcesUrl, shopUrl, contactUrl, learnmoreUrl, loginUrl } from '@/constants/config'

export default {
  components: {
    // MenuIcon,
    // MobileMenuIcon
  },
  data () {
    return {
      selectedParentMenu: '',
      searchKeyword: '',
      isMobileSearch: false,
      isSearchOver: false,
      fullScreen: false,
      menuHiddenBreakpoint,
      searchPath,
      localeOptions,
      buyUrl,
      homeUrl,
      publicationsUrl,
      resourcesUrl,
      shopUrl,
      contactUrl,
      learnmoreUrl,
      loginUrl,
      notifications
    }
  },
  methods: {
    ...mapMutations(['changeSideMenuStatus', 'changeSideMenuForMobile']),
    ...mapActions(['setLang', 'signOut']),
    goTo (page) {
      this.$router.push(page)
    },
    search () {
      this.$router.push(`${this.searchPath}?search=${this.searchKeyword}`)
      this.searchKeyword = ''
    },
    searchClick () {
      if (window.innerWidth < this.menuHiddenBreakpoint) {
        if (!this.isMobileSearch) {
          this.isMobileSearch = true
        } else {
          this.search()
          this.isMobileSearch = false
        }
      } else {
        this.search()
      }
    },
    handleDocumentforMobileSearch () {
      if (!this.isSearchOver) {
        this.isMobileSearch = false
        this.searchKeyword = ''
      }
    },
    handleScroll: function (evt, el) {
      if (window.scrollY > 70) {
        el.setAttribute(
          'style',
          'background: #fff; height: 10vh; transition: .2s'
        )
        el.getElementsByClassName('btn-outline-primary')[0].setAttribute(
          'style',
          'color: #5BBCDA; border-color: #5BBCDA'
        )
      } else if (window.scrollY < 70) {
        el.setAttribute(
          'style',
          'color: #ff0000; transition: .2s' // 'background: transparent'
        )
        el.getElementsByClassName('btn-outline-primary')[0].setAttribute(
          'style',
          'color: #000'
        )
      }
    },
    // changeNavbar () {
    //   changeNavbar()
    // },
    changeLocale (locale) {
      this.setLang(locale)
    },
    logout () {
      this.signOut().then(() => {
        this.$router.push('/user/login')
      })
    },

    toggleFullScreen () {
      const isInFullScreen = this.isInFullScreen()

      var docElm = document.documentElement
      if (!isInFullScreen) {
        if (docElm.requestFullscreen) {
          docElm.requestFullscreen()
        } else if (docElm.mozRequestFullScreen) {
          docElm.mozRequestFullScreen()
        } else if (docElm.webkitRequestFullScreen) {
          docElm.webkitRequestFullScreen()
        } else if (docElm.msRequestFullscreen) {
          docElm.msRequestFullscreen()
        }
      } else {
        if (document.exitFullscreen) {
          document.exitFullscreen()
        } else if (document.webkitExitFullscreen) {
          document.webkitExitFullscreen()
        } else if (document.mozCancelFullScreen) {
          document.mozCancelFullScreen()
        } else if (document.msExitFullscreen) {
          document.msExitFullscreen()
        }
      }
      this.fullScreen = !isInFullScreen
    },
    isInFullScreen () {
      return (
        (document.fullscreenElement && document.fullscreenElement !== null) ||
            (document.webkitFullscreenElement &&
                document.webkitFullscreenElement !== null) ||
            (document.mozFullScreenElement &&
                document.mozFullScreenElement !== null) ||
            (document.msFullscreenElement && document.msFullscreenElement !== null)
      )
    }
  },
  computed: {
    ...mapGetters({
      currentUser: 'currentUser',
      menuType: 'getMenuType',
      menuClickCount: 'getMenuClickCount'
    })
  },
  beforeDestroy () {
    document.removeEventListener('click', this.handleDocumentforMobileSearch)
  },
  watch: {
    '$i18n.locale' (to, from) {
      if (from !== to) {
        this.$router.go(this.$route.path)
      }
    },
    isMobileSearch (val) {
      if (val) {
        document.addEventListener('click', this.handleDocumentforMobileSearch)
      } else {
        document.removeEventListener('click', this.handleDocumentforMobileSearch)
      }
    }
  }

}
</script>
