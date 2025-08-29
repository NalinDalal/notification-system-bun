class DLQ {
  private items: any[] = [];

  enqueue(msg: any) {
    this.items.push(msg);
    console.warn("DLQ received:", msg);
  }

  list() {
    return this.items;
  }
}

export const dlq = new DLQ();
