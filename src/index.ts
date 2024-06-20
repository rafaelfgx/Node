import application from "./application";
application.listen(process.env.port, () => console.log(`Running: http://localhost:${process.env.port}`));
