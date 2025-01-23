---
sidebar_position: 4
---

# 3. Pack Header

<div class="justified-text">

After we have received the pack file, we can see that this is separated in three parts

```
< Header >
< Content - Compressed using Z-lib>
< Tail >
```

We must, of course, start by parsing the header, which is very straight forward.

The first 4 bytes correspond to the `version` and the last 4 bytes correspond to the number of objects the pack file have, these bytes must be converted from a `uint32_t` to a `uint64_t`, by a process called `byte order conversion`, this case with Big-Endian.

Here is an explanation in how to do it in case you are not familiar whit this.

#### Step 1: Shifting a Single Byte
Suppose we have the following hexadecimal value `\x7F`, which can be represented in binary as `0111 1111`. This value corresponds to the decimal number `127`.

- To convert `\x7F` into 16 bits (2 bytes), we will do it is by shifting `8` bits into it: `\x7F << 8`, making `\x7F` move 8 bits to the left, ending up with:
  - Hexadecimal: `\x7F00`
  - Binary: `0111 1111 0000 0000`
  - Decimal: `32512`

- To further convert it into 32 bits, shift the result by 16 bits: `\x7F00 << 16`. This results in:
  - Hexadecimal: `\x7F00 0000`.
  - Binary: `0111 1111 0000 0000 0000 0000 0000 0000`
  - Decimal: `2130706432`

#### Step 2: Combining Multiple Bytes

So, this is for one number, what if we have more than one and we want to combine them? As, in fact, is our case. The answer is simply, we can use the `OR` operator to combine these bits, so, let's say we have the following 4 bytes as part the pack `version` :

```
BYTE_0 = 0x12  = 0001 0010
BYTE_1 = 0x34  = 0011 0100
BYTE_2 = 0x56  = 0101 0110
BYTE_3 = 0x78  = 0111 1000
```

And remember we want the bytes to be by Big-Endian, meaning that the bytes must end-up in the following format:

```
bits = 31 ......................................................... 0
          ^   BYTE_0   ^^   BYTE_1   ^^   BYTE_2   ^^   BYTE_3   ^^
```

So, to accomplish this, we have to shift like this:

```cpp
BYTE_0 << 24 = 0x12000000  // 0001 0010 0000 0000 0000 0000 0000 0000
BYTE_1 << 16 = 0x00340000  // 0000 0000 0011 0100 0000 0000 0000 0000
BYTE_2 << 08 = 0x00005600  // 0000 0000 0000 0000 0101 0110 0000 0000
BYTE_3 << 00 = 0x00000078  // 0000 0000 0000 0000 0000 0000 0111 1000
```

:::note
**Look that BYTE_3 is not shifted, it remains the same.**
:::

#### Step 3: Combining Bytes with the OR Operator

Once we have shifted our bytes, we can combine them with the `OR` operator, that will look into bits and will return 1 if either of them are 1.
for example, imagine we want to combine `1010` with `1001`, so, we will call the `OR` operator (`|`), and do `1010 | 1001`; let's go one by one to see
the result, looking on index `0`, we see that both of them are `1`, so we can write that, if we look into index `1`, we see that is `0`, so we write that, on
index `2`, we see that only one of them is one, but since this is a `OR` operation, we write `1`, and finally, at index `3`, we see that again, only one of
them is `1`, so we write it again, and thus, we end-up with the value `1011`.

```
F_VALUE : 1 0 1 0
S_VALUE : 1 0 0 1
RESULT  : 1 0 1 1
```

Understanding this, we can see clearly that the result of the `OR` operation for our 4 bytes is:

```cpp
uint32_t result = (BYTE_0 << 24) | (BYTE_1 << 16) | (BYTE_2 << 8) | BYTE_3;
```

That produces:

```
HEXADECIMAL:

BYTE_0 : 0x1200 0000
BYTE_1 : 0x0034 0000
BYTE_2 : 0x0000 5600
BYTE_3 : 0x0000 0078

RESULT : 0x1234 5678

..................................................

BINARY:

BYTE_0 : 0001 0010 0000 0000 0000 0000 0000 0000 |
BYTE_1 : 0000 0000 0011 0100 0000 0000 0000 0000 |
BYTE_2 : 0000 0000 0000 0000 0101 0110 0000 0000 |
BYTE_3 : 0000 0000 0000 0000 0000 0000 0111 1000

RESULT : 0001 0010 0011 0100 0101 0110 0111 1000
```

#### Step 4: Interpreting the Result
The result in hexadecimal (`0x12345678`) represents the decimal value `305419896`. This corresponds to the `version` or the number of objects, depending on which part of the header is being processed.


</div>