const SMTPServer = require('smtp-server').SMTPServer;   
const server = new SMTPServer({
        onConnect(session, callback) {
            console.log('Connected to the server', session.id);
             callback();
        },
        onMailFrom(address, session, callback) {
            console.log('Mail from:', address.address, session.id);
            callback();
        
        },
        onRcptTo(address, session, callback) {
            console.log('Mail to:', address.address, session.id);
            callback();
        },
        onData(stream, session, callback) {
            console.log('Data', session.id);
            stream.pipe(process.stdout);
            stream.on('end', callback);
        },
        onClose(session) {
            console.log('Session ended', session.id);
        }

});

server.listen(25,()=>{
    console.log('Server is running on port 25');
});