import { useEffect, useState } from "react"


function App() {
  const [data, setData] = useState([])
  useEffect(() => {
    const Fetch = async function () {
      const res = await fetch("http://localhost:5000/books")
      const Json = await res.json()
      setData(Json)
    }
    Fetch()
  }, [])
  

  return (
    <>
      {data && data.map((item)=>(
        <ul>
          <li>{item.title}</li>
        </ul>
      ))}
    </>
  )
}

export default App
