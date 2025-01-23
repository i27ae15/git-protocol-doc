---
sidebar_position: 5
---

# 4. Object Header

<div class="justified-text">

In the pack file, each object includes a header that indicates two key pieces of information:

1. **The type of the file object:**
* COMMIT = 1
* TREE = 2
* BLOB = 3
* TAG = 4
* OFS_DELTA = 6
* REF_DELTA = 7

2. **The size this object takes in the pack-file**
* This represents the **uncompressed** size, not the **compressed** one! This is helpful because we can tell z-lib to allocate the correct amount of memory for
decompression.

### Structure of the Headers

The header data is packed into bytes as follows:
- **Bits 6-4**: Store the object type.
- **Bits 3-0**: Store the size.

The size field can extend across multiple bytes if the Most Significant Bit (MSB and
will refer as it now on) of a byte is set to `1`, indicating continuation for the size.

If you're unfamiliar on how packing, here is an explanation:

### Extracting the Object Type

For extracting the `type` the bits `6-4` must be checked, this can be done by:

1. Shifting the byte 4 bits to the right.
2. Look for a byte that has `111` at the right most bits.
3. Use the `AND (&)` operator to isolated the bits `6 - 4` which now are going to be in position `2-0`


### Example:

Consider the header byte `\xDE` (`1101 1110` in binary). The bits `101` represent the type, so these are the one we want to isolate; the byte `\x07` can helps us do this,
since its binary is `0000 0111`, thus we can simply make an `AND` operation after shifting by 4, so we get the correct value:

```cpp
BYTE = 0xDE;  // 1101 1110
BYTE >> 4;    // 0000 1101
```

Now, we are good to perform the `AND` operation:

```
BYTE & \x07

\xDE   : 0000 1101 &
\x07   : 0000 0111
RESULT : 0000 1101
```

And if we convert the result into decimal we get that the value for our type is `3` which corresponds to a `BLOB` object.

Now, that we have covered the type, is time to look at the size of the object, the size tha its uncompressed values occupy.

For this, we have to look in the same byte, but bits `3 - 0`, we can simply extract it with the `AND` operator with a byte that has all its 1s at the right most part, for example we can use `\x0F`.

```
BYTE : 1101 1110 (\xDE)

\xDE & \x0F

\xDE   : 1101 1110 &
\x0F   : 0000 1111
RESULT : 0000 1110
```

Which converted to decimal gives us `14`.

So, perfect right? we have our `type` a blob object, and the size of this blob object, `14`, we are good to go! Well not
that fast, because there could be more data corresponding to the size in the next byte, which is encoded in the `MSB`, so
in order to check if we are good to start reading the blob or if we have to increase the size, we have to check it. This
could be done in two ways, either we check the `MSB` directly with an `AND` operation or we check if the byte is bigger
than `127`. In this case, we can see that in the current byte `1101 1110` its MSB is `1` indicating that the next byte in
the stream is also part of the size. Let's take a look.

The next byte we see that is `1110 0110` or `\xE6`, this time, the bits `6 - 0` are for the size, and the MSB still tell
us if the next byte is part of the size or not. How do we add this size? Simply, just combining it to our current size:

```
SIZE = 0000 1110 (\x0E)

\x0E | \xE6

\x0E : 0000 1110 |
\xE6 : 1110 0110
SIZE : 1110 1110
```

And this converted to decimal equals `238`, and again, the MSB tells us that there is more. But, you can notice that
`255` was possible to be reached just in this step, and we cannot add more than `255` in one byte, so what do we do? We
shift the next byte, not by 8, but by 7, why 7 ? Because the MSB is not part of the size, so we cannot count it.

We check and the next byte is `1001 1111`, we do the same procedure, but before combining it to our current size, we shift
it by 7 positions.

```
BYTE = 1001 1111 (\x9F)

BYTE << 7
BYTE = 0100 1111 1000 0000
       ^          ^......^ These are the bytes shifted
       Adding a zero
       here to better
       visualization
```

So, we are good to combine them:

```
SIZE = 1110 1110 (\xEE)
BYTE = 0100 1111 1000 0000 (\x4F80)

\xEE | \x4f80

\xEE   : 0000 0000 1110 1110 |
\x4F80 : 0100 1111 1000 0000
SIZE   : 0100 1111 1110 1110
```

Which converted to decimal gives : `20462`.

Perfect, checking the MSB we see that also the next byte is part of the size, so this time, instead of `7` positions, we
have to shift `14`, and so on.

```
 BYTE_0   -    BYTE_1    -    BYTE_2    -   BYTE_3     -     BYTE_N
SHIFT(0)  -   SHIFT(7)   -  SHIFT(14)   -  SHIFT(21)   -  SHIFT_(7 * N)
```

In case you need a more straightforward explanation here it is:

### Extracting the Object Size

The size is stored in bits `3-0` of the header byte. To isolate these bits:
1. Use the `AND` operator with a mask (`0x0F` in hexadecimal, `0000 1111` in binary).

#### Example:

From the same byte `\xDE`:

```cpp
BYTE = 0xDE;  // 1101 1110
BYTE & 0x0F;  // 0000 1110 (size = 14)
```

The result is `14` (the uncompressed size of the object).

### Handling Multi-Byte Sizes

If the MSB of a byte is `1`, it indicates that the size continues into the next byte. To handle this:
1. Extract the current size bits (`6-0`) by masking with `0x7F` (`0111 1111` in binary).
2. Check the MSB to determine if there is another byte.
3. If there is, shift the next byte’s bits by `7` positions (for the first additional byte) and combine it with the current size using the `OR` operator.

#### Example:

Let’s say the size spans three bytes:
- First byte: `\xDE` (`1101 1110`)
- Second byte: `\xE6` (`1110 0110`)
- Third byte: `\x9F` (`1001 1111`)

Step-by-step calculation:

1. Extract the size from the first byte:

```cpp
SIZE = 0x0E;  // 0000 1110 (size from \xDE)
```

2. Combine with the second byte:

```cpp
BYTE = 0xE6;  // 1110 0110
BYTE & 0x7F;  // 0110 0110 (remove MSB)
SIZE = (SIZE | (BYTE << 7));
```

Result: `SIZE = 0xEE` (`1110 1110`, decimal `238`).

3. Combine with the third byte, shifted by 14 positions:

```cpp
BYTE = 0x9F;  // 1001 1111
BYTE & 0x7F;  // 0001 1111
SIZE = (SIZE | (BYTE << 14));
```

Result: `SIZE = 0x4FEE` (`0100 1111 1110 1110`, decimal `20462`).

4. Continue this process for additional bytes, shifting each subsequent byte by `7` more positions than the last:

```
 BYTE_0    -    BYTE_1    -    BYTE_2    -    BYTE_3    -    BYTE_N
SHIFT(0)   -   SHIFT(7)   -  SHIFT(14)   -  SHIFT(21)   -  SHIFT_(7 * N)
```

</div>
