import Container from '@/components/layout/container'
import { Button } from '@/components/ui/button'

const CallToAction = () => {
	return (
		<Container className="bg-white dark:bg-black flex-col">
			<h2 className="font-bold outline-black capitalize text-4xl text-center w-full">
				Title - Call to Action
			</h2>
			<p>
				Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dolorem
				tenetur veniam blanditiis repudiandae nulla aperiam rem dignissimos
				atque laudantium a dicta autem fugit, amet reiciendis cum adipisci nemo
				placeat modi.
			</p>
			<Button>Click Me</Button>
		</Container>
	)
}
export default CallToAction
