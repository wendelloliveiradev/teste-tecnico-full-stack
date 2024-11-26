export type Driver = {
    id: number,
    name: string,
    description: string,
    car: string,
    review: string,
    rate: string,
    min_km: number,
}

export const drivers: Driver[] = [
    {
        id: 1,
        name: "Homer Simpson",
        description: "Olá! Sou o Homer, seu motorista camarada! Relaxe e aproveite o passeio, com direito a rosquinhas e boas risadas (e talvez alguns desvios).",
        car: "Plymouth Valiant 1973 rosa e enferrujado",
        review: "2/5 Motorista simpático, mas errou o caminho 3 vezes. O carro cheira a donuts.",
        rate: "R$ 2,50/km",
        min_km: 1,
    },
    {
        id: 2,
        name: "Dominic Toretto",
        description: "Ei, aqui é o Dom. Pode entrar, vou te levar com segurança e rapidez ao seu destino. Só não mexa no rádio, a playlist é sagrada.",
        car: "Dodge Charger R/T 1970 modificado",
        review: "4/5 Que viagem incrível! O carro é um show à parte e o motorista, apesar de ter uma cara de poucos amigos, foi super gente boa. Recomendo!",
        rate: "R$ 5,00/km",
        min_km: 5,
    },
    {
        id: 3,
        name: "James Bond",
        description: "Boa noite, sou James Bond. À seu dispor para um passeio suave e discreto. Aperte o cinto e aproveite a viagem.",
        car: "Aston Martin DB5 clássico",
        review: "5/5 Serviço impecável! O motorista é a própria definição de classe e o carro é simplesmente magnífico. Uma experiência digna de um agente secreto.",
        rate: "R$ 10,00/km",
        min_km: 10,
    }
]