import Search from './body/Search'
import Bar from './body/Bar'
import Notes from './body/Notes'

export default function Body () {
  return (
    <main className="container">
      <Search />
      <Bar />
      <Notes />
    </main>
  )
}