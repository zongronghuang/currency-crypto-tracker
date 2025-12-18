import { http, HttpResponse } from "msw";

export const handlers = [
  http.get("https://api.example.com/user", () => {
    return HttpResponse.json({
      id: "abc-123",
      firstName: "John",
      lastName: "Maverick",
    });
  }),

  http.get("https://api.example.com/query", () => {
    return HttpResponse.json({
      "Realtime Currency Exchange Rate": {
        "1. From_Currency Code": "BTC",
        "2. From_Currency Name": "Bitcoin",
        "3. To_Currency Code": "EUR",
        "4. To_Currency Name": "Euro",
        "5. Exchange Rate": "75933.18000000",
        "6. Last Refreshed": "2025-12-17 15:36:40",
        "7. Time Zone": "UTC",
        "8. Bid Price": "75931.67600000",
        "9. Ask Price": "75935.81100000",
      },
    });
  }),
];
