<template>
  <li

      class="todo"
      :class="{ completed: todo.completed, editing: todo == editedTodo }"
  >
    <div class="view">
      <input class="toggle" type="checkbox" v-model="todo.completed"/>
      <label @dblclick="$emit('editTodo',todo)">{{ todo.title }}</label>
      <button class="destroy" @click="$emit('removeTodo',todo.id)"></button>
    </div>
    <input
        class="edit"
        type="text"
        v-model="todo.title"
        v-todo-focus="todo === editedTodo"
        @blur= "$emit('doneEdit',todo)"
        @keyup.enter="$emit('doneEdit',todo)"
        @keyup.esc="$emit('cancelEdit',todo)"
    />
  </li>
</template>

<script>
export default {
  name: "TodoComponent",
  props: {
    todo: {
      required: true,
      type: Object
    },
    editedTodo: {
      type: String,
      default: ''
    }
  },
  directives: {
    "todo-focus": function (el, binding) {
      if (binding.value) {
        el.focus();
      }
    }
  }
}
</script>

<style scoped>

</style>
