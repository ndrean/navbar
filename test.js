const store = [
  { a: 1, b: true },
  { a: 2, b: false },
];
const result = [
  { a: 2, b: true },
  { a: 3, b: false },
];
const keysOfAs = Array.from(store, ({ a }) => a); // array of keys values
const results = [...store];
for (const obj of result) {
  if (!keysOfAs.includes(obj.a)) results.push(obj);
}
console.log(store);
console.log(results);
