import { NextResponse } from 'next/server';

// Constantes de configuração da API
const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL!;
const API_USERNAME = process.env.NEXT_PUBLIC_API_USERNAME!;
const API_PASSWORD = process.env.NEXT_PUBLIC_API_PASSWORD!;

// Função para buscar dados diretamente da API
async function fetchData<T>(endpoint: string): Promise<T> {
  console.log("Buscando dados de:", endpoint);

  // Faz a requisição HTTP para o endpoint da API
  const response = await fetch(`${BASE_URL}${endpoint}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Basic ${btoa(`${API_USERNAME}:${API_PASSWORD}`)}`, // Autenticação básica
    },
    credentials: "include", // Enviar cookies, se necessário
  });

  // Verifica se a resposta foi bem-sucedida
  if (!response.ok) {
    throw new Error(`Erro ao buscar: ${endpoint}`);
  }

  // Converte a resposta JSON para o tipo T e retorna
  const data: T = await response.json();
  return data;
}

// Função específica para buscar as notícias
export async function GET() {
  const endpoint = "/news/newsData"; // Defina o endpoint correto
  try {
    const newsData = await fetchData(endpoint);
    return NextResponse.json(newsData); // Retorna as notícias como resposta JSON
  } catch (error) {
    console.error("Erro ao buscar notícias:", error);
    return NextResponse.json({ message: 'Erro ao buscar dados da API' }, { status: 500 });
  }
}
