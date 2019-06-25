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
        <b-card class="mb-4" :title="$t('forms.grid')">
          <b-form @submit.prevent="onGridFormSubmit">
            <b-row>

              <b-colxx sm="6">
                <b-form-group :label="$t('forms.email')">
                  <b-form-input type="email" v-model="gridForm.email" />
                </b-form-group>
              </b-colxx>
              <b-colxx sm="6">
                <b-form-group :label="$t('forms.password')">
                  <b-form-input type="password" v-model="gridForm.password"/>
                </b-form-group>
              </b-colxx>

              <b-colxx sm="12">
                <b-form-group :label="$t('forms.address')">
                  <b-form-input v-model="gridForm.address1" ></b-form-input>
                </b-form-group>
              </b-colxx>

              <b-colxx sm="12">
                <b-form-group :label="$t('forms.address2')">
                  <b-form-input v-model="gridForm.address2" ></b-form-input>
                </b-form-group>
              </b-colxx>

              <b-colxx sm="6">
                <b-form-group :label="$t('forms.city')">
                  <b-form-input v-model="gridForm.city" ></b-form-input>
                </b-form-group>
              </b-colxx>
              <b-colxx sm="4">
                <b-form-group :label="$t('forms.state')">
                  <b-form-select v-model="gridForm.state" :options="stateOptions" plain  />
                </b-form-group>
              </b-colxx>
              <b-colxx sm="2">
                <b-form-group :label="$t('forms.zip')">
                  <b-form-input v-model="gridForm.zip" ></b-form-input>
                </b-form-group>
              </b-colxx>
            </b-row>

            <b-button type="submit" variant="primary" class="mt-4">{{ $t('forms.signin') }}</b-button>
          </b-form>
        </b-card>
    </b-colxx>
  </b-row>
  </div>
</template>
<script>
// import InputTag from '@/components/Form/InputTag'
// import vSelect from 'vue-select'
import 'vue-select/dist/vue-select.css'
import { validationMixin } from 'vuelidate'
const { required } = require('vuelidate/lib/validators')

export default {
  components: {
    // InputTag,
    // vSelect //
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
      stateOptions: ['', 'Option1', 'Option2', 'Option3', 'Option4', 'Option5']
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
