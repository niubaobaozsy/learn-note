<template>
<mt-button @click.native="test">shfjshdf</mt-button>
</template>

<script>
import {Toast} from 'mint-ui'
export default {
  name: 'App',
    methods:{
        test(){
            Toast('四大佛山警方');
        }
    }

}
</script>

<style>

</style>
