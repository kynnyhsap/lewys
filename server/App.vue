<template>
    <div id="app">
        <input type="text" v-model="text">
        <h1>{{ text }}</h1>
    </div>
</template>

<script>
import lewy from '../src'

const client = lewy.init({
    baseURL: 'https://jsonplaceholder.typicode.com',
    timeout: 10000,

    paramSerializer (params) {
        return '221342'
    },

    beforeResponse (res) {
        console.log(res)
        return res.json().then(data => data)
    },

    beforeRequest (req) {
        console.log(req)
        return req
    },
})

export default {
    name: 'app',
    data () {
        return {
            text: 'hello'
        }
    },

    methods: {
        getDogs () {
            client.request({
                url: '/posts/1',
                method: 'get',
                params: {
                    lol: 'asdf'
                }
            }).then(body => body)
        }
    },

    created () {
        this.getDogs()
    }
}
</script>

<style scoped>
#app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    color: #2c3e50;
}
</style>