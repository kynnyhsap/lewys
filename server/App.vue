<template>
    <div id="app">
        <form>
            <input type="text" class="title" v-model="form.title">
            <textarea class="body" v-model="form.body"></textarea>
            <button class="send" @click="postPost" type="button">Send Post</button>
        </form>
        <article class="post" 
            v-for="(post, i) in posts"
            :key="i">
            <h1>{{ post.title }}</h1>
            <p>{{ post.body }}</p>
        </article>
    </div>
</template>

<script>
import api from './api'

export default {
    name: 'app',
    data () {
        return {
            posts: [],
            form: {
                title: '',
                body: ''
            }
        }
    },

    methods: {
        getPosts () {
            api.request({
                url: '/posts',
                method: 'get'
            }).then(body => {
                console.log(body)
                this.posts = body.slice(0, 20)
            })
            .catch(err => console.error(err))

        },

        postPost () {
            const data = this.form

            api.request({
                url: '/posts',
                method: 'post',
                body: JSON.stringify(data)
            }).then(body => {
                console.log(body)
            })
            .catch(err => console.error(err))

        }
    },

    created () {
        this.getPosts()
    }
}
</script>

<style scoped>
#app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    color: #2c3e50;
    background-color: rgb(248, 172, 127);
    background-image: linear-gradient(90deg, #FBAB7E 0%, #F7CE68 100%);


}

.post {
    background-color: #08AEEA;
    background-image: linear-gradient(45deg, #08AEEA 0%, #2AF598 100%);
    border: 4px solid white;
    border-radius: 10px;
    padding: 20px;
    margin: 25px;
    max-width: 500px;
    color: white
}

.post h1 {
    color: white;
    font-weight: bold;
    text-align: center
}
</style>