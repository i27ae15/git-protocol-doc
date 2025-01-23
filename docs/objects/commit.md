---
sidebar_position: 3
---

# Commit

A Commit object in Git represents a snapshot of the repository's state. It is stored as a binary blob in the Git object database and links to its corresponding Tree and parent commits (if any).

## Structure of a Commit Object

### Header

The header contains:

1. **Object Type**: Always `commit`.
2. **Size**: The size of the file content in bytes.
3. **Null Byte Separator**: A null byte (`\x00`) separating the header from the content.

### Body

The body of a Commit object is structured as follows:

1. **Tree Line**: Links the commit to the Tree object representing the directory structure: `tree <tree_hash>`

2. **Parent Line(s)** (if any): Links to the parent commit(s). For merge commits, there will be one line per parent: `parent <parent_hash>`

3. **Author Line**: Specifies the name, email, timestamp, and timezone of the commit's author: `author <name> <email> <timestamp> <timezone_offset>`

4. **Committer Line**: Similar to the author line but refers to the person who committed the changes: `committer <name> <email> <timestamp> <timezone_offset>`

5. **Blank Line**: A single blank line (`\x0A`) separates the metadata from the commit message.

6. **Commit Message**: Contains the description of the changes made in this commit.

7. **Null Byte Terminator**: A null byte (`\x00`) marking the end of the commit object.

## Important Notes

- **Line Separation**: Each metadata line ends with a newline character (`\x0A`), except for the commit message.
- **Spaces in Metadata**: There are spaces between elements in the metadata (e.g., between the author’s name and email).
- **Blank Line Placement**: A blank line is required before the commit message.

## Example Commit Object

An example commit object might look like this:

```
commit 210\x00tree b4d2d0140eae40e6f7f6503aa4eb7a7330379bf9\x0A
parent 8c4d92b5dcb71e928f662b3b5de8219a8cb61ff0\x0A
author Linus Torvalds <linus.torvalds@linux.com> 1587032664 +0530\x0A
committer Linus Torvalds <linus.torvalds@linux.com> 1587032664 +0530\x0A
\x0A
Your code is trash\x00
```

### Readable Breakdown

For better understanding, the commit can be visualized as:

```
commit 210\x00

tree b4d2d0140eae40e6f7f6503aa4eb7a7330379bf9
parent 8c4d92b5dcb71e928f662b3b5de8219a8cb61ff0
author Linus Torvalds <linus.torvalds@linux.com> 1587032664 +0530
committer Linus Torvalds <linus.torvalds@linux.com> 1587032664 +0530

Your code is trash
```

### Details to Note

1. **Tree Hash**: Links to the exact state of the directory.
2. **Parent Commit Hash**: Ensures the continuity of the commit chain.
3. **Timestamps and Timezone**: Provide temporal context for the commit.
4. **Commit Message**: Summarizes the purpose of the commit.

## Decoding a Commit Object

To decode a commit object:

1. **Read the Header**:
   - Extract the object type (`commit`).
   - Determine the size of the content.

2. **Parse the Body**:
   - Extract the tree hash, parent hash(es), author, and committer information.
   - Identify the commit message after the blank line.

3. **Validate the Structure**:
   - Ensure proper line breaks and separators are present.

By maintaining this structure, Git ensures each commit accurately represents the repository state, enabling precise version control and traceability.


