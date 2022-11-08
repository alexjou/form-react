import React from 'react'

export default function Footer() {
  return (
    <footer
      style={{
        display: 'flex',
        backgroundColor: '#2b2d1c',
        borderTop: '2px solid blue',
        position: 'fixed',
        justifyContent: 'center',
        height: 50,
        width: '100%',
        bottom: 0,
        left: 0,
        color: 'white',
        fontSize: '15px',
      }}
    >
      <a
        href="https://alexjou.github.io/Formulario-HTML-CSS-JAVASCRIPT/"
        target="_blank"
        style={{ color: 'white', marginTop: 15 }}
        rel="noreferrer"
      >
        Link para o site em HTML, CSS e JAVASCRIPT
      </a>
    </footer>
  )
}
