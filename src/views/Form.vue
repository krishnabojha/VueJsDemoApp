<template>
  <div class="form_page">
      <div class="form_title">
          <h3>{{formData.ftitle}}</h3>
      </div>
        <div>
            <b-form @submit.prevent="controlPath" id="input-form">
            <b-form-group id="input-group-1" label="Expense Name:" label-for="input-1">
                <b-form-input id="input-1" type="text" v-model="formData.name" required placeholder="Expense name" ></b-form-input>
            </b-form-group>

            <b-form-group id="input-group-2" label="Amount : " label-for="input-2">
                <b-form-input id="input-2" type="number" v-model.number="formData.amount" required placeholder="Expense Amount "></b-form-input>
            </b-form-group>

            <b-form-group id="input-group-3" label="Date : " label-for="input-3">
             <b-input-group class="mb-3">
                    <b-form-input v-model="formData.date" type="text" placeholder="YYYY/MM/DD" autocomplete="off"
                    ></b-form-input>
                    </b-input-group>
                </b-form-group>
            <b-button type="submit" v-model="formData.expenseform" variant="primary" id="btn">Submit</b-button>
           <router-link to="/">
               <b-button type="reset" variant="danger" id="btn">Cancel</b-button>
           </router-link>
            </b-form>
        </div>
  </div>
</template>
<script>
import { mapActions } from 'vuex'
import ExpenseData from '@/data/ExpenseData'
export default {
  // name: 'Form',
  data () {
    return {
      formData: {
        name: '',
        amount: null,
        date: null,
        ftitle: ''
      }
    }
  },

  methods: {
    ...mapActions([
      'addExpense'
    ]),
    handleSubmit () {
      const { name, amount, date } = this.formData
      const payload = {
        expense: {
          name,
          amount,
          date
        }
      }
      this.addExpense(payload)
      // reseting the form after submit
      this.formData = {
        name: '',
        amount: null,
        date: null
      }
      alert('You are going to save new expense')
      this.$router.push('/')
    },
    handleEdit () {
      // updating the expense data
      const ExpenseId = window.location.pathname.split('/')[2]
      console.log(typeof (window.location.pathname.split('/')[2]))
      ExpenseData[ExpenseId].name = this.formData.name
      ExpenseData[ExpenseId].amount = this.formData.amount
      ExpenseData[ExpenseId].date = this.formData.date
      this.$router.push('/')
    },
    controlPath () {
      // Check whether the form is for add or edit expense
      const ExpenseId = window.location.pathname.split('/')[2]
      if (ExpenseId === undefined) {
        this.handleSubmit()
      } else {
        this.handleEdit()
      }
    },
    init () {
      // Changing the title of form page whether add or edit form
      const ExpenseId = window.location.pathname.split('/')[2]
      let TitleCheck = ''
      if (ExpenseId === undefined) {
        TitleCheck = 'Expense Entry Form'
      } else {
        TitleCheck = 'Expense Edit Form'
      }
      this.formData = {
        ftitle: TitleCheck
      }
    }
  },
  mounted () {
    // Initialize the form page
    this.init()
  }
}
</script>

<style scoped lang="scss">
#input-form{
    width: 50%;
    margin-left: 25%;
}
#btn{
    margin-right: 8px;
}
</style>
