import css from './SidebarNotes.module.css';
import Link from 'next/link';

const tags = ['All', 'Todo', 'Work', 'Personal', 'Meeting', 'Shopping'];

export default function SidebarNotes() {
  return (
    <ul className={css.menuList}>
      {tags.map(tag => {
        const href =
          tag === 'All' ? '/notes/filter/all' : `/notes/filter/${tag}`;

        return (
          <li key={tag} className={css.menuItem}>
            <Link href={href} className={css.menuLink}>
              {tag === 'All' ? 'All notes' : tag}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
