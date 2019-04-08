async function makeRequest(url: string, params: RequestInit = {}): Promise<any> {
  const res = await fetch(url, Object.assign({
    headers: Object.assign({
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    }, params.headers || {}),
  }, params));
  if (!res.ok) {
    let data;
    try {
      data = await res.json();
    } catch (e) {
      throw new Error(res.statusText);
    }
    if (typeof data.message === 'string') {
      throw new Error(data.message)
    } else if (Array.isArray(data.message)) {
      const message = data.message.map(({constraints}) => Object.values(constraints).join(', ')).join(', ');
      throw new Error(message);
    }
  }
  return res.json();
}

export async function login(email: string, password: string): Promise<string> {
  const data = await makeRequest('http://localhost:4001/auth/password', {
    method: 'POST',
    body: JSON.stringify({email, password}),
  });
  return data.token;
}

export async function getCurrentUser(token: string): Promise<{name: string, email: string}> {
  const data = await makeRequest('http://localhost:4001/auth/current', {
    headers: {
      'Authorization': 'Bearer ' + token,
    }
  });
  return data;
}
