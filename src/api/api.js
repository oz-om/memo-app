export async function getUser(argument) {
  let req = await fetch('http://localhost:4011');
  let res = await req.json();
  return res
}

