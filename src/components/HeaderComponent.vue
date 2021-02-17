<template>
  <header class="header">
    <h1>todos</h1>
    <input
        class="new-todo"
        autofocus
        autocomplete="off"
        placeholder="What needs to be done?"
        v-model="newTodo"
        @keyup.enter="emitNewTodo"
    />
  </header>
</template>

<script>
export default {
  name: "HeaderComponent",
  data() {
    return {
      newTodo: '',
    }
  },
  methods: {
    emitNewTodo() {
      this.$emit('newTodo', this.newTodo);
      this.newTodo = ''
    }
  }
}
</script>

<style scoped>

</style>
