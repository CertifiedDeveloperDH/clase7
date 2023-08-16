import { useState, useEffect} from "react";
import "./styles.css";

function App() {
  const [alumnos, setAlumnos] = useState([])    
  const [notas, setNotas] = useState([])
  const [opcion, setOpcion] = useState("")
  const [valor, setValor] = useState(0)
  const [alumnosDatos, setAlumnosDatos] = useState(0)
  const [alumnosBack, setAlumnosBack] = useState(0)
  const [alumnosFront, setAlumnosFront] = useState(0)
  const [notasDatos, setNotasDatos] = useState(0)
  const [notasBack, setNotasBack] = useState(0)
  const [notasFront, setNotasFront] = useState(0)
  const [isDisabled, setIsDisabled] = useState(false)
  useEffect(() => {
    if (opcion === "database"){
      console.log(opcion)
      sumarDatos(alumnos, notas)
    } else if (opcion === "backend"){
      sumarBack(alumnos, notas)
    } else if (opcion === "frontend"){
      sumarFront(alumnos, notas)
    }
}, [alumnos]);

const validarCurso = (curso) => {
  if (curso === "backend" || curso === "frontend" || curso === "database"){
    return true
  }
  return false
}
const validarNota = (nota) => {
  if (isNaN(Number(nota)) || nota === ""){
    return false
  }
  return true
}
  function sumarDatos(alumnos, notas){
    let resultadoAlumnos = 0
    let resultadoNotas = 0
    let promedio = 0
    alumnos.forEach((alumno, index) => {
      if (alumno === "database"){
        resultadoAlumnos++
        resultadoNotas = resultadoNotas + Number(notas[index])
      }
    })
    setAlumnosDatos(resultadoAlumnos)
    promedio = resultadoNotas / resultadoAlumnos
    setNotasDatos(promedio)
  }
  function sumarBack(alumnos, notas){
    let resultadoAlumnos = 0
    let resultadoNotas = 0
    let promedio = 0
    alumnos.forEach((alumno, index) => {
      if (alumno === "backend"){
        resultadoAlumnos++
        resultadoNotas = resultadoNotas + Number(notas[index])
      }
    })
    setAlumnosBack(resultadoAlumnos)
    promedio = resultadoNotas / resultadoAlumnos
    setNotasBack(promedio)
  }
  function sumarFront(alumnos, notas){
    let resultadoAlumnos = 0
    let resultadoNotas = 0
    let promedio = 0
    alumnos.forEach((alumno, index) => {
      if (alumno === "frontend"){
        resultadoAlumnos++
        resultadoNotas = resultadoNotas + Number(notas[index])
      }
    })
    setAlumnosFront(resultadoAlumnos)
    promedio = resultadoNotas / resultadoAlumnos
    setNotasFront(promedio)
  }
  function handleSubmit(event) {
      event.preventDefault()
      if (!validarNota(valor)){
        alert("La nota debe ser un número y no debe estar vacío")
      } else if (!validarCurso(opcion)){
        setIsDisabled(true)
        alert("Curso no valido")
      } 
      else {
        setAlumnos(alumnosAnteriores => ([...alumnosAnteriores, opcion]))
        setNotas(notasAnteriores => ([...notasAnteriores, valor]))
      }
  }
  return (
    <div className="container">
      <h1>Média de Alunos por Disciplina</h1>
      <form className="form" onSubmit={(e)=> handleSubmit(e)}>
        <div className="container_input">
          <select value = {opcion} onChange = {e => setOpcion(e.target.value)}>
            <option value = "defaultValue">
              Selecione uma disciplina
            </option>
            <option value="database">Banco de Dados</option>
            <option value="backend">Desenvolvimento Backend</option>
            <option value="frontend">Desenvolvimento Frontend</option>
            <option value="devops">Devops</option>
          </select>
          <input type='number' value = {valor} onChange = {e => setValor(e.target.value)}/>
        </div>
        <input type="submit" value="Salvar" disabled = {isDisabled}/>
      </form>
      <div className="container">
        <table border="1" className="line_title">
          <thead>
            <tr>
              <th>Disciplina</th>
              <th>Quantidade de Alunos</th>
              <th>Média das notas dos alunos</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Banco de Dados</td>
              <td>{alumnosDatos}</td>
              <td>{notasDatos}</td>
            </tr>

            <tr>
              <td>Desenvolvimento Frontend</td>
              <td>{alumnosFront}</td>
              <td>{notasFront}</td>
            </tr>

            <tr>
              <td>Desenolvimento Backend</td>
              <td>{alumnosBack}</td>
              <td>{notasBack}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}
export default App;
