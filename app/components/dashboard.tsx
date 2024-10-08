import SearchBar from './searchBar'
import XpTable from './xpTable'

const Dashboard = () => {
	return (
		<>
			<SearchBar />
			<div className="w-[35dvw]">
				<XpTable />
			</div>
		</>
	)
}

export default Dashboard
