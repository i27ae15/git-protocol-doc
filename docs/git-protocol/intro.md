---
sidebar_position: 1
---

# GIT-Protocol

This section will talk about how the git smart protocol works and the steps that are needed to be implemented.
Following what can be seen in [codecrafters](https://app.codecrafters.io/courses/git/introduction).

This section will be separated in two, the one that has all the theory but no code, in case
you don't want any help during the protocol implementation at the end, and another one that will
have the code (written in C++) in case you would like to take a look.

Also, please, if you would like to contribute to this documentation by writing the code in other
languages or by adding more information feel free to create a PR to the [repository]("https://github.com/i27ae15/git").

Some links that you might find helpful:

* https://www.git-scm.com/docs/http-protocol
* https://github.com/git/git/blob/795ea8776befc95ea2becd8020c7a284677b4161/Documentation/gitprotocol-pack.txt
* https://github.com/git/git/blob/795ea8776befc95ea2becd8020c7a284677b4161/Documentation/gitformat-pack.txt
* https://codewords.recurse.com/issues/three/unpacking-git-packfiles
* https://medium.com/@concertdaw/sneaky-git-number-encoding-ddcc5db5329f
* https://stackoverflow.com/questions/68062812/what-does-the-git-smart-https-protocol-fully-look-like-in-all-its-glory