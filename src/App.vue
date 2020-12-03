<template>
  <div>
    <Output  utput :st="st" :divider="divider" :wspList="wspList"/>
    <label>Wspołczynik</label>
    <input v-model="st">
    <label>X do podzielenia</label>
    <input v-model="divider">
    <WspItem v-for="(wsp,i) in wspList" :key="i" :wsp="wsp" :index="i" @input="({value,i}) => handleInput({value,i})"/>
  </div>

</template>

<script lang="ts">
import { defineComponent,ref,computed,watchEffect } from "vue";
import WspItem from "./components/wspItem.vue";
import Output from "./components/Output.vue"

export default defineComponent({
  components: { WspItem,Output },
  setup(){
    const st = ref(1)
    const divider = ref("0")
    const wspList = ref([])
    
    watchEffect(() => {
      const tempList = []
      if (st.value > 30) st.value = 30
      for (let i = 0; i <= st.value; i++){
        tempList.push({
          st: st.value - i,
          value: 0
        })
      }
      wspList.value = tempList
    })
    
    const handleInput = ({value,i}) => {
      if(isNaN(value) || value === "") return
      wspList.value[i] = {...wspList.value[i],value: parseFloat(value)}
    }

    return {
      st,
      divider,
      wspList,
      handleInput,
    }
  }
})
</script>
<style>
body {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh
}
div {
  width: 80vw;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
}
input {
  max-width: 300px
}
</style>
