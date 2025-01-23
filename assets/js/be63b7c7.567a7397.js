"use strict";(self.webpackChunkgit_protocol=self.webpackChunkgit_protocol||[]).push([[506],{9628:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>c,contentTitle:()=>l,default:()=>h,frontMatter:()=>o,metadata:()=>i,toc:()=>d});const i=JSON.parse('{"id":"objects/tree","title":"Tree","description":"A Tree object in Git represents a directory. Its contents include other tree objects and blob objects, allowing Git to keep track of the names and hierarchical structure of files and folders in a project.","source":"@site/docs/objects/tree.md","sourceDirName":"objects","slug":"/objects/tree","permalink":"/git-protocol-doc/docs/objects/tree","draft":false,"unlisted":false,"editUrl":"https://github.com/i27ae15/git-protocol-doc/docs/objects/tree.md","tags":[],"version":"current","sidebarPosition":2,"frontMatter":{"sidebar_position":2},"sidebar":"tutorialSidebar","previous":{"title":"Blob","permalink":"/git-protocol-doc/docs/objects/blob"},"next":{"title":"Commit","permalink":"/git-protocol-doc/docs/objects/commit"}}');var r=n(4848),s=n(8453);const o={sidebar_position:2},l="Tree",c={},d=[{value:"Structure of a Tree Object",id:"structure-of-a-tree-object",level:2},{value:"Body",id:"body",level:2},{value:"Notes on Size Calculation",id:"notes-on-size-calculation",level:3},{value:"Key Details",id:"key-details",level:3},{value:"Example of a Tree File",id:"example-of-a-tree-file",level:2},{value:"Readable Breakdown",id:"readable-breakdown",level:3},{value:"Decoding the Tree Object",id:"decoding-the-tree-object",level:2}];function a(e){const t={code:"code",h1:"h1",h2:"h2",h3:"h3",header:"header",li:"li",ol:"ol",p:"p",pre:"pre",strong:"strong",ul:"ul",...(0,s.R)(),...e.components};return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(t.header,{children:(0,r.jsx)(t.h1,{id:"tree",children:"Tree"})}),"\n",(0,r.jsx)(t.p,{children:"A Tree object in Git represents a directory. Its contents include other tree objects and blob objects, allowing Git to keep track of the names and hierarchical structure of files and folders in a project."}),"\n",(0,r.jsx)(t.h2,{id:"structure-of-a-tree-object",children:"Structure of a Tree Object"}),"\n",(0,r.jsx)(t.p,{children:"A Tree object is structured as follows:"}),"\n",(0,r.jsxs)(t.ol,{children:["\n",(0,r.jsxs)(t.li,{children:[(0,r.jsx)(t.strong,{children:"Object Type"}),": Always ",(0,r.jsx)(t.code,{children:"tree"}),"."]}),"\n",(0,r.jsxs)(t.li,{children:[(0,r.jsx)(t.strong,{children:"Size"}),": The size of the file content in bytes."]}),"\n",(0,r.jsxs)(t.li,{children:[(0,r.jsx)(t.strong,{children:"Null Byte Separator"}),": A null byte (",(0,r.jsx)(t.code,{children:"\\x00"}),") separating the header from the content."]}),"\n",(0,r.jsxs)(t.li,{children:[(0,r.jsx)(t.strong,{children:"Content"}),": The main body containing the file structure."]}),"\n",(0,r.jsxs)(t.li,{children:[(0,r.jsx)(t.strong,{children:"Null Byte Terminator"}),": A null byte indicating the end of the content."]}),"\n"]}),"\n",(0,r.jsx)(t.h2,{id:"body",children:"Body"}),"\n",(0,r.jsx)(t.p,{children:"The body of the tree file is formatted as follows:"}),"\n",(0,r.jsx)(t.p,{children:(0,r.jsx)(t.code,{children:"<fileType> <fileName>\\x00<sha1Bytes>\\x00"})}),"\n",(0,r.jsx)(t.h3,{id:"notes-on-size-calculation",children:"Notes on Size Calculation"}),"\n",(0,r.jsxs)(t.ul,{children:["\n",(0,r.jsxs)(t.li,{children:["The header title (",(0,r.jsx)(t.code,{children:"blob"}),") and the final null byte ",(0,r.jsx)(t.strong,{children:"do not count"})," towards the total size."]}),"\n",(0,r.jsxs)(t.li,{children:["The first null byte (",(0,r.jsx)(t.code,{children:"\\x00"}),") ",(0,r.jsx)(t.strong,{children:"is included"})," in the size calculation."]}),"\n"]}),"\n",(0,r.jsx)(t.h3,{id:"key-details",children:"Key Details"}),"\n",(0,r.jsxs)(t.ul,{children:["\n",(0,r.jsxs)(t.li,{children:[(0,r.jsx)(t.strong,{children:"SHA-1 Representation"}),": The SHA-1 is stored as raw bytes rather than as a hexadecimal string."]}),"\n",(0,r.jsxs)(t.li,{children:[(0,r.jsx)(t.strong,{children:"Continuous Data"}),": There is no explicit separation between each TreeLine; the next ",(0,r.jsx)(t.code,{children:"fileType"})," directly follows the SHA-1 of the previous entry."]}),"\n",(0,r.jsxs)(t.li,{children:[(0,r.jsx)(t.strong,{children:"File Types"}),": There are four file types commonly used:","\n",(0,r.jsxs)(t.ul,{children:["\n",(0,r.jsxs)(t.li,{children:[(0,r.jsx)(t.code,{children:"100644"}),": Regular file (blob)."]}),"\n",(0,r.jsxs)(t.li,{children:[(0,r.jsx)(t.code,{children:"100755"}),": Executable file (blob)."]}),"\n",(0,r.jsxs)(t.li,{children:[(0,r.jsx)(t.code,{children:"040000"}),": Directory (tree) (although having this 0 at the beginning, must of the time this is dropped of the mode)."]}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,r.jsx)(t.h2,{id:"example-of-a-tree-file",children:"Example of a Tree File"}),"\n",(0,r.jsx)(t.p,{children:"A tree object might appear as:"}),"\n",(0,r.jsx)(t.pre,{children:(0,r.jsx)(t.code,{children:"tree 122\\x00100644file1.txt\\x00<20-byte SHA-1>100755script.sh\\x00<20-byte SHA-1>040000subdir\\x00<20-byte SHA-1>\\x00\n"})}),"\n",(0,r.jsx)(t.h3,{id:"readable-breakdown",children:"Readable Breakdown"}),"\n",(0,r.jsx)(t.p,{children:"For clarity, the example above can be visualized as:"}),"\n",(0,r.jsx)(t.pre,{children:(0,r.jsx)(t.code,{children:"tree 122\\x00\n100644 file1.txt\\x00<20-byte SHA-1>\n100755 script.sh\\x00<20-byte SHA-1>\n040000 subdir\\x00<20-byte SHA-1>\n"})}),"\n",(0,r.jsx)(t.p,{children:"However, it is crucial to understand that:"}),"\n",(0,r.jsxs)(t.ol,{children:["\n",(0,r.jsxs)(t.li,{children:[(0,r.jsx)(t.strong,{children:"No Line Separators"}),": The data is stored as a continuous stream without line breaks."]}),"\n",(0,r.jsxs)(t.li,{children:[(0,r.jsx)(t.strong,{children:"Separations"}),": The only actual separator (",(0,r.jsx)(t.code,{children:"\\x20"}),") is the space between the title (",(0,r.jsx)(t.code,{children:"tree"}),") and the size of the content."]}),"\n"]}),"\n",(0,r.jsx)(t.h2,{id:"decoding-the-tree-object",children:"Decoding the Tree Object"}),"\n",(0,r.jsx)(t.p,{children:"To interpret a Tree object:"}),"\n",(0,r.jsxs)(t.ol,{children:["\n",(0,r.jsxs)(t.li,{children:[(0,r.jsx)(t.strong,{children:"Read the Header"}),": Identify the object type (",(0,r.jsx)(t.code,{children:"tree"}),") and content size."]}),"\n",(0,r.jsxs)(t.li,{children:[(0,r.jsx)(t.strong,{children:"Parse the Body"}),":","\n",(0,r.jsxs)(t.ul,{children:["\n",(0,r.jsx)(t.li,{children:"Extract each file entry based on the file type, file name, and SHA-1."}),"\n",(0,r.jsx)(t.li,{children:"Use the null bytes as markers to differentiate between components."}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,r.jsx)(t.p,{children:"This structure ensures Git's ability to efficiently manage project directories and maintain their integrity through the SHA-1 hashes for version tracking."})]})}function h(e={}){const{wrapper:t}={...(0,s.R)(),...e.components};return t?(0,r.jsx)(t,{...e,children:(0,r.jsx)(a,{...e})}):a(e)}},8453:(e,t,n)=>{n.d(t,{R:()=>o,x:()=>l});var i=n(6540);const r={},s=i.createContext(r);function o(e){const t=i.useContext(s);return i.useMemo((function(){return"function"==typeof e?e(t):{...t,...e}}),[t,e])}function l(e){let t;return t=e.disableParentContext?"function"==typeof e.components?e.components(r):e.components||r:o(e.components),i.createElement(s.Provider,{value:t},e.children)}}}]);