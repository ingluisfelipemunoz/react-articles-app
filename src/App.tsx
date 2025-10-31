import './App.css'
import Page from './shared/ui/Page'

function App() {
  return (
    <Page>
      <h1 className="text-2xl font-bold mb-4">App Articulos</h1>
      <p className="mb-2">
        App Working...
      </p>
      <div className="p-4 rounded-xl border bg-white shadow-sm">
        <span className="inline-block rounded bg-blue-600 text-white px-3 py-1">ArticlesBadge</span>
      </div>
    </Page>
  )
}

export default App
