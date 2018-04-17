import Vue from 'vue'
import Router from 'vue-router'
import Launch from '@/components/Launch'
import Index from '@/components/Index'
import Photo from '@/components/Photo/Index'
import Take from '@/components/Photo/Take'
import Save from '@/components/Photo/Save'
import Share from '@/components/Photo/Share'
import Face from '@/components/Face'
import Cloud from '@/components/Cloud/Index'
import Album from '@/components/Cloud/Album'
import Show from '@/components/Show'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/launch',
      component: Launch
    },
    {
      path: '/',
      component: Index
    },
    {
      path: '/index',
      component: Index
    },
    {
      path: '/photo',
      component: Photo,
      children: [
        {
          path: '',
          component: Take
        },
        {
          path: 'save',
          component: Save
        },
        {
          path: 'share',
          component: Share
        }
      ]
    },
    {
      path: '/face',
      component: Face
    },
    {
      path: '/Cloud',
      component: Cloud,
      children: [
        {
          path: '', component: Album
        }
        ]
    },
    {
      path: '/ProfessionShow',
      component: Show
    }
  ]
})
