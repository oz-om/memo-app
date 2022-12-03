import axios from "axios";

export async function getNotes() {
  let req = await fetch('http://127.0.0.1:4011/getNotes');
  let res = await req.json();
  return res
}

