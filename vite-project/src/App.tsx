// App.tsx
import React, { useState } from 'react';

// Interfaces TypeScript
interface Carta {
  id: string;
  nombre: string;
  descripcion: string;
  ataque: number;
  defensa: number;
  imagen: string;
}

type ModoFormulario = 'crear' | 'editar';

// Componente Principal
const App: React.FC = () => {
  // Estados
  const [cartas, setCartas] = useState<Carta[]>([]);
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [modoFormulario, setModoFormulario] = useState<ModoFormulario>('crear');
  const [cartaEditando, setCartaEditando] = useState<Carta | null>(null);
  const [formData, setFormData] = useState({
    nombre: '',
    descripcion: '',
    ataque: 0,
    defensa: 0,
    imagen: ''
  });

  // Operaciones CRUD
  const crearCarta = (): void => {
    const nuevaCarta: Carta = {
      ...formData,
      id: Date.now().toString()
    };
    setCartas(prev => [...prev, nuevaCarta]);
    resetForm();
  };

  const actualizarCarta = (): void => {
    if (!cartaEditando) return;
    
    setCartas(prev => prev.map(carta => 
      carta.id === cartaEditando.id 
        ? { ...formData, id: cartaEditando.id }
        : carta
    ));
    resetForm();
  };

  const eliminarCarta = (id: string): void => {
    setCartas(prev => prev.filter(carta => carta.id !== id));
  };

  // Manejo del Formulario
  const iniciarCreacion = (): void => {
    setModoFormulario('crear');
    setCartaEditando(null);
    setFormData({
      nombre: '',
      descripcion: '',
      ataque: 0,
      defensa: 0,
      imagen: ''
    });
    setMostrarFormulario(true);
  };

  const iniciarEdicion = (carta: Carta): void => {
    setModoFormulario('editar');
    setCartaEditando(carta);
    setFormData({
      nombre: carta.nombre,
      descripcion: carta.descripcion,
      ataque: carta.ataque,
      defensa: carta.defensa,
      imagen: carta.imagen
    });
    setMostrarFormulario(true);
  };

  const resetForm = (): void => {
    setMostrarFormulario(false);
    setCartaEditando(null);
    setFormData({
      nombre: '',
      descripcion: '',
      ataque: 0,
      defensa: 0,
      imagen: ''
    });
  };

  const manejarCambio = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'ataque' || name === 'defensa' ? Number(value) : value
    }));
  };

  const manejarSubmit = (e: React.FormEvent): void => {
    e.preventDefault();
    if (modoFormulario === 'editar') {
      actualizarCarta();
    } else {
      crearCarta();
    }
  };

  // Validación del formulario
  const esFormularioValido = formData.nombre.trim() !== '' && 
                            formData.descripcion.trim() !== '' && 
                            formData.ataque >= 0 && 
                            formData.defensa >= 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100 p-4">
      <div className="max-w-7xl mx-auto">
        
        {/* Header con diseño mejorado */}
        <header className="text-center mb-12 py-8">
          <div className="relative inline-block">
            <div className="absolute -inset-4 bg-gradient-to-r from-purple-400 to-blue-500 rounded-2xl blur-lg opacity-30"></div>
            <h1 className="relative text-5xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              🃏 Crea tu propia carta
            </h1>
          </div>
          <p className="text-gray-600 mt-4 text-lg max-w-2xl mx-auto leading-relaxed">
            Crea y gestiona tu colección de cartas🥱
          </p>
        </header>

        {/* Botón Nueva Carta con efecto glassmorphism */}
        <div className="text-center mb-12">
          <button
            onClick={iniciarCreacion}
            className="relative overflow-hidden group bg-white/20 backdrop-blur-lg border border-white/30 rounded-2xl px-8 py-4 text-purple-700 font-semibold shadow-2xl hover:shadow-purple-200 transition-all duration-300 hover:scale-105"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-purple-400/20 to-blue-400/20 group-hover:from-purple-400/30 group-hover:to-blue-400/30 transition-all duration-300"></div>
            <span className="relative flex items-center gap-2">
              <span className="text-xl">+</span>
              Crear Nueva Carta
            </span>
          </button>
        </div>

        {/* Formulario con diseño glassmorphism */}
        {mostrarFormulario && (
          <div className="mb-12 max-w-2xl mx-auto">
            <div className="bg-white/20 backdrop-blur-lg border border-white/30 rounded-2xl p-8 shadow-2xl">
              <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                {modoFormulario === 'editar' ? '✨ Editar Carta' : '🎴 Crear Nueva Carta'}
              </h2>
              
              <form onSubmit={manejarSubmit} className="space-y-6">
                {/* Nombre */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Nombre *
                  </label>
                  <input
                    type="text"
                    name="nombre"
                    value={formData.nombre}
                    onChange={manejarCambio}
                    className="w-full bg-white/50 backdrop-blur-sm border border-white/50 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all duration-200"
                    placeholder="Nombre de la carta..."
                    required
                  />
                </div>

                {/* Descripción */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Descripción *
                  </label>
                  <textarea
                    name="descripcion"
                    value={formData.descripcion}
                    onChange={manejarCambio}
                    className="w-full bg-white/50 backdrop-blur-sm border border-white/50 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all duration-200 resize-none"
                    rows={3}
                    placeholder="Describe los poderes y habilidades de la carta..."
                    required
                  />
                </div>

                {/* Ataque y Defensa */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      ⚔️ Ataque *
                    </label>
                    <input
                      type="number"
                      name="ataque"
                      value={formData.ataque}
                      onChange={manejarCambio}
                      className="w-full bg-white/50 backdrop-blur-sm border border-white/50 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-red-400 focus:border-transparent transition-all duration-200"
                      min="0"
                      max="9999"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      🛡️ Defensa *
                    </label>
                    <input
                      type="number"
                      name="defensa"
                      value={formData.defensa}
                      onChange={manejarCambio}
                      className="w-full bg-white/50 backdrop-blur-sm border border-white/50 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-200"
                      min="0"
                      max="9999"
                      required
                    />
                  </div>
                </div>

                {/* Imagen */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    🖼️ URL de Imagen
                  </label>
                  <input
                    type="url"
                    name="imagen"
                    value={formData.imagen}
                    onChange={manejarCambio}
                    className="w-full bg-white/50 backdrop-blur-sm border border-white/50 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent transition-all duration-200"
                    placeholder="https://ejemplo.com/imagen-magica.jpg"
                  />
                </div>

                {/* Botones */}
                <div className="flex gap-4 pt-6">
                  <button
                    type="submit"
                    disabled={!esFormularioValido}
                    className={`flex-1 py-4 rounded-xl font-semibold transition-all duration-300 ${
                      esFormularioValido 
                        ? 'bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-lg hover:shadow-green-200 hover:scale-105' 
                        : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    }`}
                  >
                    {modoFormulario === 'editar' ? '🔄 Actualizar' : '✨ Crear Carta'}
                  </button>
                  <button
                    type="button"
                    onClick={resetForm}
                    className="flex-1 bg-gradient-to-r from-gray-500 to-gray-600 text-white py-4 rounded-xl font-semibold shadow-lg hover:shadow-gray-200 hover:scale-105 transition-all duration-300"
                  >
                    ❌ Cancelar
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Lista de Cartas con diseño mejorado */}
        {cartas.length === 0 ? (
          <div className="text-center py-20 bg-white/20 backdrop-blur-lg border border-white/30 rounded-2xl shadow-2xl">
            <div className="text-8xl mb-6 opacity-50">🃏</div>
            <p className="text-gray-600 text-xl mb-2">No hay cartas creadas aún.</p>
            <p className="text-gray-500">¡Crea tu primera carta mágica!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {cartas.map(carta => (
              <div 
                key={carta.id} 
                className="group relative overflow-hidden rounded-2xl transition-all duration-500 hover:scale-105 hover:rotate-1"
              >
                {/* Efecto de fondo difuminado */}
                <div className="absolute inset-0 bg-gradient-to-br from-purple-400/20 via-blue-400/20 to-pink-400/20 backdrop-blur-lg border border-white/30 rounded-2xl shadow-2xl group-hover:shadow-purple-200/50 transition-all duration-500"></div>
                
                {/* Contenido de la carta */}
                <div className="relative p-6 z-10">
                  {/* Imagen con efecto*/}
                  <div className="mb-4 rounded-xl overflow-hidden border border-white/50 bg-white/20 backdrop-blur-sm">
                    <img 
                      src={carta.imagen || '/placeholder-image.jpg'} 
                      alt={carta.nombre}
                      className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDIwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIyMDAiIGhlaWdodD0iMjAwIiBmaWxsPSJ1cmwoI2dyYWQpIi8+CjxkZWZzPgo8bGluZWFyR3JhZGllbnQgaWQ9ImdyYWQiIHgxPSIwIiB5MT0iMCIgeDI9IjIwMCIgeTI9IjIwMCIgZ3JhZGllbnRVbml0cz0idXNlclNwYWNlT25Vc2UiPgo8c3RvcCBvZmZzZXQ9IjAuMSIgc3RvcC1jb2xvcj0iI0VBRjNGQSIvPgo8c3RvcCBvZmZzZXQ9IjAuOSIgc3RvcC1jb2xvcj0iI0Q0RUFGQSIvPgo8L2xpbmVhckdyYWRpZW50Pgo8L2RlZnM+Cjx0ZXh0IHg9IjEwMCIgeT0iMTAwIiBmb250LWZhbWlseT0iQXJpYWwsIHNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iMTQiIGZpbGw9IiM2QjcyODAiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIwLjM1ZW0iPk5vIEltYWdlPC90ZXh0Pgo8L3N2Zz4K';
                      }}
                    />
                  </div>
                  
                  {/* Nombre */}
                  <h3 className="text-xl font-bold text-gray-800 mb-2 bg-white/30 backdrop-blur-sm rounded-lg p-2 text-center">
                    {carta.nombre}
                  </h3>
                  
                  {/* Descripción */}
                  <p className="text-gray-700 text-sm mb-4 bg-white/20 backdrop-blur-sm rounded-lg p-3 min-h-[80px]">
                    {carta.descripcion}
                  </p>
                  
                  {/* Stats con diseño mejorado */}
                  <div className="flex justify-between gap-2 mb-4">
                    <div className="flex-1 text-center bg-gradient-to-r from-red-400/20 to-red-500/30 backdrop-blur-sm rounded-xl p-2 border border-red-200/50">
                      <div className="text-xs text-red-600 font-semibold">ATAQUE</div>
                      <div className="text-lg font-bold text-red-700">{carta.ataque}</div>
                    </div>
                    <div className="flex-1 text-center bg-gradient-to-r from-blue-400/20 to-blue-500/30 backdrop-blur-sm rounded-xl p-2 border border-blue-200/50">
                      <div className="text-xs text-blue-600 font-semibold">DEFENSA</div>
                      <div className="text-lg font-bold text-blue-700">{carta.defensa}</div>
                    </div>
                  </div>
                  
                  {/* Botones con efecto */}
                  <div className="flex gap-2">
                    <button 
                      onClick={() => iniciarEdicion(carta)}
                      className="flex-1 bg-gradient-to-r from-yellow-400/20 to-yellow-500/30 backdrop-blur-sm border border-yellow-200/50 text-yellow-700 py-2 rounded-xl font-semibold hover:from-yellow-400/30 hover:to-yellow-500/40 transition-all duration-300 hover:scale-105"
                    >
                      ✏️ Editar
                    </button>
                    <button 
                      onClick={() => eliminarCarta(carta.id)}
                      className="flex-1 bg-gradient-to-r from-red-400/20 to-red-500/30 backdrop-blur-sm border border-red-200/50 text-red-700 py-2 rounded-xl font-semibold hover:from-red-400/30 hover:to-red-500/40 transition-all duration-300 hover:scale-105"
                    >
                      🗑️ Eliminar
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Contador de Cartas con diseño*/}
        {cartas.length > 0 && (
          <div className="mt-12 text-center">
            <div className="inline-block bg-white/20 backdrop-blur-lg border border-white/30 rounded-2xl px-6 py-3 shadow-2xl">
              <span className="text-gray-700 font-semibold">
                🃏 Total de cartas: <span className="text-purple-600 text-lg">{cartas.length}</span>
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;