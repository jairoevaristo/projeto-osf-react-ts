export default [{
    active: true,
    url: "https://pokeapi.co/api/v2/pokemon",
    method: "get",
    data: {
        results: [
            {
                name: "bulbasaur",
                url: "https://pokeapi.co/api/v2/pokemon/2/"
            },
            {
              name: "pikachu",
              url: "https://pokeapi.co/api/v2/pokemon/3/"
          }
        ]
    },
    status: 400
}]