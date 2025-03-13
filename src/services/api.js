
const API_URL = 'http://localhost:3000/fila';

// http://localhost:3000/fila -- LOCAL
// https://backend-filas.fly.dev/fila -- FLY.IO
// https://backend-filas-production.up.railway.app/fila -- RAILWAY

export async function updateCheck(item, restaurante) {
  const response = await fetch(`${API_URL}/update/${restaurante}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(item)
  });
  return response.json();
}
