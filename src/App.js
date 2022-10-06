import './App.css';
import {Note} from './Note';
import {useEffect, useState } from 'react';
//import { getAllNotes } from './services/notes/getAllNotes';
//import { createNote } from './services/notes/createNote';
import {create as createNote, getAll as getAllNotes} from './services/notes';

//lo que tenga que ver con showall y eso es el filtro
export default function App(/*props*/){ //ya no resive datos por props
  const [notes, setNotes] = useState(/*props.notes*/[]) //ahora los resive en formato array
  const [newNote, setNewNotes] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  //const [showAll, setShowAll] = useState(true)

  //si se usa el fetch sin control del useEffect se va a renderizar y a llamar la promesa y el componente app
  //infinitamente
  /*fetch('https://jsonplaceholder.typicode.com/posts')
  .then((response) => response.json())
  .then((json) => {console.log(json);
  })*/

  useEffect(() => {
    console.log('useEffect')
    setLoading(true)
    getAllNotes()//metodo servicio getAllNotes de services/notes
    .then(notes => {
      setNotes(notes);
      setLoading(false);
    })
    //.then(response => response)
  }, []);

  const handleChange = (event) => {
    setNewNotes(event.target.value)
  }

  const hundledSubmit = (event) => {
    event.preventDefault();
    const noteToAddToState = {
      content: newNote,
      //date: new Date(),
      //userId: 1, //new Date().toISOString(),
      imporant: Math.random() < 0.5
    };    

    /*axios.post("https://jsonplaceholder.typicode.com/posts", noteToAddToState)
    .then((response) => {
      const { data } = response;
      setNotes((prevNotes) => prevNotes.concat(data));
    });*/
    createNote(noteToAddToState)
    .then(newNote => {
      setNotes((prevNotes) => prevNotes.concat(newNote));
    }).catch((error) => {
      console.log(error)
      setError('la API ha petao');
    })

    setNewNotes('');
  }

  /*const handleShowAll = () => {
    setShowAll(() => !showAll);
  }*/

  //if(notes.length === 0) return 'Hola aun no hay nada';

  return   (
    <div>
      <h1>Notes</h1>
      {loading ? 'cargando...' : ''}
      
      {/*<button onClick={handleShowAll}>
        {showAll ? 'Only show important' : 'show all'}
      </button>*/}
      <ol>
        {notes.map((note) => (
          //el filter va despues del notes.
        /*.filter((note) => {
          if(showAll === true) return true;
          return note.important === true;
        })*/
          //<Note key={note.id} id={note.id} content={note.content} date={note.date}/>
          <Note key={note.id} {...note}/>
        ))}
      </ol>
      <form onSubmit={hundledSubmit}>
        <input type='text' onChange={handleChange} value={newNote} />
        {/*con el div se usa esto con el onclick, per si la etiqueta es form no se usa
        el onclick={} como la linea de abajo*/}
        {/*<button onClick={hundledClick}>Crear Nota</button>*/}
        <button>Crear Nota</button>
      </form>
      {error ? <span style={{color: "red"}}>{error}</span> : ''}
    </div>
  );
}
