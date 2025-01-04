import { Body, Controller, Get, HttpCode, HttpException, HttpStatus, ParseFilePipeBuilder, Post, Req, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ValidationPipe } from 'src/filters/validation.pipe';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { AuthGuard } from './auth.guard';

export interface SignInDto {
  email: string;
  password: string;
}

@Controller('auth')
export class AuthController {
  //eslint-disable-next-line
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  signIn(@Body(new ValidationPipe()) signInDto: SignInDto) {
    //console.log('Inicia el login de: ', signInDto);
    return this.authService.login(signInDto);
  }

  @UseInterceptors(FileInterceptor('file'))
  @Post('register')
  signUp(
    @Body(new ValidationPipe()) signUpDto: CreateUserDto,
    @UploadedFile(
      new ParseFilePipeBuilder()
        .addFileTypeValidator({
          fileType: /\/(jpg|jpeg|png)$/,
        })
        .build({
          exceptionFactory: (errors) =>
            new HttpException(errors, HttpStatus.BAD_REQUEST),
          fileIsRequired: false, // this means that the file is optional
        }),
    )
    file?: Express.Multer.File,
  ) {
    //console.log('Inicia el registro de: ', signUpDto)
    return this.authService.register(signUpDto, file);
  }

  @UseGuards(AuthGuard)
  @Get('validateToken')
  validateToken(@Req() req: any) {
    //console.log('Inicia la validación del token...');
    if(req.user) {
      console.log('Token is valid');
      return { message: "Token is valid", isValid: true }
    }else {
      console.log('Token is invalid');
      return { message: "Token is invalid", error: true }
    }
  }

  
}
