import { NextResponse } from 'next/server';

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL!;
const API_USERNAME = process.env.NEXT_PUBLIC_API_USERNAME!;
const API_PASSWORD = process.env.NEXT_PUBLIC_API_PASSWORD!;

async function fetchData<T>(endpoint: string): Promise<T> {
  console.log("Buscando dados de:", endpoint);

  const response = await fetch(`${BASE_URL}${endpoint}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Basic ${btoa(`${API_USERNAME}:${API_PASSWORD}`)}`,
    },
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error(`Erro ao buscar: ${endpoint}`);
  }

  const data: T = await response.json();
  return data;
}

export async function GET() {
  const endpoint = "/users/usersData"; 
  try {
    const usersData = await fetchData(endpoint);
    return NextResponse.json(usersData);
  } catch (error) {
    console.error("Erro ao buscar usuários:", error);
    return NextResponse.json({ message: 'Erro ao buscar dados da API' }, { status: 500 });
  }
}
