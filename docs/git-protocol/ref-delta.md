---
sidebar_position: 6
---

# 5. Parsing REF_DELTA

It's time to talk about a new object, the `REF_DELTA`; this objects objective is designed to minimize storage requirements by referencing existing data instead of storing duplicate content.

First, let's understand how the `REF_DELTA` object is structured:

## REF_DELTA Structure

Taking out the object header, the `REF_DELTA` body is separated in 3 parts:

1. **SHA1 Reference:** The SHA1 that is the reference to the object we want to work with (in raw bytes).
2. **Source and Target Size:** Specifies the sizes of the referenced object (source) and the final object after applying the delta (target).
3. **Instructions:** A series of `COPY` and `ADD` commands that reconstruct the object from the referenced data.

Here is an example of a `REF_DELTA` object:

```
< bytes >
49 a6 dd 7a 7f 92 b9 42 53 49 d3 78 49 a3 29 49 f9 92 93 a9
< bytes >

< z_lib compressed >

30 03 - Encoded source size: 0x30.
50 01 - Encoded target size: 0x50.

...............................................................................

c0 00 04     - COPY
12 34 ab cd  - ADD

< z_lib compressed >

```

Les see one by one:

### Part 1: SHA1 Reference

This is just the SHA1 that the `REF_DELTA` is referencing, so, in other words, this is
what tells us which object we want to take the data from.

:::note
This SHA1 could be referencing a Blob, Commit or Tree object.
::::

### Part 2: Source and Target Size

The source size represents the size of the referenced object, while the target size is the size of the object after applying all the `COPY` and `ADD` instructions.

Both sizes are encoded similarly to the size in an object header, the only difference
is that the size is withing bits `6-0`, not `3-0` and still, the MSB indicates
continuation, the steps are the same:

1. Extracts bits `6-0`.
2. Combine them to the size.
3. Check for the MSB to see if the next byte is part of the current size.
4. In case it is, shift the necessary bits by `7N` where `N` first value is `0`.

### Part 3: Instructions

In a `REF_DELTA` object we have two type of instructions:

1. **COPY:** Copies data from the referenced object based on a specified offset and size.
2. **ADD:** Inserts literal data into the object.

Where the first bit indicates the type of the command, `1` for `COPY`, `0` for `ADD`.

:::note
Have in mind that there could be many `COPY` or many `ADD` command together, for example
::::

```
            This is valid:  | This is also valid | And also this is valid

               `COPY`                `COPY`                 `ADD`
               `ADD`                 `COPY`                 `ADD`
               `COPY`                `COPY`                 `ADD`
               `ADD`                 `ADD`                  `COPY`
               .....                 .....                  .....
```

#### COPY

This instructions tell us to go to the file referenced by the SHA1 and `COPY X` values from it starting at `OFFSET Y`, the
encoding goes as follow

- **Bits 6-4:** Specify the size to copy.
- **Bits 3-0:** Specify where to start copying (offset).

The bits indicates the number of bytes that correspond to the offset (max of 4 bytes) and the bytes that are part of the size, and also the amount to be shifted by. This sounds complicated but is not. Let me explain:

Let's say we have the byte `\xD6` which in binary equals `1101 0110`, the first thing to do is to check the MSB to see if this
is equal to `1` or `0` (or check if the byte is bigger than `127`), which in this case, we easily see that it equals to `1`
indicating a `COPY` command, so let's parse the bits `6 - 4` that indicate the size.

By checking at bits `6 - 4` we get the following value `101`, telling us that the following 2 bytes are part of the size, other
examples for the bits `6 - 4` could be:

* `100` : The following byte is part of the size.
* `010` : The following byte is part of the size.
* `001` : The following byte is part of the size.
* `011` : The following 2 bytes are part of the size.
* `111` : The following 3 bytes are part of the size.

Now, I guess you are wondering "Well what is the difference between the first three examples? The three of them are saying that
only the next byte is part of the size. Or what is the difference between `011` and `101` they both seem to indicate that the next
2 bytes are part of the size".

The answer to this questions is "the position refers to the shifting of that byte":

* `100` : The following byte is part of the size.
* `010` : The following byte is part of the size & should be shifted by `8`.
* `001` : The following byte is part of the size & should be shifted by `16`.

And the same goes for two or three 1s and for the offset as well. This allows GIT to be able to make copies from files as big as
`4,294,967,295` (max value for `32uint_t`) characters long or about `~4 GB`, in chunks of max `16,777,215` characters which is
`~16 MB`.

Following our example where we have `101`, two bytes for the size, and `0110`, two bytes for the offset:

```
NEXT_BYES :  BYTE_0 (SIZE)  -  BYTE_1 (SIZE)  -  BYTE_2 (OFFSET)  -  BYTE_3(OFFSET)
               SHIFT(16)         NO_SHIFT           SHIFT(16)           SHIFT(8)
```

Once having this, we are good to start copy from the indicated `offset` until the indicated `size`.


#### ADD

The `ADD` command is pretty straight forward, we just need to read the lower 7 bits (a maximum of 127 characters) which are the size of the content to copy, content that start on the next byte.
Let’s say you encounter this in the delta stream:

##### Breakdown:

1. **Tag Byte `7F`:**
   - MSB = `0` → Indicates an `ADD` command.
   - Lower 7 bits = `0x7F` → Specifies that **127 literal bytes** follow this tag.

2. **Literal Bytes:**
   - Immediately after the tag byte, 127 bytes of data are added.
   - For example:
     ```
     48 65 6C 6C 6F 20 77 6F 72 6C 64 21
     ```
     - Interpreted as ASCII: `Hello world!`

If you need to add more than **127 bytes** of literal data, Git uses **multiple consecutive `ADD` commands**. For example:

```
7F <127 bytes of data> 7F <127 bytes of data> ...
```

#### Key Points:
- Each `ADD` command is limited to **127 bytes** because the tag byte only has 7 bits to encode the length.
- For larger additions, split the data into chunks, each preceded by its own `ADD` tag.
