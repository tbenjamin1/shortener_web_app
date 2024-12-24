import { createStore } from 'vuex';
import store from '../../vuexStore/store';

describe('Vuex Store', () => {
    beforeEach(() => {

        store.replaceState({
            currentTab: 'all',
            adminTabs: [
                { name: 'all', label: 'All' },
                { name: 'approved', label: 'Approved' },
                { name: 'pending', label: 'Pending' },
                { name: 'declined', label: 'Declined' },
            ],
            UserTabs: [
                { name: "loan-applied", label: "Applied Loans" },
                { name: "Apply Loan", label: "Apply for a Loan" },
            ],
            loans: [],
            appiedLoans: [],
            loading: false,
            user: null,
        });


    });

    it('has correct initial state', () => {
        const state = store.state;

        expect(state.currentTab).toBe('all');
        expect(state.adminTabs.length).toBe(4);
        expect(state.UserTabs.length).toBe(2);
        expect(state.loans).toEqual([]);
        expect(state.appiedLoans).toEqual([]);
        expect(state.loading).toBe(false);
        expect(state.user).toBeNull();
    });

    it('filteredLoans getter returns all loans when currentTab is "all"', () => {
        const state = store.state;
        state.loans = [
            { id: 1, status: 'Approved' },
            { id: 2, status: 'Pending' },
            { id: 3, status: 'Declined' },
        ];

        const filteredLoans = store.getters.filteredLoans;
        expect(filteredLoans).toEqual(state.loans);
    });
    it('fetchLoans action fetches loans correctly', async () => {
        await store.dispatch('fetchLoans');
        // Assuming 5 loans are returned
        expect(store.state.loans.length).toBe(5);  
    });












});
