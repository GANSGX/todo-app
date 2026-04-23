import { BrowserRouter, Routes, Route } from 'react-router-dom';
import TodosPage from './pages/TodosPage.tsx'
import NotFoundPage from './pages/NotFoundPage.tsx'
import {BrowseGallery} from "@mui/icons-material";

const App = () => {

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<TodosPage />} />
                <Route path='*' element={<NotFoundPage />} />
            </Routes>
        </BrowserRouter>
    )

}

export default App;