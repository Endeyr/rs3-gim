import Container from '@/components/layout/container'
import { ContentCard } from '../contentCard'

const Services = () => {
	return (
		<Container className="bg-gray-100 dark:bg-gray-900 flex flex-col w-full justify-evenly items-center">
			<h2 className="font-bold outline-black capitalize text-4xl text-center w-full">
				Services
			</h2>
			<div className="flex flex-col xl:flex-row w-full justify-center items-center gap-4">
				<ContentCard title="Card 1">
					Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quod,
					sapiente. Nihil pariatur beatae iusto quasi ratione illum suscipit nam
					perferendis, eligendi iure atque facilis sapiente iste aut, repellat
					id animi!
				</ContentCard>
				<ContentCard title="Card 2">
					Lorem ipsum dolor sit amet, consectetur adipisicing elit. Doloremque
					eligendi veniam voluptate quibusdam asperiores possimus aliquid
					consequatur illo ipsum. Natus repellat animi modi doloribus autem
					similique enim commodi quam ratione.
				</ContentCard>
				<ContentCard title="Card 3">
					Lorem ipsum, dolor sit amet consectetur adipisicing elit.
					Consequuntur, doloremque. Corrupti eveniet quidem atque odio minima
					expedita distinctio adipisci veniam aperiam natus recusandae, ipsum
					vero alias perferendis dicta hic. Animi.
				</ContentCard>
			</div>
		</Container>
	)
}
export default Services
