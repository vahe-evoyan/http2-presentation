# TCP Introduction

### Three-way handshake

![Handshake](slides/images/tcp.png)

### TCP slow start

Note:

Before getting to the main point of today's talk I would like to start from the
very core aspects of networking in Web. Let's talk about TCP protocol. I
believe many of you know and understand the protocol well, but still there are
some points I would like to highlight before moving further.

The Browser in order to start transmitting data back and forth, opens a TCP
connection with the server. This is done according to scheme presented in the
flow chart.

  - Browser sends a SYN packet to the server, asking to synchronize.
    Synchronization is important in TCP protocol to keep track of the packets
    sent / received in correct order and none of them is lost.
  - Server receives the SYN packet and responds with SYN-ACK, confirming that
    it is synchronized now and asking if the client got the confirmation.
  - Browser responds with ACK packet acknowledging that it received the
    response.

Only after the handshake Browser will send a data through the TCP channel. This
round trip takes a significant time and makes websites very slow.

But not only round trip makes the protocol slow. Have you ever thought why when
you download things they start with less speed and then very quickly get almost
to the maximal available speed of the connection? TCP protocol is designed in a
way that it starts with a minimal size of a window and increases exponentially
after each ACK. This is a great feature, but when you have more than one TCP
connection, opening each new one will need to speed up to the maximum.
