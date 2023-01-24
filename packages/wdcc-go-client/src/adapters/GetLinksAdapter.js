const getLinks = async () => {
  const resp = await fetch('/links', { method: "GET" });
  if (resp.ok) {
    const data = await resp.json();
    return data;
  }

  throw Error("Links request failed");
}

export {
  getLinks
}