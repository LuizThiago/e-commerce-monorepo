import { auth } from "@clerk/nextjs/server";

export default async function TestPage() {
  const { getToken } = await auth();
  const token = await getToken();

  return (
    <div className="">
      <h1 className="text-2xl font-bold mb-4">Service Test Page</h1>
      <div className="mb-4">
        <h2 className="text-xl font-semibold mb-2">Product Service Test:</h2>
        {await testService(
          "http://localhost:8000",
          "Product",
          token ?? undefined
        )}
        <h2 className="text-xl font-semibold mb-2">Order Service Test:</h2>
        {await testService(
          "http://localhost:8001",
          "Order",
          token ?? undefined
        )}
        <h2 className="text-xl font-semibold mb-2">Payment Service Test:</h2>
        {await testService(
          "http://localhost:8002",
          "Payment",
          token ?? undefined
        )}
      </div>
    </div>
  );
}

async function testService(url: string, testType: string, token?: string) {
  if (!token) {
    return <div>Token not available!</div>;
  }

  const res = await fetch(`${url}/test`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    const errorText = await res.text();
    console.error(`Error from ${testType} /test:`, errorText);
    return <div>Error: {errorText}</div>;
  }

  const data = await res.json();
  console.log(`Response from ${testType} /test:`, data);

  return <div>{testType} service test successful!</div>;
}
