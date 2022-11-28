export async function getUser(argument) {
  let req = await fetch('http://localhost:4000/notes/?notesId=1');
  let res = await req.json();
  return res
}

