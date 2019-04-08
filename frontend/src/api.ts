export async function login(email: string, password: string): Promise<string> {
  const res = await fetch('http://localhost:4001/auth/password', {
    method: 'POST',
    body: JSON.stringify({email, password}),
  });
  if (!res.ok) {
    throw new Error(`Response failed: ${res.statusText}`);
  }
  const data = await res.json();
  if (data.token) {
    window.localStorage.setItem('token', data.token);
  }
  return data.data;
}
