<template>
  <div>
      <button @click="createTodo">추가</button>
      <input
      :value="title"
      :placeholder="placeholder"
      type="text"
      @input="title = $event.target.value"
      @keypress.enter="createTodo">
  </div>
</template>

<script>
export default {
    data () {
      return {
        title: '',
        placeholder: '할 일을 입력하세요!'
      }
    },
    methods: {
      createTodo () {
        //boolean값을 가짐
        const validatedTitle = this.title && this.title.trim()
        if(!validatedTitle) {
          alert('유효하지 않은 제목입니다!')
          this.title = this.title.trim()
          return
        }
      //생성
      this.$emit('create-todo', this.title)
      this.title = ''
      }
    }
}
</script>