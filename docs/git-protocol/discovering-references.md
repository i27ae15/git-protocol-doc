---
sidebar_position: 2
---

# 1. Discovering References

The first step on the git protocol is to stablish the tell the server side tha will want to know the state of git
at their end, we do this by making a `get` request to the server.

We can achieve this by request the reference to the following url: `/info/refs?service=git-upload-pack`.

There are some other parameters that can be sent in other to request more information, please refers to the technical
documentation on git.

This will make git send the reference file, where we will have some sort of information of the current state.

### Example:

```
0000015547b37f1a82bfe85f6d8df52b6258b75e4343b7fd HEADmulti_ack thin-pack side-band side-band-64k ofs-delta shallow deepen-since deepen-not deepen-relative no-progress include-tag multi_ack_detailed allow-tip-sha1-in-want allow-reachable-sha1-in-want no-done symref=HEAD:refs/heads/master filter object-format=sha1 agent=git/github-8e2ff7c5586f
```

The most important piece of information we can obtain here is the head sha1, which is:

```
SHA1_HEAD = 47b37f1a82bfe85f6d8df52b6258b75e4343b7fd
```

This is the sha1 pointing to the head pack file.