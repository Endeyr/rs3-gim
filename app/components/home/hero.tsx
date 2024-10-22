import Container from '@/components/layout/container'
import { Button } from '@/components/ui/button'

const Hero = () => {
	// TODO add background image, replace bg-gray-600 w/ bg-no-repeat bg-cover bg-center, add style={{ backgroundImage: 'url(' + heroBg.src + ')' }}
	return (
		<Container
			className="dark:bg-gray-600 bg-gray-400 dark:text-white flex flex-col xl:justify-start xl:items-start items-center"
			id="hero-section"
		>
			<div className="xl:w-1/2 w-full h-full flex flex-col justify-between gap-4 items-start">
				<h2 className="font-bold outline-black capitalize text-4xl text-center w-full my-4">
					Title - Hero
				</h2>
				<p>
					Lorem ipsum dolor sit amet, consectetur adipisicing elit. Natus qui
					nisi saepe? Rem beatae aut illum a nulla laborum hic recusandae
					corporis. Voluptatum odio debitis quia perferendis, natus dolores
					delectus?
				</p>
				<p>
					Lorem ipsum dolor sit amet, consectetur adipisicing elit. Natus qui
					nisi saepe? Rem beatae aut illum a nulla laborum hic recusandae
					corporis. Voluptatum odio debitis quia perferendis, natus dolores
					delectus?
				</p>
				<p>
					Lorem ipsum dolor sit amet, consectetur adipisicing elit. Natus qui
					nisi saepe? Rem beatae aut illum a nulla laborum hic recusandae
					corporis. Voluptatum odio debitis quia perferendis, natus dolores
					delectus?
				</p>
				<Button>Do Something</Button>
			</div>
		</Container>
	)
}
export default Hero
