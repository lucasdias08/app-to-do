# app de controle para barbearia
APP para uso em uma barbearia. Devido aos apps das lojas de aplicativos serem "difíceis" para os usuários utilizarem, desenvolvi o APP para um amigo meu utilizá-lo em seu salão. É muito simples, sendo uma tela contendo uma lista dos nomes adicionados, e uma tela para adicionar mais nomes. Para remover, é mais simples ainda: apenas apertar no pequeno botão de "ok" situado no canto de cada nome. 

# Arquitetura da aplicação
APP criado com a biblioteca react-native, mais a biblioteca Expo. A aplicação persiste os dados localmente, sem uso da internet. Dito isto, o aplicativo também não usa o SGBD SQLite, mas sim uma API do react native chamado "Async Storage".
