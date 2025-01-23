---
sidebar_position: 7
---

# 6. Reading Pack File

At this point, we have all the necessary components to start reading the pack file. Parsing the `OFS_DELTA` is not required to complete this stage,
so the only thing that we have to do now is putting all together.

But first, just a few points to remember:

1. **Storing Pack-File Objects:**
   All the objects included in the pack file must be written to the `.git/objects` folder.

2. **Updating the Working Directory:**
   Only the objects directly referenced by the HEAD (such as the current branch) should be written to the working directory.


A basic implementation for handling the object headers might look like this:

### Step 1: Reading the Pack File Header
The pack file begins with a header, which provides the total number of objects.

```cpp
struct PackFileHeader {
    uint32_t version;  // Pack file version, usually 2 or 3
    uint32_t numObjects; // Total objects in the pack file
};

PackFileHeader header = readPackFileHeader(&header);
```

### Step 2: Processing Each Object
Iterate through the objects, parsing their headers and processing based on their type.

```cpp
std::vector<uint8_t> packFile = getPackFile();

for (uint32_t i {}; i < header.numObjects; i++) {
    ObjectHeader objHeader {};
    readObjectHeader(&objHeader, packFile);

    switch (objHeader.type) {
        case COMMIT:
            (void)processCommit(packFile);
            break;

        case TREE:
            (void)processTree(packFile);
            break;

        case BLOB:
            (void)processBlob(packFile);
            break;

        case REF_DELTA:
            (void)processRefDelta(packFile);
            break;
    }
}
```

### Step 3: Writing to the Objects Folder
Each processed object is stored in `.git/objects` using its SHA-1 hash:

```cpp
void writeObjectToDisk(const ObjectHeader& header, const std::string& objectData) {
    std::string objectHash = calculateSHA1(objectData);
    std::string objectPath = generateObjectPath(objectHash);

    createDirectoriesIfNeeded(objectPath);
    writeToFile(objectPath, objectData);
}
```

### Step 4: Updating the Working Directory
For objects referenced by the HEAD, extract and write them to the appropriate locations in the working directory.

```cpp
void updateWorkingDirectory(const ObjectHeader& header, const std::string& objectData) {
    if (isReferencedByHead(header)) {
        std::string filePath = getWorkingDirectoryPath(header);
        writeToFile(filePath, objectData);
    }
}
```

And that should be it!