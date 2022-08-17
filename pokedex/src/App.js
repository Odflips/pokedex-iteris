import { useEffect, useState } from 'react';
import './App.css';
import Detalhe from './components/Detalhe';





function App() {



  const [pokemos, setPokemons] = useState([])
  const [next, setNext] = useState("")
  const [previous, setPrevious] = useState("")
  const [url, setUrl] = useState("https://pokeapi.co/api/v2/pokemon/")
  const [info, setInfo] = useState([])
  const [img, setImg] = useState()
  const [types, setTypes] = useState([])
  const [base, setbase] = useState([])
  const [show, setShow] = useState(false)
  const [count, setCount] = useState(1)
  const [fundo, setFundo] = useState(false)
  const pokedex = document.querySelector('.lista')
  const detalhe = document.querySelector('.boxlogo')
  
 

  const handleNext = () => {
    setUrl(next)
  }

  const handlePrevious = () => {
    setUrl(previous)
  }

  useEffect(()=>{
    fetch(url)
    .then(response=> response.json())
    .then(response=>{
      setNext(response.next)
      setPrevious(response.previous)
      setPokemons(response.results)
    })
  },[url])


  const handleinfo= (url)=>{
    fetch(url)
    .then(response=> response.json())
    .then(response=>{

      setInfo(response)
       setImg(response.sprites.other.dream_world.front_default)
        setTypes(response.types)
        setTypes(response.types)
        setbase(response.stats)
        setShow(true)
        setFundo(false)

    })
  }

  const handleImage =(src)=>{
    setCount(count + 1)
    if(count === 3){
      setFundo(src)
      setCount(1)
      setShow(false)
      pokedex.style.display = 'none';
      detalhe.style.display = 'none';
      
      
      
    } 
      
     
      
    

   
  }





  
  return (

    

    
  <div className="fundo" style={{backgroundImage: "url(" + fundo + ")"}}>

      <Detalhe />

     

    <div className='pokedex'>
      <div className="lista">
        {
          pokemos && pokemos.map((item) =>(
            <>
            <div className="pokeNome" onClick={(e)=>handleinfo(item.url)}>{item.name}</div>
            
            
            
            
            </>

          ))
        }
        <div className="btns">
            <button className="btn" onClick={handlePrevious}>previous</button>
            <button className="btn" onClick={handleNext}>next</button>


        </div>

      </div>

      {
        show?
        <div className="poke">
          <div className="pokeContent"> 
            <img className="image" src={img} alt={img} onClick={(e)=>handleImage(e.target.src)}/>
            <div className="nome">
              <div className="pokemonNome">{info.name}</div>
              <div className="btns">
                {
                  types.map((item)=>(
                    <button className="btns2">{item.type.name}</button>
                  ))
                }
              </div>
            </div>

          </div>

          <div className="stats">

            <div className='stats2'>
              <h3>Hp</h3>
              <h3>Attack</h3>
              <h3>Defense</h3>
              <h3>Speed</h3>
            </div>
            {
              base.slice(0,3).map((item)=>(
                <div className="barra"><div className="dados" style={{width: `${item.base_stat}%`,height:"20px"}}></div></div>

              ))
            }

            {
              base.slice(5).map((item)=>(
                <div className="barra"><div className="dados" style={{width: `${item.base_stat}%`,height:"20px"}}></div></div>
              ))

            }


          </div>

        </div>
        :
        null
        
      }



     </div>
  </div>
    
      
  );
  
  }

export default App;
