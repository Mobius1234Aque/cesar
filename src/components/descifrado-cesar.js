import React, { useState } from 'react';

function DescifradoCesar() {
  const [textoCifrado, setTextoCifrado] = useState('');
  const [desplazamiento, setDesplazamiento] = useState(5);
  const [resultado, setResultado] = useState('');

  const eliminarAcentosDieresis = (texto) => {
    return texto.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  };

  const descifrar = () => {
    if (isNaN(desplazamiento) || desplazamiento < 1) {
      alert("El desplazamiento debe ser un valor positivo.");
      return;
    }

    const textoSinAcentosDieresis = eliminarAcentosDieresis(textoCifrado);
    let descifrado = "";

    for (let i = 0; i < textoSinAcentosDieresis.length; i++) {
      let char = textoSinAcentosDieresis[i];
      if (char.match(/[a-zA-Z]/)) {
        let charCode = char.charCodeAt(0);
        let baseCharCode = charCode <= 90 ? 65 : 97;
        char = String.fromCharCode(((charCode - baseCharCode - desplazamiento + 26) % 26) + baseCharCode);
      }
      descifrado += char;
    }

    setResultado(descifrado);
  };

  return (
    <div class="jfe">
    <div className="container">
      <label>Texto a descifrar:</label>
      <input type="text" className="form-control" value={textoCifrado} onChange={(e) => setTextoCifrado(e.target.value)} />
      <div class="oculto" className="form-group">
        <label class="oculto" >Desplazamiento:</label>
        <input type="number" class="oculto" className="form-control" value={desplazamiento} onChange={(e) => setDesplazamiento(e.target.value)} />
      </div>
      <button className="btn btn-danger" onClick={descifrar}>Descifrar</button>
      <div className="form-group">
        <p className="mt-3">Texto descifrado:</p>
        <p className="form-control">{resultado}</p>
      </div>
    </div>
    </div>
  );
}

export default DescifradoCesar;
