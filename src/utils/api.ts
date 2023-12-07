const BASE_URL = "http://localhost:8080/api";
type RequestBody = {
  method: string;
  body?: string;
  mode: RequestMode;
  headers: any;
};
export const request = async (
  method: string,
  url: string,
  body: object | null,
  handleRequest: Function
) => {
  try {
    const requestBody: RequestBody = {
      method: method,
      mode: "cors",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    };
    if (body) {
      requestBody.body = JSON.stringify(body);
    }
    const response = await fetch(BASE_URL + url, requestBody);

    const data = await response.json();
    handleRequest(data);
  } catch (e) {
    const rows = [
      {
        id: 1,
        name: "B1",
        floorNum: 5,
        classNum: 100,
      },
      {
        id: 2,
        name: "B2",
        floorNum: 5,
        classNum: 100,
      },
      {
        id: 3,
        name: "B3",
        floorNum: 5,
        classNum: 100,
      },
      {
        id: 4,
        name: "C3",
        floorNum: 5,
        classNum: 100,
      },
      {
        id: 5,
        name: "C1",
        floorNum: 5,
        classNum: 100,
      },
      {
        id: 6,
        name: "C2",
        floorNum: 5,
        classNum: 100,
      },
    ];
    handleRequest(rows);
  }
};
