<template>
  <div class="loan-application-container flex flex-col items-center bg-gray-50 min-h-screen py-10 px-5">
    <div class="text-center mb-8">
      <h1 class="text-2xl font-bold text-gray-800">Loan Management System</h1>
      <p class="text-sm text-gray-600 mt-2">Manage your loans efficiently and apply for new ones effortlessly</p>
    </div>

    <!-- Spinner -->
    <div
      v-if="loading"
      class="flex justify-center items-center w-full h-20"
    >
      <span>Loading...</span>
    </div>

    <!-- Reusable Tab Component -->
    <TabComponent
      :tabs="UserTabs"
      defaultTab="Apply Loan"
      v-if="!loading"
    >
      <template #default="{ currentTab }">
        <!-- Applied Loan Tab Content -->
        <div
          v-if="currentTab === 'loan-applied'"
          class="w-full max-w-5xl bg-white shadow-md rounded-md p-6"
        >
          <h2 class="text-xl font-semibold mb-4 text-gray-800">Your Loan Applications</h2>
          <table
            v-if="appliedLoans && appliedLoans.length"
            class="w-full table-auto border-collapse border border-gray-300"
          >
            <thead>
              <tr class="bg-gray-100">
                <th class="border border-gray-300 px-4 py-2 text-left">Loan Amount</th>
                <th class="border border-gray-300 px-4 py-2 text-left">Interest Rate</th>
                <th class="border border-gray-300 px-4 py-2 text-left">Monthly Income</th>
                <th class="border border-gray-300 px-4 py-2 text-left">Status</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="(loan, index) in appliedLoans"
                :key="index"
                class="hover:bg-gray-50"
              >
                <td class="border border-gray-300 px-4 py-2 text-gray-700">{{ loan.amount }}</td>
                <td class="border border-gray-300 px-4 py-2 text-gray-700">{{ loan.rate }}%</td>
                <td class="border border-gray-300 px-4 py-2 text-gray-700">{{ loan.income }}</td>
                <td class="border border-gray-300 px-4 py-2">
                  <span :class="{
                    'text-green-500': loan.status === 'Approved',
                    'text-yellow-500': loan.status === 'Pending',
                    'text-red-500': loan.status === 'Declined'
                  }">
                    {{ loan.status }}
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Apply Loan Tab Content -->
        <div
          v-if="currentTab === 'Apply Loan'"
          class="w-full max-w-md bg-white shadow-md rounded-md p-6"
        >
          <h2 class="text-xl font-semibold mb-4 text-gray-800">Apply for a Loan</h2>
          <form
            @submit.prevent="applyForLoan"
            class="space-y-6"
          >
            <div>
              <label
                for="loanAmount"
                class="block text-sm font-medium text-gray-700"
              >Loan Amount</label>
              <input
                id="loanAmount"
                v-model="loanAmount"
                type="number"
                class="mt-1 w-full border border-gray-300 rounded-md p-3 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter loan amount"
                required
              />
            </div>
            <div>
              <label
                for="monthlyIncome"
                class="block text-sm font-medium text-gray-700"
              >Monthly Income</label>
              <input
                id="monthlyIncome"
                v-model="monthlyIncome"
                type="number"
                class="mt-1 w-full border border-gray-300 rounded-md p-3 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter monthly income"
                required
              />
            </div>
            <button
              type="submit"
              class="w-full bg-blue-500 text-white py-3 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300 transition duration-300"
            >
              Submit Application
            </button>
          </form>
        </div>
      </template>
    </TabComponent>
  </div>
</template>

<script>
import TabComponent from "../reusable/TabsComponent.vue";
import { mapState, mapActions } from "vuex";

export default {
  components: {
    TabComponent,
  },
  data() {
    return {
      loanAmount: "",
      monthlyIncome: "",
      loans: [],
      currentTab:'Apply Loan'
    };
  },
  computed: {
    ...mapState(["UserTabs", "appliedLoans", "user", "loading"]),
  },
  methods: {
    ...mapActions(["fetchappliedLoans"]),

    applyForLoan() {
      if (this.loanAmount > this.monthlyIncome / 3) {
        alert("Loan amount cannot exceed 1/3 of your monthly income.");
        return;
      }
      const newLoan = {
         id: `${Date.now()}-${Math.floor(Math.random() * 100000)}`,
        amount: this.loanAmount,
        income: this.monthlyIncome,
        rate: 10,
        status: "Pending",
        
      };

      // Update localStorage
      const updatedLoans = [...(this.appliedLoans || []), newLoan];
      localStorage.setItem(
        "loanapplicationSubmitted",
        JSON.stringify(updatedLoans)
      );
      alert(
        "successfully sent!,kindly truck your loan by clicking applied  loan"
      );
     this.currentTab = "loan-applied";
      // Clear form
      this.loanAmount = "";
      this.monthlyIncome = "";

      // Reload loans
      this.fetchappliedLoans();
    },
  },
  mounted() {
    this.fetchappliedLoans();
  },
};
</script>
