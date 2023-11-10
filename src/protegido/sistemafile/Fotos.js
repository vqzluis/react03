import React from 'react'
import foto1 from './fotos/honorio.jpg'

const fotos = () => {
  return (
    <div id='file'>
      <h1>Fotos</h1>
      Página para fotos...
      <img src={foto1} width="400" height="400"></img>
    </div>
  )
}

export default fotos
