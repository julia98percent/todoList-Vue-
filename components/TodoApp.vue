<template>
    <div>
        <todo-item
            v-for="todo in todos"
            :key="todo.id"
            :todo="todo"
            @update-todo="updateTodo"
            @delete-todo="deleteTodo"/>

            <hr/>

        <todo-creator @create-todo="createTodo"/>
        <!-- create-todo라는 이벤트가 실행될 때 createTodo라는 메소드가 실행됨 -->
    </div>
</template>

<script>
import lowdb from 'lowdb'
import LocalStorage from 'lowdb/adapters/LocalStorage'
import cryptoRandomString from 'crypto-random-string'
import _cloneDeep from 'lodash/cloneDeep'
import TodoCreator from './TodoCreator'
import TodoItem from './TodoItem'

export default {
    components: {
        TodoCreator, TodoItem
    },
    data () {
        return {
            db: null,
            todos: []
        }
    },
    //TodoApp이라는 컴포넌트가 생성되고 난 직후
    created() {
        this.initDB()
    },
    methods: {
        initDB () {
            const adapter = new LocalStorage('todo-app') //DB 이름: todoApp
            this.db = lowdb(adapter)

            const hasTodos = this.db.has('todos').value() //Lodash 제공 메소드 - 값이 있는지 없는지 체크

            if (hasTodos) {
                this.todos = _cloneDeep(this.db.getState().todos)
            }else {
                //Local DB 초기화
                this.db.defaults({
                    todos: [] //Collection
                }).write()
            }
            
        },
        createTodo (title) {
            const newTodo = {
                id: cryptoRandomString({ length: 10 }),
                title,
                createdAt: new Date(),
                updatedAt: new Date(),
                done: false
            }
        this.db
        .get('todos') //lodash
        .push(newTodo) //lodash
        .write() //lowdb
        },
        updateTodo () {
            console.log('Update todo!')
        },
        deleteTodo () {
            console.log('Delete todo!')
        }
    }
}
</script>

<style>

</style>