const dgram = require("dgram");
  
 // You can use print statements as follows for debugging, they'll be visible when running tests.
 console.log("Logs from your program will appear here!");

 function createDNSHeader(queryBuffer) {
   const header = Buffer.alloc(12);
   header.writeUInt16BE(1234, 0); // Pocket Identifier (ID): 1234
   header.writeUInt16BE(0x8000, 2); // Flags: QR=1, OPCODE=0, AA=0, TC=0, RD=0, RA=0, Z=0, RCODE=0
   header.writeUInt16BE(0, 4); // QDCOUNT: 0
   header.writeUInt16BE(0, 6); // ANCOUNT: 0
   header.writeUInt16BE(0, 8); // NSCOUNT: 0
   header.writeUInt16BE(0, 10); // ARCOUNT: 0
 

   return header;
 }


 const udpSocket = dgram.createSocket("udp4");
 udpSocket.bind(2053, "127.0.0.1");
  
 // Uncomment this block to pass the first stage
 //
 // const udpSocket = dgram.createSocket("udp4");
 // udpSocket.bind(2053, "127.0.0.1");
 //
 // udpSocket.on("message", (buf, rinfo) => {
 //   try {
 //     const response = Buffer.from("");
 //     udpSocket.send(response, rinfo.port, rinfo.address);
 //   } catch (e) {
 //     console.log(`Error receiving data: ${e}`);
 //   }
 // });
 //
 // udpSocket.on("error", (err) => {
 //   console.log(`Error: ${err}`);
 // });
 //
 // udpSocket.on("listening", () => {
 //   const address = udpSocket.address();
 //   console.log(`Server listening ${address.address}:${address.port}`);
 // });
 udpSocket.on("message", (buf, rinfo) => {
   try {
     const response = createDNSHeader(buf);
     udpSocket.send(response, rinfo.port, rinfo.address);
   } catch (e) {
     console.log(`Error receiving data: ${e}`);
   }
 });
 
 udpSocket.on("error", (err) => {
   console.log(`Error: ${err}`);
 });
 
 udpSocket.on("listening", () => {
   const address = udpSocket.address();
   console.log(`Server listening ${address.address}:${address.port}`);
 });