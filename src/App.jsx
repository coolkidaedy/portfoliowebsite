import { BrowserRouter, Routes, Route } from "react-router-dom"
import { Home } from "./pages/home"
import { BucketList } from "./pages/BucketList"
import { NotFound } from "./pages/NotFound"

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route index element={<Home />} />
          <Route path="/bucket-list" element={<BucketList />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
