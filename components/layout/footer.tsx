import Link from 'next/link'

const Footer = () => {
	return (
		<footer className="dark:bg-black dark:text-white bg-white text-gray-800 w-full sm:grid sm:grid-cols-4 sm:justify-between sm:items-center gap-3 p-[50px] hidden">
			<div className="flex flex-col justify-start items-start gap-2 w-full h-full">
				<h2 className="font-bold capitalize text-xl">Title</h2>
				<p className="w-1/2">
					Lorem ipsum dolor sit amet consectetur adipisicing elit.
				</p>
			</div>

			<div className="flex flex-col justify-start items-start gap-2 w-full h-full">
				<h2 className="font-bold capitalize text-xl">Browse</h2>
				<ul className="flex flex-col" role="list">
					<li>
						<Link
							href="/"
							className="w-full text-gray-800 hover:text-[#4078c8] dark:hover:text-[#4078c8] dark:text-white"
						>
							Home
						</Link>
					</li>
					<li>
						<Link
							href="/services"
							className="w-full text-gray-800 hover:text-[#4078c8] dark:hover:text-[#4078c8] dark:text-white"
						>
							Services
						</Link>
					</li>
					<li>
						<Link
							href="/about"
							className="w-full text-gray-800 hover:text-[#4078c8] dark:hover:text-[#4078c8] dark:text-white"
						>
							About
						</Link>
					</li>
					<li>
						<Link
							href="/contact"
							className="w-full text-gray-800 hover:text-[#4078c8] dark:hover:text-[#4078c8] dark:text-white"
						>
							Contact
						</Link>
					</li>
					<li>
						<Link
							href="/dashboard"
							className="w-full text-gray-800 hover:text-[#4078c8] dark:hover:text-[#4078c8] dark:text-white"
						>
							Dashboard
						</Link>
					</li>
				</ul>
			</div>
			<div className="flex flex-col justify-start items-start gap-2 w-full h-full">
				<h2 className="font-bold capitalize text-xl">Services</h2>
				<ul className="flex flex-col" role="list">
					<li>Service 1</li>
					<li>Service 2</li>
					<li>Service 3</li>
					<li>Service 4</li>
				</ul>
			</div>
			<div className="flex flex-col justify-start items-start gap-2 w-full h-full">
				<h2 className="font-bold capitalize text-xl ">Contact</h2>
				<ul className="flex flex-col" role="list">
					<li className="flex gap-2 justify-start items-center">
						<span>Location</span>
					</li>
					<li className="flex gap-2 justify-start items-center">
						<span>Email</span>
					</li>
					<li className="flex gap-2 justify-start items-center">
						<span>555-555-5555</span>
					</li>
				</ul>
			</div>
		</footer>
	)
}
export default Footer
