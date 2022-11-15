/* eslint-disable prettier/prettier */
import { AtualizaUsuarioDTO } from './dto/AtualizaUsuario.dto';
/* eslint-disable prettier/prettier */
import { ListaUsuarioDTO } from './dto/ListaUsuario.dto';
/* eslint-disable prettier/prettier */
import { UsuarioEntity } from './usuario.entity';
/* eslint-disable prettier/prettier */
import { UsuarioRepository } from './usuario.repository';
/* eslint-disable prettier/prettier */
import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { CriaUsuarioDTO } from './dto/CriaUsuario.dto';
import { v4 as uuid } from 'uuid';

@Controller('/usuarios')
export class UsuarioController {
  constructor(private usuarioRepository: UsuarioRepository) {}
  
  @Post()
  async criaUsuario(@Body() dadosDoUsuario: CriaUsuarioDTO) {
    const usuarioEntity = new UsuarioEntity();
    usuarioEntity.email = dadosDoUsuario.email;
    usuarioEntity.senha = dadosDoUsuario.senha;
    usuarioEntity.nome = dadosDoUsuario.nome;
    usuarioEntity.id = uuid();

    this.usuarioRepository.salvar(usuarioEntity);
    return { 
      usuario: new ListaUsuarioDTO(usuarioEntity.id, usuarioEntity.nome),
      messagem: 'usuáruio criado com sucesso!'
    }
  }

  @Get()
  async listUsuarios() {
    const usuariosSalvos = await this.usuarioRepository.listar();
    const usuariosLista = usuariosSalvos.map(
      usuario => new ListaUsuarioDTO(
        usuario.id,
        usuario.nome
      )
    );
    return usuariosLista;
  }

  @Put('/:id')
  async atualizaUsuario(@Param('id') id: string, @Body() NovosDados: AtualizaUsuarioDTO) {
    const usuarioAtualizado = await this.usuarioRepository.atualiza(id, NovosDados);

    return {
      usuario: usuarioAtualizado,
      messagem: 'usuário atualizado com sucesso!',
    }
  }

  @Delete('/:id')
  async removeUsuario(@Param('id') id: string) {
    const usuarioRemovido = await this.usuarioRepository.remove(id);

    return {
      usuario: usuarioRemovido,
      messagem: 'Usuário removido com sucesso!'
    }
  }
}