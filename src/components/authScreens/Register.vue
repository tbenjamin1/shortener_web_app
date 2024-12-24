<template>
  <div class="flex flex-col min-h-screen bg-gray-50">
    <div class="flex   justify-center items-center  flex-wrap w-full login-container">
      <div class="flex justify-center items-center  w-full  p-6 middle-container">
        <!-- Register form -->
        <div class="w-full max-w-lg bg-white shadow-lg  rounded-lg p-8">
          <div class="w-full text-center mb-6">
            <h2 class="text-2xl font-bold text-gray-800">Register</h2>
            <p class="text-sm text-gray-600 mt-2">Create your account below</p>
          </div>
          <form
            @submit.prevent="validatePassword"
            class="space-y-6"
          >
            <div>
              <label
                for="firstName"
                class="block text-sm font-medium text-gray-700"
              >
                First Name
              </label>
              <input
                id="firstName"
                v-model="firstName"
                type="text"
                class="mt-1 w-full border border-gray-300 rounded-md p-3 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter your first name"
                required
              />
            </div>
            <div>
              <label
                for="lastName"
                class="block text-sm font-medium text-gray-700"
              >
                Last Name
              </label>
              <input
                id="lastName"
                v-model="lastName"
                type="text"
                class="mt-1 w-full border border-gray-300 rounded-md p-3 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter your last name"
                required
              />
            </div>
            <div>
              <label
                for="telephone"
                class="block text-sm font-medium text-gray-700"
              >
                Telephone
              </label>
              <input
                id="telephone"
                v-model="telephone"
                type="text"
                class="mt-1 w-full border border-gray-300 rounded-md p-3 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter your telephone number"
                required
                @input="validateTelephone"
              />
              <p
                v-if="telephoneError"
                class="text-red-500 text-sm mt-1"
              >
                Please enter a valid telephone number.
              </p>
            </div>

             <div>
              <label
                for="password"
                class="block text-sm font-medium text-gray-700"
              >
                User Role
              </label>
              <select
                class="border rounded-md"
                v-model="selectedRole"
                name="Role"
                id="Role"
                required
              >
                <option value="">Role</option>
                <option value="user">User</option>
                <option value="Admin">Admin</option>

              </select>
            </div>

            <div>
              <label
                for="password"
                class="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <input
                id="password"
                v-model="password"
                type="password"
                class="mt-1 w-full border border-gray-300 rounded-md p-3 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter your password"
                required
              />
            </div>

           

            <div>
              <label
                for="confirmPassword"
                class="block text-sm font-medium text-gray-700"
              >
                Confirm Password
              </label>
              <input
                id="confirmPassword"
                v-model="confirmPassword"
                type="password"
                class="mt-1 w-full border border-gray-300 rounded-md p-3 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Re-enter your password"
                required
              />
              <p
                v-if="passwordMismatch"
                class="text-red-500 text-sm mt-1"
              >
                Passwords do not match.
              </p>
            </div>
            <button
              type="submit"
              :disabled="loading"
              class="w-full bg-blue-500 text-white py-3 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300 transition duration-300 disabled:bg-blue-300"
            >
              <span v-if="loading">
                ...
              </span>
              <span v-else>Register</span>
            </button>
          </form>
          <p class="py-4 text-center text-sm">
            Already have an account?
            <router-link
              to="/login"
              class="text-blue-500 font-semibold hover:underline"
            >
              Login here
            </router-link>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { mapState, mapActions } from "vuex";
export default {
  data() {
    return {
      firstName: "",
      lastName: "",
      telephone: "",
      password: "",
      confirmPassword: "",
      telephoneError: false,
      passwordMismatch: false,
      loading: false,
      selectedRole: null,
    };
  },
   computed: {
    ...mapState(["user"]),
  },
  methods: {
    validateTelephone() {
      const numericRegex = /^[0-9]*$/;
      // Show error if not numeric
      this.telephoneError = !numericRegex.test(this.telephone);
    },
    validatePassword() {
      if (this.password !== this.confirmPassword) {
        // Show mismatch error
        this.passwordMismatch = true;
        return;
      }
      this.passwordMismatch = false;
      // Proceed with registration
      this.register();
    },
   async register() {
  this.loading = true;
  try {
    const registerUserInfo = {
      id: this.password, 
      firstName: this.firstName,
      lastName: this.lastName,
      telephone: this.telephone,
      password: this.password,
      selectedRole: this.selectedRole,
      token: `admin-token-12345-${this.selectedRole}-${this.password}`,
    };
    
    // Retrieve existing users from localStorage
    const existingUsers = JSON.parse(localStorage.getItem("user-registerUserInfo")) || [];
    
    // Add the new user to the existing list
    existingUsers.push(registerUserInfo);
    
    // Save updated user list back to localStorage
    localStorage.setItem("user-registerUserInfo", JSON.stringify(existingUsers));
    
    alert("Registration successful!");
    this.$router.push("/login");
  } catch (error) {
    alert("Registration failed!");
  } finally {
    this.loading = false;
  }
}

  },
};
</script>

<style scoped>
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
