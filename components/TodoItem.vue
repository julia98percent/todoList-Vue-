<template>
  <div class="todo-item">
    <input
    :v-model="done"
    type="checkbox"
    @click="updateTodo"
    />
    <div class="item_title-wrap">
      <div class="item_title">
        {{todo.title}}
      </div>
      <div class="item_date">
        {{ date }}
      </div>
    </div>
    <div class="item_actions">
      <button @click="onEditMode">수정</button>
      <button @click="deleteTodo">삭제</button>
    </div>
  </div>
</template>

<script>
import dayjs from 'dayjs'

export default {
  props: {
    todo: Object
  },
  computed: {
    done: {
      get() {
        return this.todo.done
      },
      set (done) {
        this.updateTodo({
          done
        })
      }
    },
    date () {
      const date = dayjs(this.todo.createdAt)
      const isSame = date.isSame(this.todo.updatedAt)

      if (isSame) {
        return date.format('YYYY년 MM월 DD일')
      } else {
        return `${date.format('YYYY년 MM월 DD일')} (edited)`
      }
    }
  },
  methods: {
    onEditMode() {

    },
    offEditMode () {

    },
    updateTodo(value) {
      this.$emit('update-todo', this.todo, value)
    },
    deleteTodo() {
      this.$emit('delete-todo', this.todo)
    }
  }
}
</script>

<style>

</style>