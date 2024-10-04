import Footer from './footer'
import Navbar from './navbar'

const Layout = ({ children }: { children: React.ReactNode }) => {
	return (
		<div className="min-h-[100dvh]">
			<Navbar />
			<main className="min-h-[90dvh] w-full flex justify-center items-center">
				{children}
			</main>
			<Footer />
		</div>
	)
}
export default Layout
