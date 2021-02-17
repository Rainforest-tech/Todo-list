<template>
  <footer class="footer" v-show="todosCount" v-cloak>
        <span class="todo-count">
          <strong>{{ remained }}</strong> {{ remained | pluralize }} left
        </span>
    <ul class="filters">
      <li>
        <a href="#/all" :class="{ selected: visibility === 'all' }">All</a>
      </li>
      <li>
        <a href="#/active" :class="{ selected: visibility === 'active' }"
          >Active</a
        >
      </li>
      <li>
        <a
            href="#/completed"
            :class="{ selected: visibility == 'completed' }"
        >Completed</a
        >
      </li>
    </ul>
    <button
        class="clear-completed"
        @click="$emit('removeCompleted')"
        v-show="todosCount > remained"
    >
      Clear completed
    </button>
  </footer>

</template>

<script>
export default {
  name: "FooterComponent",
  filters: {
    pluralize: function (n) {
      return n === 1 ? "item" : "items";
    }
  },
  props: {
    todosCount: {
      required: true,
      type: Number,
    },
    remained: {
      required: true,
      type: Number
    },
    visibility: {
      required: true,
      type: String
    }
  }
}
</script>

<style scoped>

</style>
