<template>
    <div class="w-full">
        <!-- Tab Headers -->
        <div class="flex justify-center space-x-4 mb-8">
            <button v-for="tab in tabs" :key="tab.name"
                class="px-6 py-2 font-semibold rounded-md focus:outline-none transition duration-300"
                :class="currentTab === tab.name ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-700'"
                @click="selectTab(tab.name)">
                {{ tab.label }}
            </button>
        </div>
        <!-- Tab Content -->
        <div class=" flex justify-center items-center w-full" >
            <slot :currentTab="currentTab" />
        </div>
    </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from "vuex";
export default {
    props: {
        tabs: {
            type: Array,
            required: true,
            default: () => [],
        },
        defaultTab: {
            type: String,
            required: true,
        },
    },
    data() {
        return {
            currentTab: this.defaultTab,
        };
    },

      computed: {
    ...mapState(["switchLoanTab"]),
  },

   watch: {
    switchLoanTab: {
      handler(value) {
        if (!value) return;

    console.log('value',value)
        this.currentTab='loan-applied'
      },
      immediate: true,
      deep: true, // Ensure that changes 
    },
},
    methods: {
        selectTab(tabName) {
            this.$store.commit('setchangeCurrentTab','')
            this.currentTab = tabName;
        },
    },
};
</script>

<style scoped>
button {
    transition: all 0.3s ease;
}
</style>
