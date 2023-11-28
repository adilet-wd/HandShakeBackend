import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";

async function start () {
    const PORT = process.env.Port || 5000;
    const app = await NestFactory.create(AppModule);
    
    const config = new DocumentBuilder()
        .setTitle('HandShake')
        .setDescription('Документация REST API')
        .setVersion('1.0.0')
        .addTag('AdiletWD')
        .build()
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api/documentation', app, document);
    await app.listen(PORT, ()=>{
        console.log("Server started on port", PORT);
    })
};

start(); 