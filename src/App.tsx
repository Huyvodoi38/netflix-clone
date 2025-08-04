import AppRoute from "./routes/routers"
import Header from "./components/Header"
import Footer from "./components/Footer"
import { DarkModeProvider } from "./context/DarkModeContext"

function App() {

  return (
    <DarkModeProvider>
      <div>
        <Header />
        <AppRoute />
        <Footer />
      </div>
    </DarkModeProvider>
  )
}

export default App
