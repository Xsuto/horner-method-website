<template>
  <form>
    <h1 v-if="!isNaN(output)">Wynik {{templateOutput}}</h1>
    <label>Wspołczynik</label>
    <input v-model="st">
    <label>X do podzielenia</label>
    <input v-model="divider">
     <wsp-item v-for="(wsp,i) in wspList" :key="i" :wsp="wsp" :index="i" @input="({value,i}) => handelChange({value,i})"/>
  </form>

</template>

<script lang="ts">
import { defineComponent,ref,computed,watchEffect } from "vue";
import wspItem from "./components/wspItem.vue";

export default defineComponent({
  components: { wspItem },
  setup(){
    const st = ref(1)
    const divider = ref("0")
    const output = ref(NaN)
    const templateOutput = ref("")
    const wspList = ref([])
    const outputList = ref([])
    watchEffect(() => {
      const tempList = []
      for (let i = 0; i <= st.value; i++){
        tempList.push({
          st: st.value - i,
          value: 0
        })
      }
      wspList.value = tempList
    })
    const horner = () => {
      let o = wspList.value[0].value
      outputList.value = []
      console.log('run');
      
      for (let i = 1; i <= st.value; i++){
        outputList.value.push({st: wspList.value[i].st, value: o})
        o = o * Number(divider.value) + wspList.value[i].value
        console.log(o);
        
        
      }
      return o
          
    }
    const handelChange = ({value,i}) => {
      if(isNaN(value) || value === "") return
      wspList.value = wspList.value.map((ele,idx) => {
        if(idx == i) return {...ele,value: parseFloat(value)}
        return ele
      })
      
    }
    watchEffect(() => {
      output.value = NaN
      if(divider.value === "" || divider.value === "0") return
      output.value = horner()

      const numbers = wspList.value.map((ele,i) => {
          if(i == wspList.value.length - 1 && ele.value < 0) return ` - ${-ele.value}`
          if(i == wspList.value.length - 1 && ele.value >= 0) return ` + ${ele.value}`
          if (ele.value < 0) return ` - ${-ele.value}x^${ele.st} `
          if(i == 0) return `${ele.value}x^${ele.st} `

          return ` + ${ele.value}x^${ele.st} `
        }).join('')
      const div = Number(divider.value) >= 0 ? `(x - ${Math.abs(Number(divider.value))})` : `(x + ${Math.abs(Number(divider.value))})`
      const o = outputList.value.map((ele,i) => {
        if(i == wspList.value.length - 1 && ele.value < 0) return ` - ${-ele.value}`
          if(i == wspList.value.length - 1 && ele.value >= 0) return ` + ${ele.value}`
          if (ele.value < 0) return ` - ${-ele.value}x^${ele.st} `
          if(i == 0) return `${ele.value}x^${ele.st} `

          return ` + ${ele.value}x^${ele.st} `
      })
      const rest = output.value >= 0 ? `+ ${output.value}` : `- ${-output.value}`
      templateOutput.value = `(${numbers}) / ${div} = (${o}) ${rest}`
    })

    return {
      st,
      output,
      outputList,
      divider,
      wspList,
      templateOutput,
      handelChange,
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
form {
  width: 80vw;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
}
input {
  max-width: 300px
}
h1 {
  font-size: 1.5rem;
  	grid-column: span 2 / span 2;
}

</style>
