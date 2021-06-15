<template>
  <header>
    <nav>
      <router-link to="/">Index</router-link>
      <router-link to="/login">Login</router-link>
      <router-link to="/secret">Secret</router-link>
    </nav>
  </header>
  <main>
    <router-view></router-view>
  </main>
</template>
