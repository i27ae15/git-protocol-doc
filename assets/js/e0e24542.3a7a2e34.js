"use strict";(self.webpackChunkgit_protocol=self.webpackChunkgit_protocol||[]).push([[146],{9559:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>d,contentTitle:()=>c,default:()=>a,frontMatter:()=>r,metadata:()=>i,toc:()=>h});const i=JSON.parse('{"id":"git-protocol/pack-header","title":"3. Pack Header","description":"After we have received the pack file, we can see that this is separated in three parts","source":"@site/docs/git-protocol/pack-header.md","sourceDirName":"git-protocol","slug":"/git-protocol/pack-header","permalink":"/git-protocol-doc/docs/git-protocol/pack-header","draft":false,"unlisted":false,"editUrl":"https://github.com/i27ae15/git-protocol-doc/docs/git-protocol/pack-header.md","tags":[],"version":"current","sidebarPosition":4,"frontMatter":{"sidebar_position":4},"sidebar":"tutorialSidebar","previous":{"title":"2. Git-Upload Service","permalink":"/git-protocol-doc/docs/git-protocol/git-upload"},"next":{"title":"4. Object Header","permalink":"/git-protocol-doc/docs/git-protocol/object-header"}}');var s=n(4848),o=n(8453);const r={sidebar_position:4},c="3. Pack Header",d={},h=[{value:"Step 1: Shifting a Single Byte",id:"step-1-shifting-a-single-byte",level:4},{value:"Step 2: Combining Multiple Bytes",id:"step-2-combining-multiple-bytes",level:4},{value:"Step 3: Combining Bytes with the OR Operator",id:"step-3-combining-bytes-with-the-or-operator",level:4},{value:"Step 4: Interpreting the Result",id:"step-4-interpreting-the-result",level:4}];function l(e){const t={admonition:"admonition",code:"code",h1:"h1",h4:"h4",header:"header",li:"li",p:"p",pre:"pre",strong:"strong",ul:"ul",...(0,o.R)(),...e.components};return(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)(t.header,{children:(0,s.jsx)(t.h1,{id:"3-pack-header",children:"3. Pack Header"})}),"\n",(0,s.jsxs)("div",{class:"justified-text",children:[(0,s.jsx)(t.p,{children:"After we have received the pack file, we can see that this is separated in three parts"}),(0,s.jsx)(t.pre,{children:(0,s.jsx)(t.code,{children:"< Header >\n< Content - Compressed using Z-lib>\n< Tail >\n"})}),(0,s.jsx)(t.p,{children:"We must, of course, start by parsing the header, which is very straight forward."}),(0,s.jsxs)(t.p,{children:["The first 4 bytes correspond to the ",(0,s.jsx)(t.code,{children:"version"})," and the last 4 bytes correspond to the number of objects the pack file have, these bytes must be converted from a ",(0,s.jsx)(t.code,{children:"uint32_t"})," to a ",(0,s.jsx)(t.code,{children:"uint64_t"}),", by a process called ",(0,s.jsx)(t.code,{children:"byte order conversion"}),", this case with Big-Endian."]}),(0,s.jsx)(t.p,{children:"Here is an explanation in how to do it in case you are not familiar whit this."}),(0,s.jsx)(t.h4,{id:"step-1-shifting-a-single-byte",children:"Step 1: Shifting a Single Byte"}),(0,s.jsxs)(t.p,{children:["Suppose we have the following hexadecimal value ",(0,s.jsx)(t.code,{children:"\\x7F"}),", which can be represented in binary as ",(0,s.jsx)(t.code,{children:"0111 1111"}),". This value corresponds to the decimal number ",(0,s.jsx)(t.code,{children:"127"}),"."]}),(0,s.jsxs)(t.ul,{children:["\n",(0,s.jsxs)(t.li,{children:["\n",(0,s.jsxs)(t.p,{children:["To convert ",(0,s.jsx)(t.code,{children:"\\x7F"})," into 16 bits (2 bytes), we will do it is by shifting ",(0,s.jsx)(t.code,{children:"8"})," bits into it: ",(0,s.jsx)(t.code,{children:"\\x7F << 8"}),", making ",(0,s.jsx)(t.code,{children:"\\x7F"})," move 8 bits to the left, ending up with:"]}),"\n",(0,s.jsxs)(t.ul,{children:["\n",(0,s.jsxs)(t.li,{children:["Hexadecimal: ",(0,s.jsx)(t.code,{children:"\\x7F00"})]}),"\n",(0,s.jsxs)(t.li,{children:["Binary: ",(0,s.jsx)(t.code,{children:"0111 1111 0000 0000"})]}),"\n",(0,s.jsxs)(t.li,{children:["Decimal: ",(0,s.jsx)(t.code,{children:"32512"})]}),"\n"]}),"\n"]}),"\n",(0,s.jsxs)(t.li,{children:["\n",(0,s.jsxs)(t.p,{children:["To further convert it into 32 bits, shift the result by 16 bits: ",(0,s.jsx)(t.code,{children:"\\x7F00 << 16"}),". This results in:"]}),"\n",(0,s.jsxs)(t.ul,{children:["\n",(0,s.jsxs)(t.li,{children:["Hexadecimal: ",(0,s.jsx)(t.code,{children:"\\x7F00 0000"}),"."]}),"\n",(0,s.jsxs)(t.li,{children:["Binary: ",(0,s.jsx)(t.code,{children:"0111 1111 0000 0000 0000 0000 0000 0000"})]}),"\n",(0,s.jsxs)(t.li,{children:["Decimal: ",(0,s.jsx)(t.code,{children:"2130706432"})]}),"\n"]}),"\n"]}),"\n"]}),(0,s.jsx)(t.h4,{id:"step-2-combining-multiple-bytes",children:"Step 2: Combining Multiple Bytes"}),(0,s.jsxs)(t.p,{children:["So, this is for one number, what if we have more than one and we want to combine them? As, in fact, is our case. The answer is simply, we can use the ",(0,s.jsx)(t.code,{children:"OR"})," operator to combine these bits, so, let's say we have the following 4 bytes as part the pack ",(0,s.jsx)(t.code,{children:"version"})," :"]}),(0,s.jsx)(t.pre,{children:(0,s.jsx)(t.code,{children:"BYTE_0 = 0x12  = 0001 0010\nBYTE_1 = 0x34  = 0011 0100\nBYTE_2 = 0x56  = 0101 0110\nBYTE_3 = 0x78  = 0111 1000\n"})}),(0,s.jsx)(t.p,{children:"And remember we want the bytes to be by Big-Endian, meaning that the bytes must end-up in the following format:"}),(0,s.jsx)(t.pre,{children:(0,s.jsx)(t.code,{children:"bits = 31 ......................................................... 0\n          ^   BYTE_0   ^^   BYTE_1   ^^   BYTE_2   ^^   BYTE_3   ^^\n"})}),(0,s.jsx)(t.p,{children:"So, to accomplish this, we have to shift like this:"}),(0,s.jsx)(t.pre,{children:(0,s.jsx)(t.code,{className:"language-cpp",children:"BYTE_0 << 24 = 0x12000000  // 0001 0010 0000 0000 0000 0000 0000 0000\nBYTE_1 << 16 = 0x00340000  // 0000 0000 0011 0100 0000 0000 0000 0000\nBYTE_2 << 08 = 0x00005600  // 0000 0000 0000 0000 0101 0110 0000 0000\nBYTE_3 << 00 = 0x00000078  // 0000 0000 0000 0000 0000 0000 0111 1000\n"})}),(0,s.jsx)(t.admonition,{type:"note",children:(0,s.jsx)(t.p,{children:(0,s.jsx)(t.strong,{children:"Look that BYTE_3 is not shifted, it remains the same."})})}),(0,s.jsx)(t.h4,{id:"step-3-combining-bytes-with-the-or-operator",children:"Step 3: Combining Bytes with the OR Operator"}),(0,s.jsxs)(t.p,{children:["Once we have shifted our bytes, we can combine them with the ",(0,s.jsx)(t.code,{children:"OR"})," operator, that will look into bits and will return 1 if either of them are 1.\nfor example, imagine we want to combine ",(0,s.jsx)(t.code,{children:"1010"})," with ",(0,s.jsx)(t.code,{children:"1001"}),", so, we will call the ",(0,s.jsx)(t.code,{children:"OR"})," operator (",(0,s.jsx)(t.code,{children:"|"}),"), and do ",(0,s.jsx)(t.code,{children:"1010 | 1001"}),"; let's go one by one to see\nthe result, looking on index ",(0,s.jsx)(t.code,{children:"0"}),", we see that both of them are ",(0,s.jsx)(t.code,{children:"1"}),", so we can write that, if we look into index ",(0,s.jsx)(t.code,{children:"1"}),", we see that is ",(0,s.jsx)(t.code,{children:"0"}),", so we write that, on\nindex ",(0,s.jsx)(t.code,{children:"2"}),", we see that only one of them is one, but since this is a ",(0,s.jsx)(t.code,{children:"OR"})," operation, we write ",(0,s.jsx)(t.code,{children:"1"}),", and finally, at index ",(0,s.jsx)(t.code,{children:"3"}),", we see that again, only one of\nthem is ",(0,s.jsx)(t.code,{children:"1"}),", so we write it again, and thus, we end-up with the value ",(0,s.jsx)(t.code,{children:"1011"}),"."]}),(0,s.jsx)(t.pre,{children:(0,s.jsx)(t.code,{children:"F_VALUE : 1 0 1 0\nS_VALUE : 1 0 0 1\nRESULT  : 1 0 1 1\n"})}),(0,s.jsxs)(t.p,{children:["Understanding this, we can see clearly that the result of the ",(0,s.jsx)(t.code,{children:"OR"})," operation for our 4 bytes is:"]}),(0,s.jsx)(t.pre,{children:(0,s.jsx)(t.code,{className:"language-cpp",children:"uint32_t result = (BYTE_0 << 24) | (BYTE_1 << 16) | (BYTE_2 << 8) | BYTE_3;\n"})}),(0,s.jsx)(t.p,{children:"That produces:"}),(0,s.jsx)(t.pre,{children:(0,s.jsx)(t.code,{children:"HEXADECIMAL:\n\nBYTE_0 : 0x1200 0000\nBYTE_1 : 0x0034 0000\nBYTE_2 : 0x0000 5600\nBYTE_3 : 0x0000 0078\n\nRESULT : 0x1234 5678\n\n..................................................\n\nBINARY:\n\nBYTE_0 : 0001 0010 0000 0000 0000 0000 0000 0000 |\nBYTE_1 : 0000 0000 0011 0100 0000 0000 0000 0000 |\nBYTE_2 : 0000 0000 0000 0000 0101 0110 0000 0000 |\nBYTE_3 : 0000 0000 0000 0000 0000 0000 0111 1000\n\nRESULT : 0001 0010 0011 0100 0101 0110 0111 1000\n"})}),(0,s.jsx)(t.h4,{id:"step-4-interpreting-the-result",children:"Step 4: Interpreting the Result"}),(0,s.jsxs)(t.p,{children:["The result in hexadecimal (",(0,s.jsx)(t.code,{children:"0x12345678"}),") represents the decimal value ",(0,s.jsx)(t.code,{children:"305419896"}),". This corresponds to the ",(0,s.jsx)(t.code,{children:"version"})," or the number of objects, depending on which part of the header is being processed."]})]})]})}function a(e={}){const{wrapper:t}={...(0,o.R)(),...e.components};return t?(0,s.jsx)(t,{...e,children:(0,s.jsx)(l,{...e})}):l(e)}},8453:(e,t,n)=>{n.d(t,{R:()=>r,x:()=>c});var i=n(6540);const s={},o=i.createContext(s);function r(e){const t=i.useContext(o);return i.useMemo((function(){return"function"==typeof e?e(t):{...t,...e}}),[t,e])}function c(e){let t;return t=e.disableParentContext?"function"==typeof e.components?e.components(s):e.components||s:r(e.components),i.createElement(o.Provider,{value:t},e.children)}}}]);