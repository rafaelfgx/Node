import application from "./application.js";
import MongoService from "./shared/mongo.service.js";

await MongoService.connect();
application.listen(3000, () => console.log("http://localhost:3000"));
