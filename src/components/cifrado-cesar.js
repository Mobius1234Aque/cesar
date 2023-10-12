import React, { useState } from 'react';

function CifradoCesar() {
  const [texto, setTexto] = useState('');
  const [desplazamiento, setDesplazamiento] = useState(5);
  const [resultado, setResultado] = useState('');

  const eliminarAcentosDieresis = (texto) => {
    return texto.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  };

  const cifrar = () => {
    if (isNaN(desplazamiento) || desplazamiento < 1) {
      alert("El desplazamiento debe ser un valor positivo.");
      return;
    }

    const textoSinAcentosDieresis = eliminarAcentosDieresis(texto);
    let cifrado = "";

    for (let i = 0; i < textoSinAcentosDieresis.length; i++) {
      let char = textoSinAcentosDieresis[i];
      if (char.match(/[a-zA-Z]/)) {
        let charCode = char.charCodeAt(0);
        let baseCharCode = charCode <= 90 ? 65 : 97;
        char = String.fromCharCode(((charCode - baseCharCode + desplazamiento) % 26) + baseCharCode);
      }
      cifrado += char;
    }

    setResultado(cifrado);
  };

  return (
    <div class="jfe">
    <div className="container">
      <h2 className="text-center">Cifrado César</h2>
      <div className="form-group">
        <label>Texto a cifrar:</label>
        <input type="text" className="form-control" value={texto} onChange={(e) => setTexto(e.target.value)} />
      </div>
      <div class="oculto" className="form-group">
        <label class="oculto">Desplazamiento:</label>
        <input type="number" class="oculto" className="form-control" value={desplazamiento} onChange={(e) => setDesplazamiento(e.target.value)} />
      </div>
      <button className="btn btn-primary" onClick={cifrar}>Cifrar</button>
      <div className="form-group">
        <p className="mt-3">Texto cifrado:</p>
        <p className="form-control">{resultado}</p>
      </div>
    </div>
    </div>
  );
}

export default CifradoCesar;