<script setup lang="ts">
import { ref } from 'vue'

const username = ref('')
const password = ref('')
const displayName = ref('')
const error = ref('')
const success = ref('')

const register = async () => {
  error.value = ''
  success.value = ''

  try {
    const res = await fetch('http://localhost:3000/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username: username.value,
        password: password.value,
        displayName: displayName.value || undefined
      })
    })

    if (!res.ok) {
      const data = await res.json()
      throw new Error(data.error || 'Registration failed')
    }

    const data = await res.json()
    success.value = `User created: ${data.username}`
  } catch (err: any) {
    error.value = err.message
  }
}
</script>

<template>
  <form @submit.prevent="register" class="register-form">
    <h2>Create Account</h2>

    <label>Username</label>
    <input v-model="username" type="text" required />

    <label>Password</label>
    <input v-model="password" type="password" required />

    <label>Display Name (optional)</label>
    <input v-model="displayName" type="text" />

    <button type="submit">Register</button>

    <p v-if="error" style="color:red">{{ error }}</p>
    <p v-if="success" style="color:green">{{ success }}</p>
  </form>
</template>

<style scoped>
.register-form {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  max-width: 300px;
}
</style>
