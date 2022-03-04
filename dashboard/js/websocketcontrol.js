export const ws = new WebSocket("ws://lt.sv12.laminne33569.net:8080/");

export function send(m) {
    const mes = JSON.stringify(m);
    ws.send(mes);
}