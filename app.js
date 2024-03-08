const SMTPServer = require("smtp-server").SMTPServer;
const simpleParser = require("mailparser").simpleParser;

const server = new SMTPServer({
  onConnect: (session, callback) => {
    console.log("Client connected:", session.remoteAddress);
    callback(); // Accept the connection
  },
  onMailFrom: (address, session, callback) => {
    console.log("Message from:", address.address);
    callback(); // Accept the address
  },
  onRcptTo: (address, session, callback) => {
    console.log("Message to:", address.address);
    callback(); // Accept the address
  },
  onData: (stream, session, callback) => {
    simpleParser(stream, {}, (err, parsed) => {
      if (err) {
        console.error("Error parsing mail:", err);
      } else {
        console.log("Parsed mail:", parsed);
      }
    });
    stream.on("end", callback);
  },

  disabledCommands: ["AUTH"],
});

server.listen(465, "localhost", () => {
  console.log("SMTP Server is running at localhost:465");
});
