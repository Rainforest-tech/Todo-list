<template>
  <div id="app">
    <section class="todoapp">
      <header-component @newTodo="addTodo"/>

      <section class="main" v-show="todos.length" v-cloak>
        <input
            id="toggle-all"
            class="toggle-all"
            type="checkbox"
            v-model="allDone"
        />
        <label for="toggle-all"></label>
        <ul class="todo-list">
          <todo-component
              v-for="todo in filteredTodos"
              class="todo"
              :key="todo.id"
              :class="{ completed: todo.completed, editing: todo === editedTodo }"
              :todo="todo"
              :edited-todo="editedTodo"
              @removeTodo="removeTodo"
              @editTodo="editTodo"
              @cancelEdit="cancelEdit"
              @doneEdit="doneEdit"
          />
        </ul>
      </section>
      <footer-component
          :remained="remaining"
          :todos-count="todos.length"
          :visibility="visibility"
          @removeCompleted="removeCompleted"
      />
    </section>
  </div>
</template>

<script>
import {todoStorage} from "./helpers";
import HeaderComponent from "@/components/HeaderComponent";
import FooterComponent from "@/components/FooterComponent";
import TodoComponent from "@/components/TodoComponent";


export default {
  components: {TodoComponent, FooterComponent, HeaderComponent},
  data() {
    return {
      todos: todoStorage.fetch(),
      editedTodo: null,
      visibility: "all"
    }
  },
  mounted() {
    window.addEventListener("hashchange", this.onHashChange);
    this.onHashChange()

  },
  computed: {
    filteredTodos() {
      return this.$options.filters[this.visibility](this.todos);
    },
    remaining() {
      return this.$options.filters.active(this.todos).length;
    },
    allDone: {
      get: function () {
        return this.remaining === 0;
      },
      set: function (value) {
        this.todos.forEach(function (todo) {
          todo.completed = value;
        });
      }
    }
  },

  methods: {
    onHashChange: function () {
      var visibility = window.location.hash.replace(/#\/?/, "");
      if (this.$options.filters[this.visibility]) {
        this.visibility = visibility;
      } else {
        window.location.hash = "";
        this.visibility = "all";
      }
    },
    addTodo(value) {

      value = value.trim();
      if (!value) {
        return;
      }
      this.todos.push({
        id: todoStorage.uid++,
        title: value,
        completed: false
      });
      this.newTodo = "";
    },

    removeTodo: function (id) {
      this.todos = this.todos.filter((todo) => todo.id !== id);
    },

    editTodo: function (todo) {
      this.beforeEditCache = todo.title;
      this.editedTodo = todo;
    },

    doneEdit: function (todo) {
      if (!this.editedTodo) {
        return;
      }
      this.editedTodo = null;
      todo.title = todo.title.trim();
      if (!todo.title) {
        this.removeTodo(todo);
      }
    },

    cancelEdit: function (todo) {
      this.editedTodo = null;
      todo.title = this.beforeEditCache;
    },

    removeCompleted: function () {
      this.todos = this.$options.filters.active(this.todos);
    }
  },

}
</script>


