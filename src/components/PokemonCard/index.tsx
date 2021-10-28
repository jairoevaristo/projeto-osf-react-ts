import Pokemon from '../../types/Pokemon';
import styles from './styles.module.scss';

export function PokemonCard({ avatarUrl, nome }: Pokemon) {
  return (
    <div className={styles.container}>
      <img src={avatarUrl} alt={nome} />
      <strong>
        {nome}
      </strong>
    </div>
  )
}