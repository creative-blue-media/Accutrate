<template>
    <nav class="navbar fixed-top">
        <router-link class="navbar-logo" tag="a" to="#">
            <span class="logo d-none d-xs-block"></span>
            <span class="logo-mobile d-block d-xs-none"></span>
        </router-link>
        <div class="ml-auto">
            <div class="header-icons d-inline-block align-right">
                <div class="position-relative d-none d-none d-lg-inline-block">
                <a class="btn primary btn-sm mb-0 mr-0" target="_top" :href="homeUrl">{{$t('website.home')}}</a>
                </div>
            </div>
            <div class="header-icons d-inline-block align-right">
                <div class="position-relative d-none d-none d-lg-inline-block">
                <a class="btn btn-sm mb-0 mr-0" target="_top" :href="shopUrl">{{$t('website.shop')}}</a>
                </div>
            </div>
            <div class="header-icons d-inline-block align-right">
                <div class="position-relative d-none d-none d-lg-inline-block">
                <a class="btn btn-sm mb-0 mr-0" target="_top" :href="contactUrl">{{$t('website.contact')}}</a>
                </div>
            </div>
            <div class="header-icons d-inline-block align-right">
                <div class="position-relative d-none d-none d-lg-inline-block">
                <b-dropdown id="ddown1" :text="'LEARN MORE'" class="mb-0 mr-0" variant="outline">
                    <b-dropdown-item><a class="center mb-0 mr-0" target="_top" :href="publicationsUrl">{{$t('website.publications')}}</a></b-dropdown-item>
                    <b-dropdown-item><a class="center mb-0 mr-0" target="_top" :href="resourcesUrl">{{$t('website.resources')}}</a></b-dropdown-item>
                </b-dropdown>
                </div>
            </div>
            <div class="header-icons d-inline-block align-right">
                <div class="position-relative d-none d-none d-lg-inline-block">
                <a class="btn btn-outline-primary btn-sm mb-0 mr-0" target="_top" :href="loginUrl">{{$t('website.login')}}</a>
                </div>
            </div>
        </div>
    </nav>
</template>
<script>
import { mapGetters, mapMutations, mapActions } from 'vuex'
// import { MenuIcon, MobileMenuIcon } from '@/components/Svg'

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
