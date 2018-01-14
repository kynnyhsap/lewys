<template>
    <div id="app">
        <input type="text" v-model="text">
        <h1>{{ text }}</h1>
    </div>
</template>

<script>
import lewy from '../src'

const client = lewy.init({
    baseURL: 'https://dog.ceo',
    timeout: 1000,

    paramSerializer (params) {
        console.log(params)
        return params
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
                url: '/api/breeds/list/all',
                method: 'get',
                params: {
                    lol: ['kek', 'cheburek'],
                    azaza: {
                        some: {
                            some: 'some'
                        }
                    }
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