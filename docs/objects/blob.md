---
sidebar_position: 1
---

# Blob

A Blob object in Git represents the raw content of a file. It is the simplest object type in Git, storing the uncompressed content of a file prefixed by a header.

## Structure of a Blob Object

### Header

The header of a Blob object consists of:

1. **Object Type**: Always `blob`.
2. **Size**: The size of the file content in bytes.
3. **Null Byte Separator**: A null byte (`\x00`) separating the header from the content.

### Content

The main body contains the raw, uncompressed file content. The structure can be represented as:

```
blob <size>\x00<content>\x00
```

### Notes on Size Calculation

* The header title (`blob`) and the final null byte **do not count** towards the total size.
* The first null byte (`\x00`) **is included** in the size calculation.

### Example

Given a file with the content:

```
Run, Forrest, run!
```

The Blob object would appear as:

```
blob 19\x00Run, Forrest, run!\x00
```

### Compression

Like all objects in Git, the Blob content is compressed using the zlib algorithm before being stored. This compression reduces the storage size and ensures efficient data management.

## Key Characteristics of Blob Objects

1. **Raw Content Storage**: Unlike Tree or Commit objects, Blob objects do not include metadata such as filenames or directories.
2. **Uniqueness via SHA-1**: Each Blob is identified by a SHA-1 hash generated from its content and header. This ensures content integrity and prevents duplication.
3. **Independence from Filesystem**: Blobs store only the content of files, allowing Git to track changes to file content without being affected by file renames or moves.

## Decoding a Blob Object

To interpret a Blob object:

1. **Extract the Header**:
   * Identify the object type (`blob`).
   * Determine the size of the content.
2. **Parse the Content**:
   * Read the file content following the header.
3. **Handle Compression**:
   * Decompress the content if reading directly from a Git repository.

By adhering to this structure, Git ensures efficient storage and accurate tracking of file contents across versions.

