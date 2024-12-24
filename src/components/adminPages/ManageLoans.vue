<template>
    <div class="admin-management-container flex flex-col items-center bg-gray-50 min-h-screen py-10 px-5">
        <div class="text-center mb-8">
            <h1 class="text-2xl font-bold text-gray-800">Admin Loan Management</h1>
          

            <div class="flex justify-between items-center my-3">
         <p class="text-sm text-gray-600 ">Manage and review all loan applications effortlessly</p>
        <button
          @click="logout"
          class=" bg-gray-500 px-4 mx-3 text-white text-sm rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300 transition duration-300 disabled:bg-blue-300"
        >
          Logout
        </button>
      </div>
        </div>

        <!-- adminTabs with Pending Badge -->
        <div class="tab flex justify-center flex-wrap w-full gap-4 my-8">
            <button v-for="tab in adminTabs" :key="tab.name"
                class="px-6 py-2 font-semibold rounded-md focus:outline-none transition duration-300 flex items-center gap-2 justify-center"
                :class="currentTab === tab.name ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-700'"
                @click="setTab(tab.name)">
                {{ tab.label }}
                <span v-if="tab.name === 'pending' && pendingCount > 0"
                    class="text-sm bg-red-500 text-white rounded-full px-2 py-0.5">
                    {{ pendingCount }}
                </span>
            </button>
        </div>

        <!-- Spinner -->
        <div v-if="loading" class="flex justify-center items-center w-full h-20">
            <span> loading ... </span>
        </div>

        <!-- Loans Table -->
        <div v-if="!loading" class="w-full max-w-5xl bg-white shadow-md rounded-md p-5">
            <h2 class="text-lg font-semibold mb-4">Loans ({{ filteredLoans.length }})</h2>
            <div class="overflow-x-auto scrollbar-thin scrollbar-thumb-blue-500 scrollbar-track-gray-200">
                <table class="w-full table table-auto border-collapse border border-gray-300">
                    <thead>
                        <tr class="bg-gray-100">
                            <th class="border border-gray-300 px-4 py-2 text-left text-base sm:text-sm">Loan Amount</th>
                            <th class="border border-gray-300 px-4 py-2 text-left text-base sm:text-sm">Rate</th>
                            <th class="border border-gray-300 px-4 py-2 text-left text-base sm:text-sm">Monthly Income
                            </th>
                            <th class="border border-gray-300 px-4 py-2 text-left text-base sm:text-sm">Status</th>
                            <th v-if="currentTab === 'pending'"
                                class="border border-gray-300 px-4 py-2 text-left text-base sm:text-sm">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="loan in filteredLoans" :key="loan.id" class="hover:bg-gray-50 active:bg-gray-200">
                            <td class="border border-gray-300 px-4 py-2 text-base sm:text-sm">{{ loan.amount }}</td>
                            <td class="border border-gray-300 px-4 py-2 text-base sm:text-sm">{{ loan.rate }} %</td>
                            <td class="border border-gray-300 px-4 py-2 text-base sm:text-sm">{{ loan.income }}</td>
                            <td class="border border-gray-300 px-4 py-2 text-base sm:text-sm">
                                <span :class="{
                                    'text-green-500': loan.status === 'Approved',
                                    'text-yellow-500': loan.status === 'Pending',
                                    'text-red-500': loan.status === 'Declined',
                                }">
                                    {{ loan.status }}
                                </span>
                            </td>
                            <td v-if="currentTab === 'pending'"
                                class="border border-gray-300 px-4 py-2 text-base sm:text-sm flex gap-2">
                                <button class="bg-green-500 text-white px-3 py-1 rounded-md hover:bg-green-600"
                                    @click="handleChangeLoanStatus(loan.id, 'Approved')">
                                    Approve
                                </button>
                                <button class="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600"
                                    @click="handleChangeLoanStatus(loan.id, 'Declined')">
                                    Decline
                                </button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>

<script>
import { mapState, mapGetters, mapActions, mapMutations } from 'vuex';

export default {
    computed: {
        ...mapState(['currentTab', 'adminTabs', 'loans', 'loading']),
        ...mapGetters(['filteredLoans', 'pendingCount']),
    },
    methods: {
        ...mapActions(['fetchLoans', 'changeLoanStatus']),
        ...mapMutations(['setCurrentTab']),
        setTab(tab) {
            this.setCurrentTab(tab);
        },
         logout() {
      // Clear user data from localStorage
      localStorage.removeItem("userLoggedIn");

      // Reset Vuex user state
      this.$store.commit("setUser", null);

      // Redirect to the login page
      this.$router.push("/login");
    },
        // Change the name of the method to avoid recursion
        handleChangeLoanStatus(loanId, status) {
            // Call the action instead of recursively calling this method
            this.changeLoanStatus({ loanId, status });
        },
    },
    mounted() {
        this.fetchLoans();
    },
};
</script>
