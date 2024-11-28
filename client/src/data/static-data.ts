import { AvailableRideDriver } from "@/lib/definitions";

// Dados estáticos para simular os motoristas disponíveis.
// Apenas para fins de desenvolvimento e testes.
// Continuo usando o path para imagem de perfil dos motoristas.
export const drivers: AvailableRideDriver[] = [
    {
        id: 1,
        name: "Homer Simpson",
        description: "Olá! Sou o Homer, seu motorista camarada! Relaxe e aproveite o passeio, com direito a rosquinhas e boas risadas (e talvez alguns desvios).",
        rating: "2/5",
        review: "Motorista simpático, mas errou o caminho 3 vezes. O carro cheira a donuts.",
        pic_src: "/pics/homer-profile-pic.svg",
        car: "Plymouth Valiant 1973 rosa e enferrujado",
        value: 50.00,
    },
    {
        id: 2,
        name: "Dominic Toretto",
        description: "Ei, aqui é o Dom. Pode entrar, vou te levar com segurança e rapidez ao seu destino. Só não mexa no rádio, a playlist é sagrada.",
        rating: "4/5",
        review: "Que viagem incrível! O carro é um show à parte e o motorista, apesar de ter uma cara de poucos amigos, foi super gente boa. Recomendo!",
        pic_src: "/pics/dominic-profile-pic.jpeg",
        car: "Dodge Charger R/T 1970 modificado",
        value: 100.00,
    },
    {
        id: 3,
        name: "James Bond",
        description: "Boa noite, sou James Bond. À seu dispor para um passeio suave e discreto. Aperte o cinto e aproveite a viagem.",
        rating: "5/5",
        review: "Serviço impecável! O motorista é a própria definição de classe e o carro é simplesmente magnífico. Uma experiência digna de um agente secreto.",
        pic_src: "/pics/james-profile-pic.jpg",
        car: "Aston Martin DB5 clássico",
        value: 200.00,
    }
]