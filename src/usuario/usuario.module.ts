/* eslint-disable prettier/prettier */
import { EmailEhUnicoValidator } from './validacao/email-eh-unico.validator';
/* eslint-disable prettier/prettier */
import { Module } from "@nestjs/common";
import { UsuarioController } from "./usuario.controller";
import { UsuarioRepository } from "./usuario.repository";

@Module({
  controllers: [UsuarioController],
  providers: [UsuarioRepository, EmailEhUnicoValidator]
})
export class UsuarioModule {}