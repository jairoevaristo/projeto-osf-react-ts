import Pokemon from '../../types/Pokemon';
import styles from './styles.module.scss';

export function PokemonCard({ sprites, name }: Pokemon) {
  return (
    <div className={styles.container}>
      <img src={sprites.front_default} alt={name} />
      <strong>
        {name}
      </strong>
    </div>
  )
}