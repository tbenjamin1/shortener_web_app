import { createRouter, createWebHistory } from 'vue-router';
import store from '../vuexStore/store'; 
// Import your components
import LoginScreens from '../components/authScreens/LoginScreens.vue';
import Register from '../components/authScreens/Register.vue';
import userLoan from '../components/EndUser/userLoan.vue';
import ManageLoans from '../components/adminPages/ManageLoans.vue';

// Define routes
const routes = [
    { path: '/', redirect: '/login' }, // Default 
    { path: '/login', component: LoginScreens },
    { path: '/register', component: Register },
    { path: '/user-loan', component: userLoan, meta: { requiresAuth: true, roles: ['user'] }, },
    { path: '/Loan-management', component: ManageLoans, meta: { requiresAuth: true, roles: ['Admin'] }, },
   
];

// Create the router instance
const router = createRouter({
    history: createWebHistory(), 
    routes,
});

// Add navigation guards for role-based access
router.beforeEach((to, from, next) => {
    const user = store.state.user; // Get the current user from the Vuex store

    if (to.meta.requiresAuth && !user) {
        // Redirect to login if the route requires authentication and user is not logged in
        return next('/login');
    }

    if (to.meta.roles && !to.meta.roles.includes(user?.selectedRole)) {
        // Redirect based on role if the user does not have access
        if (user?.selectedRole === 'Admin') {
            return next('/Loan-management');
        } else if (user?.selectedRole === 'user') {
            return next('/user-loan');
        } else {
            return next('/login');
        }
    }

    next(); // Allow access if no restrictions apply
});

export default router;
