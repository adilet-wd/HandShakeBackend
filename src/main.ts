import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { ValidationPipe } from "./pipes/validation.pipe";

async function start () {
    const PORT = process.env.Port || 5000;
    const app = await NestFactory.create(AppModule);
    
    // Отключение CORPS
    app.enableCors();
    // Конфигурация для SWAGGER
    const config = new DocumentBuilder()
        .setTitle('HandShake')
        .setDescription('Документация REST API')
        .setVersion('1.0.0')
        .addTag('AdiletWD')
        .build()
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api/documentation', app, document);

    // Глоальный пайп валидации(вывод ошибок при валидации)
    app.useGlobalPipes(new ValidationPipe())

    // Запуск проекта
    await app.listen(PORT, ()=>{
        console.log("Server started on port", PORT);
    })
};

start(); 