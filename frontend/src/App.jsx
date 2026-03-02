import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { MenuPage } from './pages/MenuPage'
import { OrdersPage } from './pages/OrdersPage'

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<MenuPage />} />
                <Route path="/orders" element={<OrdersPage />} />
            </Routes>
        </BrowserRouter>
    )
}

export default App
