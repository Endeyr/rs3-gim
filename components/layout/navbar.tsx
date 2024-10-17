import Link from 'next/link'

const Navbar = () => {
	return (
		<nav className="min-h-[10dvh]">
			<ul>
				<li>
					<Link href={'/'}>Home</Link>
				</li>
			</ul>
		</nav>
	)
}
export default Navbar
