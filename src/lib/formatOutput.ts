const formatOutput = (list, ele, i) => {
  if (i == list.value.length - 1 && ele.value < 0) return ` - ${-ele.value}`;
  if (i == list.value.length - 1 && ele.value >= 0) return ` + ${ele.value}`;
  if (ele.value < 0) return ` - ${-ele.value}x<sup>${ele.st}</sup> `;
  if (i == 0) return `${ele.value}x<sup>${ele.st}</sup> `;

  return ` + ${ele.value}x<sup>${ele.st}</sup> `;
};
export default formatOutput;
