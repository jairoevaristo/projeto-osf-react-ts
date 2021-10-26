import ReactLoading from 'react-loading';
import styles from './styles.module.scss';

import usePokemons from '../../hooks/usePokemons';
import { PokemonCard } from '../../components/PokemonCard';

export function App() {
  const { loading, pokemons } = usePokemons();

  return (
    <div className={styles.container}>
      <h1>Bem-vindo</h1>
      {
        (!loading && pokemons)
          ? <div className={styles.wrapperPokemon}>
              {pokemons.map(pokemon => (
                <PokemonCard 
                  sprites={pokemon.sprites}
                  name={pokemon.name}
                  key={pokemon.name}
                />
              ))}
          </div>
            
          : <div className={styles.load}>
              <ReactLoading 
                type="spin" 
                color={"#000"} 
                height={'10%'} 
                width={'10%'}
              />
           </div> 
      }
    </div>
  )
}

