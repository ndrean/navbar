export default async function fetchUsers() {
  const resp = await fetch("https://jsonplaceholder.typicode.com/users");
  return await resp.json();
}
