# Aplicação de Carona Compartilhada

Este projeto é uma aplicação simples de carona compartilhada construída com **Node.js**, **TypeScript**, **React.js** e **SQLite**. Ele consiste em uma **API backend** para estimar preços de viagens, confirmar caronas e visualizar o histórico de viagens, junto com um **frontend** para o usuário interagir com o sistema.

## Índice

- [Visão Geral](#visão-geral)
- [Funcionalidades](#funcionalidades)
- [Tecnologias Utilizadas](#tecnologias-utilizadas)
- [Como Começar](#como-começar)
  - [Pré-requisitos](#pré-requisitos)
  - [Instalação](#instalação)
  - [Executando a Aplicação](#executando-a-aplicação)
- [Endpoints](#endpoints)
- [Configuração do Docker](#configuração-do-docker)
- [Testes](#testes)
- [Licença](#licença)

## Visão Geral

Este projeto simula um sistema simples de carona compartilhada onde os usuários podem solicitar caronas de um conjunto de motoristas, estimar o custo da viagem e visualizar o histórico de viagens. A API backend é construída com **Node.js** e **TypeScript**, e o frontend é desenvolvido com **React.js** usando **Vite**.

- **Backend**: Expõe APIs para estimar viagens, confirmá-las e recuperar o histórico de viagens.
- **Frontend**: Permite que os usuários insiram informações sobre a viagem, visualizem motoristas disponíveis e vejam o histórico das suas viagens.

## Funcionalidades

- **Estimar Carona**: Usuários podem solicitar uma carona informando um ponto de partida e destino, e receber estimativas de custo, distância e motoristas disponíveis.
- **Confirmar Carona**: Usuários podem escolher um motorista e confirmar sua carona, armazenando a informação no banco de dados.
- **Histórico de Viagens**: Usuários podem visualizar o histórico de suas viagens, filtrado por ID do motorista.

## Tecnologias Utilizadas

- **Backend**:
  - Node.js (v22.11.0)
  - TypeScript
  - SQLite (para armazenar os dados de viagem)
  - Servidor HTTP simples (usando o módulo `http`)
  - SQLite3
- **Frontend**:
  - React.js
  - ShadcnUI
  - Zod
  - react-hook-form
  - Vite (para desenvolvimento rápido e bundling)
  - Tailwind CSS (para estilização)
- **Docker**:
  - Docker Compose para orquestração dos containers
  - Builds multi-stage para otimizar o tamanho dos containers

## Como Começar

### Pré-requisitos

Antes de rodar esta aplicação, garanta que você tenha as seguintes ferramentas instaladas:

- **Docker**: Para rodar a aplicação em containers.
- **Node.js**: Para desenvolvimento local e build.
- **Google Maps API Key**: Para integrar a API do Google Maps nas estimativas de viagem.

### Instalação

Clone o repositório:

```bash
git clone https://github.com/seu-usuario/ride-hailing-app.git
cd ride-hailing-app
```
