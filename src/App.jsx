import { Routes, Route } from "react-router-dom"
import QuestionForm from "./components/QuestionForm"
import ResultPage from "./components/ResultPage"
import ProjectInfo from "./components/ProjectInfo"
import NotFound from "./components/NotFound"

function App() {
  return (
    <Routes>
      <Route path="/" element={<QuestionForm />} />
      <Route path="/result" element={<ResultPage />} />
      <Route path="/contributors" element={<ProjectInfo />} />
       <Route path="/*" element={<NotFound />} />
    </Routes>
  )
}

export default App
