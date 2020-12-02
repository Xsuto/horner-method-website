<template>
    <label>Liczba przy X do potęgi {{wsp.st}}</label>
    <input :value="val" @input="(e) => handelChange(e.target.value, index)"/>
</template>

<script lang="ts">
import {defineComponent} from 'vue'
export default defineComponent({
    props: {
        wsp: Object,
        index: Number
    },
    computed: {
        val(){
            return this.wsp.value
        }
    },
    methods: {
        handelChange(value,i){
            this.$emit("input",{value,i})
        }
    }
})
</script>