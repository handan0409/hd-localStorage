
import Frequency from "../index.js";

let frequency = new Frequency({
  day: 2,
  frequency: 1
})

// console.log(frequency.set("zhangsan","qwe",{day: 2, frequency: 4}))
console.log(frequency.get("zhangsan"))