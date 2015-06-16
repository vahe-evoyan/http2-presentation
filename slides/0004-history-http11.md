# HTTP 1.1

### OPTIONS method
### Advanced caching
### Range requests
### Compression algorithms
### Pipelining

Note:

Couple of years later HTTP 1.1 comes adding some cool features in the
protocol. Some of them come to solve also the performance issues.

  - **OPTIONS method** : a way for a client to learn about the capabilities of
    a server without actually requesting a resource.
  - **Advanced caching** : besides the simple `Pragma: no-cache` header it may
    include an `If-Modified-Since` header in a request for the resource,
    specifying the value given in the cached response's `Last-Modified` header.
  - **Range requests** : downloading via HTTP becomes more convenient, as it
    allows getting a resource from a specified byte.
  - **Compression algorithms** : the data can be encoded with different set of
    compressions like gzip or deflate.
  - **Pipelining** : Let's see it in more detail...


## HOL Blocking

![HTTP Pipelining](slides/images/hol.png)

Note:

HTTP pipelining is a solution to HTTP's sequential behavior. The client sends
multiple requests and waits for a response for all of them. The idea was not
well designed and failed to be implemented because of the Head Of Line
Blocking. In the diagram, if the first response halts because of an unknown
reason (server overload etc.) all the rest will wait till the first is not
done.


## Total Transfer Size and Total Requests

<div id="chart"></div>

Note:

All I have told can be proved by numbers. In the plot we see the average
transfer size of the web page and number of requests made to load the page.

As you can see both are increasing dramatically. Note that we were talking
about only 6 connections to the server, so how it is increased to 98? Of course
this is not the number of parallel connections, but there is a way to get much
more TCP connections open in the Browser than 6.
