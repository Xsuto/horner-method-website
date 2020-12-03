<template>
  <label>Liczba przy X do potęgi {{ wsp.st }}</label>
  <input
    :value="wsp.value"
    @input="(e) => handleInput(e.target.value)"
  />
</template>

<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({
  props: {
    wsp: {
      type: Object,
      required: true,
    },
    index: {
      type: Number,
      required: true,
    },
  },
  emits: ['input'],
  setup(_, { emit }) {
    const handleInput = (value) => {
      emit('input', value);
    };
    return {
      handleInput,
    };
  },

});
</script>
