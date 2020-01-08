<template>
    <div class="component1-wrap">
        <TestCom />
        <h4 class="h">{{title}}</h4>
        <img src="./some.jpg" />
        <div class="some-bg"></div>
    </div>
</template>

<script>
    import TestCom from 'components/VueComponent2';
    import request from 'src/public/methods/request';
    export default {
        data () {
            return {
                title: 'some'
            }
        },
        components: {
            TestCom,
        },
        methods: {
            onClick () {
                console.log('click');
            }
        }
    }
</script>
<style lang="scss">
    @import "src/public/css/dosome";
    .h {
        font-size: 20px;
    }
    .some-bg {
        background-image: url(./css-bg.jpg);
    }
</style>
