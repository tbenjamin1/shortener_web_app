# Loan Management System

## Vue 3 + Vite

This project is built with Vue 3 and Vite, using Vue 3 `<script setup>` SFCs. For more details, check out the [Vue script setup documentation](https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup).

### Recommended IDE Setup

- [VS Code](https://code.visualstudio.com/)
- [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar)

---

## Overview

The Loan Management System is a web-based application designed to streamline loan management. Users can view their loan applications, submit new ones, and admins have the ability to approve or decline applications.

### Features

- **Applied Loans:** View a list of submitted loan applications.
- **Apply for a Loan:** Submit new loan applications with user-friendly forms.
- **Loan Status Management:** Admins can review, approve, or decline loan applications.
- **Tab-Based Navigation:** Easily navigate between sections with intuitive tabs.

---

## Tech Stack

- **Frontend:** Vue.js
- **State Management:** Vuex
- **HTTP Client:** Axios

---

## Folder Structure

- **`src/components`**: Contains reusable components.
- **`src/views`**: Page-specific components like `LoanApplication.vue`.
- **`src/store`**: Vuex store for state management.

---

## Quick Start

Follow these steps to set up the project locally:

```bash
# Clone the repository
git clone <repository-url>

# Navigate to the project directory
cd loan-management-system

# Install dependencies
npm install

# Start the development server
npm run serve

# Or using Yarn
yarn run dev
# unit testing 
npm run test # loan_management
