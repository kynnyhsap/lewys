<template>
    <div id="app">
        <input type="text" v-model="text">
        <h1>{{ text }}</h1>
    </div>
</template>

<script>
export default {
    name: 'app',
    data () {
        return {
            text: 'hello'
        }
    }
}
</script>

<style scoped>
#app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    color: #2c3e50;
}
</style>