# Message Queue Simulator (Bun)

This project demonstrates a lightweight **Message Broker → Queue → Worker → Service** pipeline in **Bun**, modeled after a real event-driven architecture.

It includes:

- In-memory message broker
- Queues (Email, InApp, Push)
- Workers with retry logic and Dead Letter Queue (DLQ)
- Mocked external services (Email, Database, Push)

---

## Architecture (Mermaid Diagram)

```mermaid
flowchart LR
    %% Clients
    subgraph Clients
        U1((User))
        U2((User))
        U3((User))
    end

    %% Entry Point (Message Broker)
    Broker[(Message Broker)]
    U1 --> Broker
    U2 --> Broker
    U3 --> Broker

    %% Queues
    EQ[Email Queue]
    IAQ[In App Queue]
    PNQ[Push Notification Queue]

    %% Workers
    EW[Email Worker]
    IAW[In App Worker]
    PNW[Push Notification Worker]

    %% DLQ
    DLQ[[DLQ]]
    NoteDLQ["Max Retries = 10"]

    %% Flows
    Broker -->|user.signup<br/>user.login| EQ
    Broker -->|user.post<br/>user.login| IAQ
    Broker -->|user.send_req| PNQ

    EQ --> EW
    EW -->|Fail| DLQ
    EW -.-> NoteDLQ
    IAQ --> IAW
    PNQ --> PNW

    %% Services
    SES[Email Service]
    DB[(Database)]
    Push[(Push Service)]

    EW --> SES
    IAW --> DB
    PNW --> Push

    %% API Calls
    subgraph API Calls
        A1[POST /signup,<br/>/login]
        A2[POST /post]
        A3[POST /send_req]
    end

    A1 --> EQ
    A2 --> IAQ
    A3 --> PNQ
```

---

## Running the Service

```bash
bun run src/index.ts
```

The server will start at `http://localhost:3000`.

---

## Testing APIs

Use `curl` or Postman to simulate clients:

```bash
# Signup
curl -X POST http://localhost:3000/signup \
  -H "Content-Type: application/json" \
  -d '{"user":"alice"}'

# Login
curl -X POST http://localhost:3000/login \
  -H "Content-Type: application/json" \
  -d '{"user":"bob"}'

# Post
curl -X POST http://localhost:3000/post \
  -H "Content-Type: application/json" \
  -d '{"content":"hello"}'

# Send request
curl -X POST http://localhost:3000/send_req \
  -H "Content-Type: application/json" \
  -d '{"to":"charlie"}'
```

---

## Expected Logs

On success:

```
EmailWorker processing: {...}
Sending email via SES mock: {...}
InAppWorker processing: {...}
Saving to DB: {...}
PushWorker processing: {...}
Sending Push notification: {...}
```

On failure (if worker throws):

```
EmailWorker failed
DLQ received: {...}
```

---

## DLQ (Dead Letter Queue)

- Each queue retries failed messages up to **10 times**.
- After that, the message is pushed into the **DLQ**.
- You can inspect DLQ contents by checking console logs.

```

```
