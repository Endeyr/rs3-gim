import Link from 'next/link'

const Navbar = () => {
	return (
		<nav className="min-h-[10dvh]">
			<ul className="flex gap-2">
				<li>
					<Link href={'/'}>Home</Link>
				</li>
				<li>
					<Link href={'/dashboard'}>Dashboard</Link>
				</li>
			</ul>
		</nav>
	)
}
export default Navbar
