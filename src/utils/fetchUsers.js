export default async function fetchUsers() {
  // const urlApi1 = "https://jsonplaceholder.typicode.com/users";
  // const resp = await fetch(urlApi1);
  // return await resp.json();

  const urlApi2 = "https://reqres.in/api/users";
  const requests = [1, 2].map((page) => fetch(`${urlApi2}?page=${page}`));
  const response = await Promise.all(requests);
  const users = await Promise.all(response.map((r) => r.json()));
  return users.flatMap((u) => u.data);
}
