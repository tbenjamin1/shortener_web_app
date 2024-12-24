import Vuex from "vuex";

export default Vuex.createStore({
    state: {
        currentTab: "all",
        adminTabs: [
            { name: "all", label: "All" },
            { name: "approved", label: "Approved" },
            { name: "pending", label: "Pending" },
            { name: "declined", label: "Declined" },
        ],
        UserTabs: [
            { name: "Apply Loan", label: "Apply for a Loan" },
            { name: "loan-applied", label: "Applied Loans" },
        ],
        loans: [],
        appliedLoans: null, 
        loading: false,
        user: JSON.parse(localStorage.getItem("userLoggedIn")) || null,
    },
    getters: {
        filteredLoans(state) {
            if (state.currentTab === "all") {
                return state.loans;
            }
            return state.loans.filter(
                (loan) => loan.status.toLowerCase() === state.currentTab
            );
        },
        pendingCount(state) {
            return state.loans.filter((loan) => loan.status === "Pending").length;
        },
    },
    mutations: {
        setLoans(state, loans) {
            state.loans = loans;
        },
        setLoading(state, loading) {
            state.loading = loading;
        },
        setCurrentTab(state, tab) {
            state.currentTab = tab;
        },
        setUser(state, user) {
            state.user = user;
        },
        updateLoanStatus(state, { loanId, status }) {
            const loan = state.loans.find((loan) => loan.id === loanId);
            if (loan) {
                loan.status = status;
            }
        },
        setAppliedLoans(state, loans) {
            state.appliedLoans = loans;
        },
    },
    actions: {
        async loggedInUser({ commit }) {
            // Get user details on login
            const userData = JSON.parse(localStorage.getItem("userLoggedIn"));
            commit("setUser", userData);
        },
        async logout({ commit }) {
            // Clear the user on logout
            // localStorage.removeItem("userLoggedIn");
            // commit("setUser", null);
        },
        async fetchLoans({ commit }) {
            commit("setLoading", true);
            try {
                // Simulate API call
                await new Promise((resolve) => setTimeout(resolve, 2000));
                const allSavedLoans = JSON.parse(localStorage.getItem("loanapplicationSubmitted")) || [];
                commit("setLoans", allSavedLoans);
            } catch (error) {
                alert("Failed to load loans!");
            } finally {
                commit("setLoading", false);
            }
        },
        changeLoanStatus({ commit, state }, { loanId, status }) {
            // Commit the mutation to update the loan status in Vuex state
            commit("updateLoanStatus", { loanId, status });

            // Update localStorage to reflect the changed status
            const updatedLoans = state.loans.map((loan) =>
                loan.id === loanId ? { ...loan, status } : loan
            );
            localStorage.setItem("loanapplicationSubmitted", JSON.stringify(updatedLoans));
        },

        async fetchappliedLoans({ commit }) {
            commit("setLoading", true);
            try {
                // Fetch data from localStorage
                const savedLoans = JSON.parse(localStorage.getItem("loanapplicationSubmitted")) || [];
              
                commit("setAppliedLoans", savedLoans);
            } catch (error) {
                console.error("Error loading applied loans:", error);
            } finally {
                commit("setLoading", false);
            }
        },
    },
});
