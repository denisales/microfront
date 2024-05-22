import styles from './styles.module.css'

export type ButtonProps = {
  label: string;
};

const Button = ({ label }: ButtonProps) => {
  return <button className={styles.button}>
    Ola mundo {label}</button>
};

export { Button };
