const horner = ({wspList,outputList,st,divider}) => {
    let o = wspList.value[0].value
    outputList.value = []
    for (let i = 1; i <= st.value; i++){
      outputList.value.push({st: wspList.value[i].st, value: o})
      o = o * Number(divider.value) + wspList.value[i].value
    }
    return o
        
  }

export default horner