<template>
  <h1 v-html="templateOutput" v-show="!isNaN(output)"></h1>
</template>

<script lang="ts">
import { defineComponent, watchEffect, ref, computed, toRefs } from 'vue';
import formatOutput from '../lib/formatOutput';
import horner from '../lib/horner';

export default defineComponent({
  props: {
    st: {
      type: Number,
      required: true,
    },
    divider: {
      type: String,
      required: true,
    },
    wspList: {
      type: Array,
      required: true,
    },
  },
  setup(props) {
    const { st, divider, wspList } = toRefs(props);
    const output = ref(NaN);
    const outputList = ref([]);
    const templateOutput = ref('');
    watchEffect(() => {
      output.value = NaN;
      if (
        divider.value === '' ||
        divider.value === '0' ||
        st.value <= 0 ||
        isNaN(st.value)
      )
        return;
      output.value = horner({ wspList, outputList, st, divider });
      const numbers = wspList.value
        .map((ele, i) => formatOutput(wspList, ele, i))
        .join('');
      const div =
        Number(divider.value) >= 0
          ? `(x - ${Math.abs(Number(divider.value))})`
          : `(x + ${Math.abs(Number(divider.value))})`;
      const o = outputList.value
        .map((ele, i) => formatOutput(outputList, ele, i))
        .join('');
      const rest =
        output.value >= 0 ? `+ ${output.value}` : `- ${-output.value}`;
      templateOutput.value = `Wynik (${numbers}) / ${div} = (${o}) * ${div} ${rest}`;
    });
    return {
      templateOutput,
      output,
    };
  },
});
</script>
<style scoped>
h1 {
  font-size: 1.5rem;
  grid-column: span 2 / span 2;
}
</style>
