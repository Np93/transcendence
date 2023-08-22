import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeormconfig } from './config/typeorm.config';
//import { CorsModule } from '@nestjs/cors'
import { MulterModule } from '@nestjs/platform-express';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { AuthenticationModule } from './authentication/authentication.module';

@Module({
  imports: [
    UserModule,
    TypeOrmModule.forRoot(typeormconfig),
    AuthenticationModule,
    // CorsModule.forRoot({ origin: '*' })
    // MulterModule.register({dest: './files'}),
    //  ServeStaticModule.forRoot({rootPath: join(__dirname, '..', 'files')})
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
