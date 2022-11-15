/* eslint-disable prettier/prettier */
import { IsEmail, IsNotEmpty, MinLength } from "class-validator";
import { EmailEhUnico } from "../validacao/email-eh-unico.validator";

/* eslint-disable prettier/prettier */
export class CriaUsuarioDTO {

  @IsNotEmpty({message: 'O nome não pode ser vazio!'})
  nome: string;

  @IsEmail(undefined, { message: 'O e-mail informado é inválido' })
  @EmailEhUnico({ message: 'Já existe um usuário com este e-mail' })
  email: string;

  @MinLength(6, {message: 'a senha precisa ter pelo menos 6 caracteres!'})
  senha: string;
}