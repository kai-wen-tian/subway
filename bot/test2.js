
import dotenv from "dotenv";
function readJson(){
  dotenv.config();
  const jsonString = JSON.parse(process.env.node);
  //console.log(jsonString);
  console.log(jsonString[0]["RPC_URL"]);
}
readJson();

