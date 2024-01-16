import React from 'react'

export default function DesignSystem() {
  return (
    <div>
      <h1>Nagłówek pierwszego stopnia</h1>
      <h2>Nagłowek drugiego stopnia</h2>
      <h3>Nagłowek trzeciego stopnia</h3>
      <p><strong>Akapit z Tekstem pogrubionym. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Enim, laboriosam? Quasi dignissimos dolorum, animi sint maxime aperiam, quo nostrum perspiciatis, quam id magni qui! Minima consequatur provident quibusdam laboriosam sequi!</strong></p>
      <p>Akapit z tekstem normalnym. Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt a ipsam doloribus. Nemo fuga, ullam soluta quaerat vel sunt quae natus commodi. Quaerat nam voluptates laudantium officiis earum id modi.</p>
      <p className='italic-font'>Akapit z tekstem w kursywie. Lorem ipsum dolor sit amet consectetur, adipisicing elit. Tempore magni, repudiandae pariatur omnis consequuntur aspernatur minus impedit ducimus ut nihil rerum sit minima. Itaque expedita optio sit ratione, eos facilis.</p>
      <p className='alt-font'>Akapit z tekstem w alternatywnym kroju. Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere voluptatem quia natus omnis. Quos illum culpa facere amet, nisi delectus blanditiis ut sint aperiam, mollitia vel similique fuga quasi odit.</p>
      <div className='flex-start'> <button className='btn'>Przycisk normalny</button><button className='btn-alert'>Przycisk wyróżniony</button><button className='btn-cta'>Przycisk CTA</button></div>
     
    </div>
  )
}
