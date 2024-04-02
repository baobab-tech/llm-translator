import fs from "fs";
// read the local dir
const files = await fs.promises.readdir("./");
console.log("texs", files);
