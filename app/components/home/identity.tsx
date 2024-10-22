import Container from '@/components/layout/container'

const Identity = () => {
	return (
		<Container className="bg-white dark:bg-black flex-col justify-center gap-2">
			<div className="grid grid-col-3 w-full items-center justify-center">
				<div>Image Here</div>
				<div className="col-span-2 col-start-2 flex flex-col justify-start items-center gap-2">
					<h2 className="font-bold capitalize text-lg text-center w-full my-2">
						Title - Identity
					</h2>
					<p className="px-4">
						Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eos maxime
						eveniet voluptatem eius neque officiis, suscipit odio minus amet
						harum a, ipsa ad voluptatum! Neque veritatis rerum ea saepe error.
					</p>
					<p className="px-4">
						Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam
						cupiditate velit atque tempore veritatis libero maiores assumenda
						excepturi? Odio earum doloribus ipsum eos corporis numquam culpa
						commodi maxime tempore similique.
					</p>
					<p className="px-4">
						Lorem ipsum dolor sit amet consectetur, adipisicing elit. Saepe
						consequatur odio vel rerum. Reiciendis perferendis necessitatibus
						sit autem distinctio? Magnam nesciunt illo quis nemo explicabo?
						Veritatis quidem corrupti porro eius.
					</p>
				</div>
			</div>
		</Container>
	)
}
export default Identity
