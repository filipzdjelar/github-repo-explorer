interface ApiError extends Error {
  status?: number;
}

export async function fetchApi<T>(
  method: HttpMethod,
  endpoint: string,
  data?: object
): Promise<T> {
  const url = `${import.meta.env.VITE_API_BASE_URL}/${endpoint}`;
  const options: RequestInit = {
    method: method,
    headers: {
      "Content-Type": "application/json",
    },
  };

  if (data) {
    options.body = JSON.stringify(data);
  }

  const response = await fetch(url, options);
  const responseData = await response.json();

  if (!response.ok) {
    const error: ApiError = new Error(responseData.message || "Unknown error");
    error.status = response.status || 500; // default to 500 if status is undefined
    throw error;
  }

  return responseData as T;
}

export enum HttpMethod {
  GET = "GET",
  POST = "POST",
  PUT = "PUT",
  DELETE = "DELETE",
}
