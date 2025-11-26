const CONTACTO_API_URL = 'http://localhost:3004/contacto';

export interface ContactoRequest {
  nombre: string;
  email: string;
  mensaje: string;
}

export async function sendContactMessage(data: ContactoRequest): Promise<any> {
  const response = await fetch(`${CONTACTO_API_URL}/guardar`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error('Error al enviar el mensaje');
  }

  return response.json();
}