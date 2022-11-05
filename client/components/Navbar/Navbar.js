import Link from 'next/link';
import styles from '../../styles/Navbar.module.css';

const Navbar = ({ currentUser }) => {
  const links = [
    !currentUser && {
      label: 'Sign up',
      href: '/auth/signup',
    },
    !currentUser && {
      label: 'Sign in',
      href: '/auth/signin',
    },
    currentUser && {
      label: 'Sign out',
      href: '/auth/signout',
    },
  ];

  return (
    <nav className={styles['navbar-main']}>
      <Link href={'/'}>GitTix</Link>
      <ul style={{}}>
        {links.map(link => {
          if (!link) return;
          return (
            <Link
              key={link.href}
              href={link.href}
              style={{ backgroundColor: 'red', margin: '0 8px' }}
            >
              {link.label}
            </Link>
          );
        })}
      </ul>
    </nav>
  );
};

export default Navbar;
