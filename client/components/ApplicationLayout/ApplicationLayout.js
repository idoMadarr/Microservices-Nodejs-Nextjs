import styles from '../../styles/Layout.module.css';

const ApplicationLayout = ({ children }) => {
  return (
    <div className={styles.container}>
      <main className={styles.main}>{children}</main>
    </div>
  );
};

export default ApplicationLayout;
