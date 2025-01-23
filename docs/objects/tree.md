---
sidebar_position: 2
---

# Tree

A Tree object in Git represents a directory. Its contents include other tree objects and blob objects, allowing Git to keep track of the names and hierarchical structure of files and folders in a project.

## Structure of a Tree Object

A Tree object is structured as follows:

1. **Object Type**: Always `tree`.
2. **Size**: The size of the file content in bytes.
3. **Null Byte Separator**: A null byte (`\x00`) separating the header from the content.
4. **Content**: The main body containing the file structure.
5. **Null Byte Terminator**: A null byte indicating the end of the content.

## Body

The body of the tree file is formatted as follows:

```<fileType> <fileName>\x00<sha1Bytes>\x00```

### Notes on Size Calculation

* The header title (`blob`) and the final null byte **do not count** towards the total size.
* The first null byte (`\x00`) **is included** in the size calculation.

### Key Details

* **SHA-1 Representation**: The SHA-1 is stored as raw bytes rather than as a hexadecimal string.
* **Continuous Data**: There is no explicit separation between each TreeLine; the next `fileType` directly follows the SHA-1 of the previous entry.
* **File Types**: There are four file types commonly used:
  * `100644`: Regular file (blob).
  * `100755`: Executable file (blob).
  * `040000`: Directory (tree) (although having this 0 at the beginning, must of the time this is dropped of the mode).

## Example of a Tree File

A tree object might appear as:

```
tree 122\x00100644file1.txt\x00<20-byte SHA-1>100755script.sh\x00<20-byte SHA-1>040000subdir\x00<20-byte SHA-1>\x00
```

### Readable Breakdown

For clarity, the example above can be visualized as:

```
tree 122\x00
100644 file1.txt\x00<20-byte SHA-1>
100755 script.sh\x00<20-byte SHA-1>
040000 subdir\x00<20-byte SHA-1>
```

However, it is crucial to understand that:

1. **No Line Separators**: The data is stored as a continuous stream without line breaks.
2. **Separations**: The only actual separator (`\x20`) is the space between the title (`tree`) and the size of the content.

## Decoding the Tree Object

To interpret a Tree object:

1. **Read the Header**: Identify the object type (`tree`) and content size.
2. **Parse the Body**:
   * Extract each file entry based on the file type, file name, and SHA-1.
   * Use the null bytes as markers to differentiate between components.

This structure ensures Git's ability to efficiently manage project directories and maintain their integrity through the SHA-1 hashes for version tracking.

