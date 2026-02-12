import application from "./application";
import MongoService from "./shared/mongo.service";

MongoService.connect();
application.listen(3000, () => console.log("http://localhost:3000"));
