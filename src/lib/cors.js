export function withCors(handler) {
  return async (req, context) => {
    const response = await handler(req, context);

    // Add CORS headers
    response.headers.set("Access-Control-Allow-Origin", "*"); // or restrict to your frontend domain
    response.headers.set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    response.headers.set("Access-Control-Allow-Headers", "Content-Type, Authorization");

    return response;
  };
}