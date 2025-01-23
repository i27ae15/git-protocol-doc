---
sidebar_position: 3
---

# 2. Git-Upload Service

At this point we have in our power, the sha1 that corresponds to the head pack file, now is time to request git to return it for us,
for this we will use the `git-upload` service.

The way git works is by a simple `want` - `have` way of communicating, as simple as, we tell git what we `want` and we must le it know
what we already `have`.

We make this request to `.git/git-upload-pack` where the body of the object will have the following structure:

```
C: 0032want <want #1>...............................\x0A
C: 0032want <want #2>...............................\x0A
....
C: 0032have <have #1>...............................\x0A
C: 0032have <have #2>...............................\x0A
....
C: 00000009 done\x0A
```

### Important to note
* Each line must be separated by a blank line.
* The contest must be terminated by a blank line after the `done` word.
* Content-type in the headers must be: `Content-Type: application/x-git-upload-pack-request`.

An example response looks like this:

```
0008NAK\x0A
PACKL�x��̱n� Н���Rt`�TU�2d�/� ...
```

Where we get the pack file compressed with the z-lib algo.

if you are asking why the why do we `NAK` if the communication was a succeed here is the answer:

The `0008NAK` is part of the Git protocol's negotiation phase. It indicates that the server did not find any common commits between the client
and the server for the requested references. This often happens during an initial clone or when the client doesn't have any objects yet.

At this point, we have all to start processing the pack file.

