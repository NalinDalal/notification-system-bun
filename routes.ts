import { broker } from "./broker";

export const router = {
  async fetch(req: Request) {
    const url = new URL(req.url);

    if (req.method === "POST" && url.pathname === "/signup") {
      broker.publish("email", { type: "signup", data: await req.json() });
      broker.publish("inapp", { type: "login", data: await req.json() });
      return new Response("User signed up", { status: 200 });
    }

    if (req.method === "POST" && url.pathname === "/login") {
      broker.publish("email", { type: "login", data: await req.json() });
      broker.publish("inapp", { type: "login", data: await req.json() });
      return new Response("User logged in", { status: 200 });
    }

    if (req.method === "POST" && url.pathname === "/post") {
      broker.publish("inapp", { type: "post", data: await req.json() });
      return new Response("Post created", { status: 200 });
    }

    if (req.method === "POST" && url.pathname === "/send_req") {
      broker.publish("push", { type: "send_req", data: await req.json() });
      return new Response("Request sent", { status: 200 });
    }

    return new Response("Not Found", { status: 404 });
  },
};
