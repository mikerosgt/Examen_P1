const storage = {
  get(key, fallback=null){
    try { return JSON.parse(localStorage.getItem(key)) ?? fallback; }
    catch(e){ return fallback; }
  },
  set(key, value){
    localStorage.setItem(key, JSON.stringify(value));
  }
};

(function(){
  // Referencias
  const $ = window.jQuery;

  const body = document.getElementById('bodyRoot');
  const btnBienvenida = document.getElementById('btnBienvenida');
  const btnCambiarFondo = document.getElementById('btnCambiarFondo');
  const btnCambiarParrafo = document.getElementById('btnCambiarParrafo');
  const Acercade = document.getElementById('Acercade');
  const perfilImg = document.getElementById('perfilImg');
  const formPerfil = document.getElementById('formPerfil');
  const formPreferencias = document.getElementById('formPreferencias');
  const inputTexto = document.getElementById('inputTexto');
  const listaPreferencias = document.getElementById('listaPreferencias');
  const tdNombre = document.getElementById('tdNombre');
  const tdCorreo = document.getElementById('tdCorreo');
  if(btnBienvenida){
    btnBienvenida.addEventListener('click', () => {
      alert('¡Bienvenido/a al perfil!');
    });
  }
  const colores = ['#f6f8fb', '#fff7ed', '#eef2ff', '#f0fdf4', '#fff1f2'];
  let idx = 0;
  function aplicarFondo(color){
    if(!body) return;
    body.style.backgroundColor = color;
    storage.set('fondoPerfil', { color });
  }
    if(btnBienvenida){
    btnBienvenida.addEventListener('click', () => {
      alert('¡Bienvenido/a al perfil!');
    });
  }
  const colores = ['#f6f8fb', '#fff7ed', '#eef2ff', '#f0fdf4', '#fff1f2'];
  let idx = 0;
  function aplicarFondo(color){
    if(!body) return;
    body.style.backgroundColor = color;
    // Persistir en localStorage
    storage.set('fondoPerfil', { color });
  }
  if(btnCambiarFondo){
    btnCambiarFondo.addEventListener('click', () => {
      idx = (idx + 1) % colores.length;
      aplicarFondo(colores[idx]);
    });
  }
if(formPreferencias){
    const validarPreferencia = () => {
      if(!inputTexto.value.trim()){
        inputTexto.classList.add('is-invalid');
        return false;
      }
      inputTexto.classList.remove('is-invalid');
      return true;
    };
    document.getElementById('btnAgregar')?.addEventListener('click', (e) => {
      if(!validarPreferencia()) return;
      const li = document.createElement('li');
      li.textContent = inputTexto.value.trim();
      listaPreferencias.appendChild(li);
      inputTexto.value = '';
      // Guardar lista
      const items = Array.from(listaPreferencias.querySelectorAll('li')).map(n => n.textContent);
      storage.set('preferencias', items);
    });
    inputTexto.addEventListener('input', () => inputTexto.classList.remove('is-invalid'));
  }
  if(formPerfil){
    formPerfil.addEventListener('submit', (e) => {
      e.preventDefault();
      const nombre = document.getElementById('nombre');
      const correo = document.getElementById('correo');
      const bio = document.getElementById('bio');

      let ok = true;
      [nombre, correo, bio].forEach(ctrl => {
        if(!ctrl.value.trim()){
          ctrl.classList.add('is-invalid');
          ok = false;
        } else {
          ctrl.classList.remove('is-invalid');
        }
      });

      if(!ok) return;

      const data = { nombre: nombre.value.trim(), correo: correo.value.trim(), bio: bio.value.trim() };
      storage.set('perfil', data);

      tdNombre && (tdNombre.textContent = data.nombre);
      tdCorreo && (tdCorreo.textContent = data.correo);


      alert('Perfil guardado correctamente.');
    });

    ['nombre','correo','bio'].forEach(id => {
      const el = document.getElementById(id);
      el?.addEventListener('input', () => el.classList.remove('is-invalid'));
    });
  }