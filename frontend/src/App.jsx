import { useState } from 'react';
import axios from 'axios';
import Medalla from './components/Medalla';

function App() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [idUser, setIdUser]     = useState(null);   // token id_user
  const [role, setRole]         = useState(null);
  const [statusMsg, setStatusMsg] = useState('');

  // Simula login: guarda id_user en estado (= token de sesion)
  const handleLogin = () => {
    // En un caso real harias fetch al backend.
    // Aqui simulamos para el examen:
    if (username === 'admin' && password === 'admin') {
      setIdUser('token_admin_001');
      setRole('SUPERUSER');
    } else if (username === 'usuario' && password === '1234') {
      setIdUser('token_user_001');
      setRole('USER');
    } else {
      alert('Credenciales incorrectas');
    }
  };

  // Llama a /status solo si es SUPERUSER
  const callStatus = async () => {
    if (role !== 'SUPERUSER') {
      setStatusMsg('Acceso denegado: solo Superusuario puede acceder');
      return;
    }
    try {
      const res = await axios.get('http://localhost:8080/status', {
        auth: { username: 'admin', password: 'admin' }  // Basic Auth
      });
      setStatusMsg(res.data);
    } catch (err) {
      setStatusMsg('Error: ' + err.message);
    }
  };

  if (!idUser) {
    return (
      <div style={{ padding: 20 }}>
        <h1>Login</h1>
        <input placeholder='usuario' value={username}
          onChange={e => setUsername(e.target.value)} /><br/>
        <input placeholder='password' type='password' value={password}
          onChange={e => setPassword(e.target.value)} /><br/>
        <button onClick={handleLogin}>Entrar</button>
      </div>
    );
  }

  return (
    <div style={{ padding: 20 }}>
      <h1>Bienvenido, {username} [{role}]</h1>
      <p>Token de sesion: <code>{idUser}</code></p>
            <Medalla nombre={username} />
      <br/><br/>
      {/* Solo muestra el boton si es SUPERUSER */}
      {role === 'SUPERUSER' && (
        <button onClick={callStatus}>Llamar a /status</button>
      )}
      {role !== 'SUPERUSER' && (
        <p style={{color:'red'}}>No tienes acceso a /status</p>
      )}
      {statusMsg && <p><strong>Respuesta:</strong> {statusMsg}</p>}
    </div>
  );
}

export default App;

