<template>
    <div class="flex flex-col min-h-screen  justify-center items-center ">
        <div class="flex flex-wrap w-full login-container justify-center items-center  py-10">
            <!-- Middle Container -->
            <div class="flex flex-col justify-center items-center w-full max-w-xl p-8 rounded-lg shadow-lg">
                <div class="text-center mb-6">
                    <h1 class="text-2xl font-bold text-gray-800">
                        Welcome to Microloan Management System
                    </h1>
                    <p class="text-gray-600 text-base mt-2">
                        Please log in to access your account
                    </p>
                </div>
                <!-- Login Form -->
                <div class="w-full p-6">
                    <div class="text-center mb-4">
                        <h2 class="text-2xl font-semibold text-gray-700">Login</h2>
                    </div>
                    <form @submit.prevent="login" class="space-y-5">
                        <div>
                            <label for="telephone" class="block text-sm font-medium text-gray-700">
                                Telephone
                            </label>
                            <input id="telephone" v-model="telephone" type="text" aria-label="Telephone number"
                                class="mt-1 w-full border border-gray-300 rounded-md p-3 focus:ring-blue-500 focus:border-blue-500"
                                placeholder="Enter your telephone number" required />
                        </div>
                        <div>
                            <label for="password" class="block text-sm font-medium text-gray-700">
                                Password
                            </label>
                            <input id="password" v-model="password" type="password" aria-label="Password"
                                class="mt-1 w-full border border-gray-300 rounded-md p-3 focus:ring-blue-500 focus:border-blue-500"
                                placeholder="Enter your password" required />
                        </div>
                        <button type="submit" :disabled="loading"
                            class="w-full bg-blue-500 text-white py-3 rounded-md flex justify-center items-center hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300 transition duration-300 disabled:bg-blue-300">
                            <span v-if="loading">
                                ...
                            </span>
                            <span v-else>Login</span>
                        </button>
                    </form>
                    <p class="text-center text-sm mt-4">
                        Don't have an account?
                        <router-link to="/register" class="text-blue-500 font-semibold hover:underline">
                            Register here
                        </router-link>
                    </p>
                    <p v-if="loginError" class="text-center text-red-500 text-sm mt-4">
                        {{ loginError }}
                    </p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import { mapState, mapGetters, mapActions } from "vuex";
export default {
    data() {
        return {
            telephone: '',
            password: '',
            loginError: '',
            loading: false,
        };
    },
    methods: {
        ...mapActions(["loggedInUser"]),

        
      async login() {
    this.loginError = '';
    this.loading = true;

    try {
        
        await new Promise(resolve => setTimeout(resolve, 2000)); // Delay for 2 seconds

        // Retrieve all registered users from localStorage
        const allSavedUsers = JSON.parse(localStorage.getItem("user-registerUserInfo")) || [];
      

        // Find the user based on the telephone entered by the user
        const matchedUser = allSavedUsers.find(user => user.telephone === this.telephone);

        if (!matchedUser) {
            this.loginError = 'User not found! Please check your telephone.';
            return;
        }

        // Check if the password matches
        if (matchedUser.password === this.password) {
           
            localStorage.setItem("userLoggedIn", JSON.stringify(matchedUser));

            // Redirect based on user role
            if (matchedUser.selectedRole === "Admin") {
                 console.log(matchedUser.selectedRole,'matchedUser', this.password);
                 this.loggedInUser();
                 this.$router.push('/Loan-management');
            } else {
                 console.log(matchedUser.selectedRole,'matchedUser', this.password);
                 this.loggedInUser();
                this.$router.push("/user-loan");
            }
        } else {
            this.loginError = 'Incorrect password! Please try again.';
        }
    } catch (error) {
        this.loginError = 'Login failed! Please try again later.';
    } finally {
        this.loading = false;
    }
}

    },
};
</script>

<style scoped>
/* Styles to enhance the visual layout */
.login-container {
    padding: 1rem;
}

.middle-container {
    max-width: 600px;
}

button:disabled {
    cursor: not-allowed;
}
</style>
