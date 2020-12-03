<template>
    <label>Liczba przy X do potęgi {{wsp.st}}</label>
    <input :value="wsp.value" @input="(e) => handleInput(e.target.value, index)"/>
</template>

<script lang="ts">
import {defineComponent} from 'vue'
export default defineComponent({
    props: {
        wsp: Object,
        index: Number
    },
    setup(_, {emit}){
        const handleInput = (value,i) => {
            emit("input",{value,i})
        }
        return {
            handleInput
        }
    }
})
</script>