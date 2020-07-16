<template>
  <div class="home">
    <h1>Expense</h1>
    <div id="nav">
      <div id="nav-btns">
        <!-- dropdown btn start -->
        <select id="dropdown-btn" @change="onChange($event)">
          <option value="1">Today(Default)</option>
          <option value="7">Last 7 days</option>
          <option value="30">Last 30 days</option>
        </select>
        <!-- dropdown button ends -->
        <!-- Add btn start -->
        <router-link to="/form">
          <b-button variant="outline-primary">+ADD</b-button>
        </router-link>
      </div>
      <br />
    </div>
    <hr />
    <!-- Add btn ends -->
    <!-- Expense detail block start -->
    <div id="expense_list" >
          <div v-for="item in object.DisplayExpense" v-bind:key="item" id="expense_item">
                <router-link :to="'form/'+item" tag="div">
                   Name : {{object["ExpenseData"][item].name}}<br>
                   Amount : {{object["ExpenseData"][item].amount}}<br>
                   Date : {{object["ExpenseData"][item].date}}<br>
                    </router-link>
                    </div><br>
    </div>
    <!-- Expense detail block ends -->
    <!-- Total amount show start -->
  <div style="margin-top:1%;">
      <h2>Total : {{object.totalamount}}</h2>
  </div>
  <!-- Total amount show end -->
  </div>
</template>

<script>
import ExpenseData from '@/data/ExpenseData'
export default {
  data () {
    return {
      object: {
        ExpenseData,
        DisplayExpense: [],
        totalamount: ''
      }
    }
  },
  methods: {
    // calculate total amount
    totalAmout: function (event) {
      let TotalAmount = 0
      const tdata = this.object.DisplayExpense
      // console.log('expenselist', this.object.DisplayExpense)
      tdata.forEach(element => {
        TotalAmount = TotalAmount + ExpenseData[element].amount
      })
      // console.log(TotalAmount)
      this.object.totalamount = TotalAmount
    },
    // Change expense list accourding to date
    onChange (event) {
      let ExpenseDay, ExpenseMonth
      let SelectedOption
      let CurrentDay
      this.object.DisplayExpense = []
      const dateObj = new Date()
      const CurrentMonth = parseInt(dateObj.toLocaleString().split('/')[0])
      const CurrentYear = dateObj.getFullYear()
      const noOfDays = new Date(CurrentYear, (CurrentMonth - 1), 0).getDate()
      if (event === '1') {
        SelectedOption = event
      } else {
        SelectedOption = event.target.value
      }
      for (let i = 0; i < ExpenseData.length; i++) {
        CurrentDay = parseInt(dateObj.toLocaleString().split('/')[1])
        ExpenseDay = parseInt(ExpenseData[i].date.split('/')[2])
        ExpenseMonth = parseInt(ExpenseData[i].date.split('/')[1])
        if (ExpenseMonth === (CurrentMonth - 1)) {
          CurrentDay = noOfDays + CurrentDay
        }
        if ((Math.abs(CurrentDay - ExpenseDay) < parseInt(SelectedOption)) && (Math.abs(CurrentMonth - ExpenseMonth) < 2)) {
          this.object.DisplayExpense.push(i)
        }
      }
      // console.log(this.object.DisplayExpense))
      // console.log(event.target.value)
      this.totalAmout()
    }
  },
  mounted () {
    this.onChange('1')
    this.totalAmout()
  }
}

</script>

<style scoped lang="scss">
.home {
  #expense_list {
    height: 60vh;
    overflow: auto;

    #expense_item {
        cursor: pointer;
        font-size: 20px;
        font-family: Georgia;
        background-color:teal;
        color:white;

        div{
          height: 90px;
          margin-bottom: 5px;
        }
    }
  }
}

#nav {
  padding: 10px 0px 20px 0px;

  #nav-btns {
    float: left;
    padding-left: 5%;

    #dropdown-btn{
      border-color: #0e7ad8;
      border-radius: 5px;
      color: #0e7ad8;
      height: 37px;
      width: 60%;
      font-size: 15px;
      margin-right: 10px;
    }
    #dropdown-btn:hover{
      background-color: #117cda;
      color: white;
    }
  }

  #add-btn {
    padding-left: 70%;
  }
}
</style>
