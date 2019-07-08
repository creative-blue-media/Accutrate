<template>
<div>
  <b-row>
    <b-colxx xxs="12">
      <cbm-breadcrumb :heading="$t('crm.prospects')"/>
      <div class="separator mb-5"></div>
    </b-colxx>
  </b-row>
  <b-row>
    <b-colxx xxs="12">
        <h3 class="mb-4">{{ '' }}</h3>
    </b-colxx>
     <b-colxx xxs="12">
      <b-card class="mb-4" :title="$t('crm.prospects')">
        <b-table hover :items="prospects" />
      </b-card>
    </b-colxx>
  </b-row>
  </div>
</template>
<script>
import { apiUrl } from '@/constants/config'
import axios from 'axios'
import { mapGetters, mapActions } from 'vuex'
// import Vuetable from 'vuetable-2/src/components/Vuetable'
// import VuetablePaginationBootstrap from '@/components/Common/VuetablePaginationBootstrap'

export default {
  components: {
    // Vuetable
    // VuetablePaginationBootstrap
  },
  data () {
    return {
      items: [
        { id: 1, first_name: 'Mark', last_name: 'Otto', username: '@mdo' },
        { id: 2, first_name: 'Jacob', last_name: 'Thornton', username: '@fat' },
        { id: 3, first_name: 'Lary', last_name: 'the Bird', username: '@twitter' }
      ],
      vuetableItems: {
        apiUrl: 'http://localhost:3000/api/prospects/all', // apiUrl + '/cakes/fordatatable',
        fields: [
          {
            name: 'title',
            sortField: 'title',
            title: 'Name',
            titleClass: '',
            dataClass: 'list-item-heading'
          },
          {
            name: 'sales',
            sortField: 'sales',
            title: 'Email',
            titleClass: '',
            dataClass: 'text-muted'
          },
          {
            name: 'stock',
            sortField: 'stock',
            title: 'Date',
            titleClass: '',
            dataClass: 'text-muted'
          }
        ]
      },
      currentPage: 1,
      perPage: 5,
      totalRows: 0,
      bootstrapTable: {
        selected: [],
        selectMode: 'multi',
        fields: [
          { key: 'title', label: 'Title', sortable: true, sortDirection: 'desc', tdClass: 'list-item-heading' },
          { key: 'sales', label: 'Sales', sortable: true, tdClass: 'text-muted' },
          { key: 'stock', label: 'Stock', sortable: true, tdClass: 'text-muted' },
          { key: 'category', label: 'Category', sortable: true, tdClass: 'text-muted' },
          { key: 'status', label: 'Status', sortable: true, tdClass: 'text-muted' }
        ]
      }
    }
  },
  computed: {
      ...mapGetters(['prospects'])
  },
  methods: {
    ...mapActions(['getProspects']),
    onPaginationData (paginationData) {
      this.$refs.pagination.setPaginationData(paginationData)
    },
    onChangePage (page) {
      this.$refs.vuetable.changePage(page)
    },
    rowSelected (items) {
      this.bootstrapTable.selected = items
    },
    dataProvider (ctx) {
      const params = this.apiParamsConverter(ctx)
      let promise = axios.get(apiUrl + '/cakes/fordatatable', { params: params })

      return promise
        .then(result => result.data)
        .then((data) => {
          this.currentPage = data.current_page
          this.perPage = data.per_page
          this.totalRows = data.total
          const items = data.data
          return (items)
        }).catch(_error => {
          return []
        })
    },
    apiParamsConverter (params) {
      let apiParams = {}
      if (params.perPage !== 0) {
        apiParams.per_page = params.perPage
      }
      if (params.currentPage >= 1) {
        apiParams.page = params.currentPage
      }
      if (params.sortBy.length > 0) {
        apiParams.sort = `${params.sortBy}|${params.sortDesc ? 'desc' : 'asc'}`
      }
      if (params.filter.length > 0) {
        // Optional
      }
      return apiParams
    }
  },
  mounted () {
    this.getProspects()
  }
}
</script>
