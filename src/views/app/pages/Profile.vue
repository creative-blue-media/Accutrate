<template>
<div>
  <b-row>
    <b-colxx xxs="12">
      <cbm-breadcrumb :heading="$t('menu.forms')"/>
      <div class="separator mb-5"></div>
    </b-colxx>
  </b-row>
  <b-row>
    <b-colxx xxs="12">
        <b-card class="mb-4" :title="$t('Employee Profile')">
          <b-form @submit.prevent="onGridFormSubmit">
            <b-row>

              <b-colxx sm="6">
                <b-form-group :label="$t('forms.email')">
                  <b-form-input type="email" v-model="currentUser.email" />
                </b-form-group>
              </b-colxx>
              <b-colxx sm="6">
                <b-form-group :label="$t('forms.password')">
                  <b-form-input type="password" v-model="currentUser.password"/>
                </b-form-group>
              </b-colxx>
              <b-colxx sm="12">
                <b-form-group :label="$t('forms.address')">
                  <b-form-input v-model="currentUser.address.street" placeholder="Address"></b-form-input>
                </b-form-group>
              </b-colxx>
              <b-colxx sm="6">
                <b-form-group :label="$t('forms.city')">
                  <b-form-input v-model="currentUser.address.city" placeholder="City"></b-form-input>
                </b-form-group>
              </b-colxx>
              <b-colxx sm="4">
                <b-form-group :label="$t('forms.state')">
                  <b-form-select v-model="currentUser.address.state" :options="stateOptions" plain  />
                </b-form-group>
              </b-colxx>
              <b-colxx sm="2">
                <b-form-group :label="$t('forms.zip')">
                  <b-form-input v-model="currentUser.address.zip" placeholder="Zip"></b-form-input>
                </b-form-group>
              </b-colxx>
            </b-row>

            <b-button type="submit" variant="primary" class="mt-4">{{ $t('forms.update') }}</b-button>
          </b-form>
        </b-card>
    </b-colxx>
  </b-row>
  </div>
</template>
<script>
// import InputTag from '@/components/Form/InputTag'
// import vSelect from 'vue-select'
import { mapGetters } from 'vuex'
import 'vue-select/dist/vue-select.css'
import { validationMixin } from 'vuelidate'
const { required } = require('vuelidate/lib/validators')

export default {
  components: {
    // InputTag,
    // vSelect
  },
  data () {
    return {
      name: '',
      age: 0,
      basicForm: {
        email: '',
        password: '',
        checked: false
      },
      horizontalForm: {
        email: '',
        password: '',
        radio: '',
        checked: false
      },
      topLabelsOverLineForm: {
        email: '',
        password: '',
        tags: [],
        date: null,
        select: '',
        checked: false
      },
      topLabelsInInputForm: {
        email: '',
        password: '',
        tags: [],
        date: null,
        select: '',
        checked: false
      },
      gridForm: {
        email: '',
        password: '',
        address1: '',
        address2: '',
        city: '',
        state: '',
        zip: ''
      },
      inlineForm: {
        fullname: '',
        lastname: '',
        checked: false
      },
      validateForm: {
        firstname: 'John',
        lastname: 'Doe',
        state: '',
        city: ''
      },

      horizontalFormRadios: [
        this.$t('forms.first-radio'),
        this.$t('forms.second-radio'),
        { text: this.$t('forms.third-radio-disabled'), disabled: true }
      ],
      selectData: [
        { label: 'Chocolate', value: 'chocolate' },
        { label: 'Vanilla', value: 'vanilla' },
        { label: 'Strawberry', value: 'strawberry' },
        { label: 'Caramel', value: 'caramel' },
        { label: 'Cookies and Cream', value: 'cookiescream' },
        { label: 'Peppermint', value: 'peppermint' }
      ],
      stateOptions: [ 'AL', 'AK', 'AS', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'DC', 'FM', 'FL', 'GA', 'GU', 'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MH', 'MD', 'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ', 'NM', 'NY', 'NC', 'ND', 'MP', 'OH', 'OK', 'OR', 'PW', 'PA', 'PR', 'RI', 'SC', 'SD', 'TN', 'TX', 'UT', 'VT', 'VI', 'VA', 'WA', 'WV', 'WI', 'WY' ]
    }
  },
  mixins: [validationMixin],
  validations: {
    validateForm: {
      firstname: {
        required
      },
      lastname: {
        required
      },
      city: {
        required
      },
      state: {
        required
      }
    }
  },
  computed: {
    ...mapGetters({
      currentUser: 'currentUser'
    })
  },
  methods: {
    onBasicSubmit () {
      console.log(JSON.stringify(this.basicForm))
    },
    onHorizontalSubmit () {
      console.log(JSON.stringify(this.horizontalForm))
    },
    onTopLabelsOverLineFormSubmit () {
      console.log(JSON.stringify(this.topLabelsOverLineForm))
    },
    onTopLabelsInInputFormSubmit () {
      console.log(JSON.stringify(this.topLabelsInInputForm))
    },
    onGridFormSubmit () {
      console.log(JSON.stringify(this.gridForm))
    },
    onInlineSubmit () {
      console.log(JSON.stringify(this.inlineForm))
    },
    onValitadeFormSubmit () {
      console.log(JSON.stringify(this.validateForm))
    }
  }
}
</script>
