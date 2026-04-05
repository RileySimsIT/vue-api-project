<script setup lang="ts">
import { ref } from 'vue'

const username = ref('')
const password = ref('')
const displayName = ref('')
const error = ref('')
const success = ref('')
const loading = ref(false)

const register = async () => {
  error.value = ''
  success.value = ''
  loading.value = true

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
    const data = await res.json()

    if (!res.ok) {
      throw new Error(data.error || 'Registration failed')
    }

    success.value = `Account created for ${data.username}`
    username.value = ''
    password.value = ''
    displayName.value = ''
  } catch (err: any) {
    error.value = err.message
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <form @submit.prevent="register" class="register-form">
    <h2>Create Account</h2>

    <div class="field">
      <label for="username">Username</label>
      <input id="username" v-model="username" type="text" required />
    </div>

    <div class="field">
      <label for="password">Password</label>
      <input id="password" v-model="password" type="password" required />
    </div>

    <div class="field">
      <label for="display_name">Display Name (optional)</label>
      <input id="display_name" v-model="displayName" type="text" />
    </div>

    <button type="submit" :disabled="loading">
      {{ loading ? 'Creating...' : 'Register' }}
    </button>

    <p v-if="error" class="msg error">{{ error }}</p>
    <p v-if="success" class="msg success">{{ success }}</p>
  </form>
</template>

<style scoped lang="scss">
.register-form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 320px;
  padding: 1.5rem;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.08);

  h2 {
    margin: 0 0 0.5rem;
    font-size: 1.4rem;
    font-weight: 600;
  }

  .field {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;

    label {
      font-size: 0.9rem;
      font-weight: 500;
    }

    input {
      padding: 0.6rem;
      border: 1px solid #ccc;
      border-radius: 6px;
      font-size: 1rem;
      transition: border-color 0.15s ease, box-shadow 0.15s ease;

      &:focus {
        outline: none;
        border-color: #4a90e2;
        box-shadow: 0 0 0 2px rgba(74,144,226,0.2);
      }
    }
  }

  button {
    margin-top: 0.5rem;
    padding: 0.7rem;
    background: #4a90e2;
    color: white;
    border: none;
    border-radius: 6px;
    font-size: 1rem;
    cursor: pointer;
    transition: background 0.15s ease;

    &:hover:not(:disabled) {
      background: darken(#4a90e2, 8%);
    }

    &:disabled {
      opacity: 0.6;
      cursor: not-allowed;
    }
  }

  .msg {
    font-size: 0.9rem;
    padding: 0.5rem;
    border-radius: 4px;

    &.error {
      background: #ffe5e5;
      color: #b30000;
    }

    &.success {
      background: #e6ffe6;
      color: #006600;
    }
  }
}
</style>
