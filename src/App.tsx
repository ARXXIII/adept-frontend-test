import { Header } from "./components/header"
import { CompanyTable } from "./components/company-table"

function App() {
    return (
        <main className="bg-neutral-950 min-h-screen">
            <Header />
            <CompanyTable />
        </main>
    )
}

export default App
