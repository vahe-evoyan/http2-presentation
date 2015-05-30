## Introduction

Hello, my name is Vahe and I welcome you to detailed presentation of the new HTTP/2 protocol. Let me introduce myself first, why am I interested in HTTP/2 and why should you either.

I work as a Lead SW Engineer at Instigate Mobile, mostly web development oriented. Actively participate and help organizing OWASP project in Armenia (Open Web Application Security Project if you are not familiar with). The interest to all new technologies and particulary to anything related to security is a big hobby of mine, so I couldn't miss the HTTP/2 spec finalization.

## WHY HTTP/2?

I will go ahead and do a small spoiler right at the beginning. This is a comparison of HTTP and HTTPS protocol performances. At first sight HTTPS should be slower, as takes much time for encryption. Please note that the data (images) is coming from the local virtual machine, so the demonstration should be as precise as possible, though there still are a lot of factors why we can't see much more significant difference. Let's run the demo aand see what happens.

The page consists of two IFrames with identical content. Same large number of images generated inside each page. The result we are expecting to have is to see HTTPS ends loading earlier.

Q: Anyone can guess why the HTTPS is faster?

## IT'S ALL ABOUT PERFORMANCE

As you can guess, today's talk is all about performance and the main reason we speak about HTTP/2 is it brings a lot of improvements for shorter page load time.

## TCP INTRODUCTION

Before getting to the main point of today's talk I would like to start from the very core aspects of networking in Web. Let's talk about TCP protocol. I believe many of you know and understand the protocol well, but still there are some points I would like to highlight before moving further.

The Browser in order to start trasmitting data back and forth, opens a TCP connection with the server. This is done according to scheme presented in the flow chart.

  - Browser sends a SYN packet to the server, asking to synchronize. Syncronization is important in TCP protocol to keep track of the packets sent/received in correct order and none of them is lost.
  - Server receives the SYN packet and responds with SYN-ACK, confirming that it is synchronized now and asking if the client got the confirmation.
  - Browser responds with ACK packet acknowleging that it received the response.
  
Only after the handshake Browser will send a data through the TCP channel. This ound trip takes a significant time and makes websites very slow.

But not only round trip makes the protocol slow. Have you ever thought why when you download things they start with less speed and then very quickly get almost to the maximal available speed of the connection? TCP protocol is designed in a way that it starts with a minimal size of a window and increases exponentially after each ACK. This is a great feature, but when you have more than one TCP connection, opening each new one will need to speed up to the maximum.

## HTTP 1.0

Why we need multiple TCP connections you'd ask. HTTP 1.0 - the greatest protocol ever has performace issues and in order to minimize the page load time, browsers started to open multiple TCP connections to the servers. Currently most modern browsers operate with 6 simultaneous connections with a single server.

HTTP 1.0 in 1995 almost had all the semantics of the HTTP we know and use now. And the most problematic one - it is sequential.

## HTTP 1.1

Couple of years later HTTP 1.1 comes adding some cool features in the protocol. Some of them come to solve also the performance issues.

  - **OPTIONS method** : a way for a client to learn about the capabilities of a server without actually requesting a resource.
  - **Advanced caching** : besides the simple `Pragma: no-cache` header it may include an `If-Modified-Since` header in a request for the resource, specifying the value given in the cached response's `Last-Modified` header.
  - **Range requests** : downloading via HTTP becomes more convenient, as it allows getting a resource from a specified byte.
  - **Compression algorithms** : the data can be encoded with different set of compressions like gzip or deflate.
  - **Pipelining** : Let's see it in more detail...
  
## HOL Blocking

HTTP pipelining is a solution to HTTP's sequential behavior. The client sends multiple requests and waits for a response for all of them. The idea was not well designed and failed to be implemented because of the Head Of Line Blocking. In the diagram, if the first response halts beacause of an unknown reason (server overload etc.) all the rest will wait till the first is not done.

## TOTAL TRANSFER SIZE AND TOTAL REQUESTS

All I have told can be proved by numbers. In the plot we see the average transfer size of the webpage and number of requests made to load the page.

As you can see both are increasing dramatically. Note that we were talking about only 6 connections to the server, so how it is increased to 98? Ofcouse this is not the number of parallel connections, but there is a way to get much more TCP connections open in the Browser than 6.

## WORKAROUNDS

Everything is very bad :) but engineers do their work and improve the performace with current HTTP 1.1. Let's see how.

### Spriting

To load less resources from the server all the image files are merged together into a one large sprite. This minimizez the number of round trips for each image. The images are then positioned using CSS across the pages and HTML elements.

### Inlining

In order not to load images one by one, some engineers base 64 encode the images and inline into CSS files. Inlining can be generalized by using CSS and JS right in the main HTML file. Of course the inline code usually is generated by an automated build system using Grunt or Gulp.

### Concatenation

Same build systems and task runners are used to merge all the JS files into one big script file with minified and uglified content. Same is applicable for CSS and HTML templates for the single page application.

### Sharding

This is a workaround over the 6 connection per origin policy of the browsers. Web applications distribute their resources on different subdomains, which allows loading them simultaneously.

## SPDY

OK. Enough about workarounds and bad performance. I believe many of you know what the SPDY is. It was founded by Google on 2009 to decrease the page load time. The goal was to keep the HTTP semantics, so the webpage developers wouldn't need to change their content, and redice the page load time by 50%.

SPDY introduces a really cool technology including *compression*, *multiplexing*, *prioritization*, ...

But wait! We will talk about all of this a bit later, in the scope of HTTP/2. Yes, HTTP/2 is based on SPDY 4.0 with minor changes. There are some important point to mention for SPDY though.

#### Binary protocol

It was implemented as a binary wrapper for the HTTP 1.0. Having a binary protocol makes the packet sniffing a bit more complicated, but tools like Wireshark already support not only SPDY, but HTTP/2.0 as well. We will go deeper into how it is implemented a bit later, but this is the main change in the protocol, which allows such a huge improvement.

#### TLS only

SPDY was implemented for SSL/TLS only and not only for security reasons. To understand why, let's go through SSL basics.

#### Next Protocol Negotiation


## TLS introduction

And yet another three way handshake. We already talked about the TCP handshake and we see it in the diagram. The next thing that comes in the HTTPS protocol is the TLS tunnel, which is set-up through another three-way handshake where client and the server negotiate on the encryption algorithm they are going to use and exchange the session keys.

What SPDY does is - it uses the TLS negotiation phase to decide the protocol version as well (SPDY vs HTTP 1.1). This is called Next Protocol Negotiation and it basically allows falling back to older versions of protocol.


## HTTP/2

Finally, we get into the main topic for today. HTTP/2, as said earlier, inherits the most of it's features from SPDY and binary protocol is one of them. TLS protocol is optional here, though Firefox and Google are not going to support HTTP/2 without TLS.

Next Protocol Negotiation is renamed to ALPN, which is independent from TLS and works for the non-encrypted connection as well.

## Multiplexing

So what binary framing actually allows? Multiplexing is the most major part of the protocol. Now the client is connected to the origin with a single connection.

  - All communication is performed over a single TCP connection that can carry any number of bidirectional streams. 
  - Each stream has a unique identifier and optional priority information that is used to carry bidirectional messages. 
  - Each message is a logical HTTP message, such as a request, or response, which consists of one or more frames. 
  - The frame is the smallest unit of communication that carries a specific type of data — e.g., HTTP headers, message payload, and so on. Frames from different streams may be interleaved and then reassembled via the embedded stream identifier in the header of each frame.
  
## Prioritization

Streams are prioritized using weights. Each stream has a weight, a number from 1..256 which defines it's priority. These streams also have references to each other building a tree of dependencies.


## Server push

Let's fall back a bit a remember how the browser requests for the resources. First thing is to get the main HTML page, which then is parsed for the rest of resources like images, stylesheets, scripts etc. These are requested only after the main HTML page is loaded and parsed by the browser.

Now, imagine that the server is smart enough to send you all these resources beforehand. Isn't it amazing? The way it works is server itself parses the content it sends and sends *PROMISE* frames to the client, for each resource it thinks would be used by the client. The client can accept or reject by responding with the *RESET* frame.

Note that this is impossible to implement with the HTTP 1.1. To reset the incoming connection, yet another three way handshake is required for TCP protocol (FIN - FIN:ACK - ACK).

## Header compression

Another great feature for the HTTP/2, which again is not possible with HTTP 1.1 is the header compression called HPACK. This becomes possible because of the binary protocol.

In HTTP 1.1 the compression is not possible because of the headers being in different contexts. Each request has approximately 500-800 bytes of overhead.

To reduce this overhead and improve performance, HTTP/2 compresses request and response header metadata using the HPACK compression format that uses two simple but powerful techniques:

  - It allows the transmitted header fields to be encoded via a static Huffman code, which reduces their individual transfer size.
  - It requires that both the client and server maintain and update an indexed list of previously seen header fields (i.e., establishes a shared compression context), which is then used as a reference to efficiently encode previously transmitted values.
