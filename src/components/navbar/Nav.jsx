import Link from 'next/link'
import { NavLinks } from './navData'
function Nav() {
  return (
    <nav>
    <ul className='flex gap-6'>
      {Array.isArray(NavLinks)
        ? NavLinks.map((data) => (
            <li key={data.id}>
              <Link href={data.link} legacyBehavior>
                <a>{data.name}</a>
              </Link>
            </li>
          ))
        : ""}
    </ul>
  </nav>
  )
}

export default Nav