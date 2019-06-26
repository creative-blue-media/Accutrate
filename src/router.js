import Vue from 'vue'
import Router from 'vue-router'
import AuthRequired from '@/utils/AuthRequired'

Vue.use(Router)

const routes = [
  {
    path: '/',
    component: () => import(/* webpackChunkName: "app" */ './views/app'),
    redirect: '/app/dashboards',
    beforeEnter: AuthRequired,
    children: [
      {
        path: 'app/dashboards',
        component: () => import(/* webpackChunkName: "dashboards" */ './views/app/dashboards'),
        redirect: '/app/dashboards/patient',
        children: [
          { path: 'default', component: () => import(/* webpackChunkName: "dashboards" */ './views/app/dashboards/Default') },
          { path: 'analytics', component: () => import(/* webpackChunkName: "dashboards" */ './views/app/dashboards/Analytics') },
          { path: 'ecommerce', component: () => import(/* webpackChunkName: "dashboards" */ './views/app/dashboards/Ecommerce') },
          { path: 'content', component: () => import(/* webpackChunkName: "dashboards" */ './views/app/dashboards/Content') },
          { path: 'doctor', component: () => import(/* webpackChunkName: "dashboards" */ './views/app/dashboards/Doctor') },
          { path: 'patient', component: () => import(/* webpackChunkName: "dashboards" */ './views/app/dashboards/Patient') }
        ]
      },
      {
        path: 'app/pages',
        component: () => import(/* webpackChunkName: "pages" */ './views/app/pages'),
        redirect: '/app/pages/data-list',
        children: [
          { path: 'data-list', component: () => import(/* webpackChunkName: "pages" */ './views/app/pages/DataList') },
          { path: 'thumb-list', component: () => import(/* webpackChunkName: "pages" */ './views/app/pages/ThumbList') },
          { path: 'image-list', component: () => import(/* webpackChunkName: "pages" */ './views/app/pages/ImageList') },
          { path: 'details', component: () => import(/* webpackChunkName: "pages" */ './views/app/pages/Details') },
          { path: 'search', component: () => import(/* webpackChunkName: "pages" */ './views/app/pages/Search') },
          { path: 'mailing', component: () => import(/* webpackChunkName: "pages" */ './views/app/pages/Mailing') },
          { path: 'invoice', component: () => import(/* webpackChunkName: "pages" */ './views/app/pages/Invoice') },
          { path: 'news', component: () => import(/* webpackChunkName: "pages" */ './views/app/pages/News') }
        ]
      },
      {
        path: 'app/applications',
        component: () => import(/* webpackChunkName: "applications" */ './views/app/applications'),
        redirect: '/app/applications/todo',
        children: [
          { path: 'todo', component: () => import(/* webpackChunkName: "applications" */ './views/app/applications/Todo') },
          { path: 'survey', component: () => import(/* webpackChunkName: "applications" */ './views/app/applications/Survey') },
          { path: 'survey/:id', component: () => import(/* webpackChunkName: "applications" */ './views/app/applications/SurveyDetail'), props: true },
          { path: 'chat', component: () => import(/* webpackChunkName: "applications" */ './views/app/applications/Chat') }
        ]
      },
      {
        path: 'app/settings',
        component: () => import(/* webpackChunkName: "setting" */ './views/app/settings'),
        redirect: '/app/settings/settings',
        children: [
          { path: 'settings', component: () => import(/* webpackChunkName: "setting" */ './views/app/settings/Settings') }
        ]
      },
      {
        path: 'app/ui',
        component: () => import(/* webpackChunkName: "ui" */ './views/app/ui'),
        redirect: '/app/ui/alerts',
        children: [
          { path: 'alerts', component: () => import(/* webpackChunkName: "ui" */ './views/app/ui/Alerts') },
          { path: 'badges', component: () => import(/* webpackChunkName: "ui" */ './views/app/ui/Badges') },
          { path: 'buttons', component: () => import(/* webpackChunkName: "ui" */ './views/app/ui/Buttons') },
          { path: 'cards', component: () => import(/* webpackChunkName: "ui" */ './views/app/ui/Cards') },
          { path: 'carousel', component: () => import(/* webpackChunkName: "ui" */ './views/app/ui/Carousel') },
          { path: 'charts', component: () => import(/* webpackChunkName: "ui" */ './views/app/ui/Charts') },
          { path: 'collapse', component: () => import(/* webpackChunkName: "ui" */ './views/app/ui/Collapse') },
          { path: 'dropdowns', component: () => import(/* webpackChunkName: "ui" */ './views/app/ui/Dropdowns') },
          { path: 'editors', component: () => import(/* webpackChunkName: "ui" */ './views/app/ui/Editors') },
          { path: 'forms', component: () => import(/* webpackChunkName: "ui" */ './views/app/ui/Forms') },
          { path: 'form-components', component: () => import(/* webpackChunkName: "ui" */ './views/app/ui/FormComponents') },
          { path: 'icons', component: () => import(/* webpackChunkName: "ui" */ './views/app/ui/Icons') },
          { path: 'input-groups', component: () => import(/* webpackChunkName: "ui" */ './views/app/ui/InputGroups') },
          { path: 'jumbotron', component: () => import(/* webpackChunkName: "ui" */ './views/app/ui/Jumbotron') },
          { path: 'maps', component: () => import(/* webpackChunkName: "ui" */ './views/app/ui/Maps') },
          { path: 'modal', component: () => import(/* webpackChunkName: "ui" */ './views/app/ui/Modal') },
          { path: 'navigation', component: () => import(/* webpackChunkName: "ui" */ './views/app/ui/Navigation') },
          { path: 'popover-tooltip', component: () => import(/* webpackChunkName: "ui" */ './views/app/ui/PopoverTooltip') },
          { path: 'sortable', component: () => import(/* webpackChunkName: "ui" */ './views/app/ui/Sortable') },
          { path: 'tables', component: () => import(/* webpackChunkName: "ui" */ './views/app/ui/Tables') }
        ]
      }
    ]
  },
  { path: '/error', component: () => import(/* webpackChunkName: "error" */ './views/Error') },
  { path: '/website',
    component: () => import(/* webpackChunkName: "website" */ './views/website'),
    redirect: 'website/home',
    children: [
      { path: 'home', component: () => import(/* webpackChunkName: "website" */ './views/website/Home') },
      { path: 'publications', component: () => import(/* webpackChunkName: "website" */ './views/website/Publications') },
      { path: 'resources', component: () => import(/* webpackChunkName: "website" */ './views/website/Resources') },
      { path: 'shop', component: () => import(/* webpackChunkName: "website" */ './views/website/Shop') },
      { path: 'contact', component: () => import(/* webpackChunkName: "website" */ './views/website/Contact') },
      { path: 'learnmore', component: () => import(/* webpackChunkName: "website" */ './views/website/LearnMore') }
    ]
  },
  {
    path: '/features',
    component: () => import(/* webpackChunkName: "features" */ './views/features/Features'),
    redirect: 'features/Features',
    children: [
      {
        path: 'features', component: () => import(/* webpackChunkName: "features" */ './views/features/Features')
      }
    ]
  },
  {
    path: '/user',
    component: () => import(/* webpackChunkName: "user" */ './views/user'),
    redirect: '/user/login',
    children: [
      { path: 'login', component: () => import(/* webpackChunkName: "user" */ './views/user/Login') },
      { path: 'register', component: () => import(/* webpackChunkName: "user" */ './views/user/Register') },
      { path: 'forgot-password', component: () => import(/* webpackChunkName: "user" */ './views/user/ForgotPassword') }
    ]
  },
  { path: '*', component: () => import(/* webpackChunkName: "error" */ './views/Error') }
]

const router = new Router({
  linkActiveClass: 'active',
  routes,
  mode: 'history'
})

export default router
