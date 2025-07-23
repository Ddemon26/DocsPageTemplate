# Lexical

The lexical analysis is independent of the syntax parsing and the semantic analysis. The lexical analyzer splits the source text into tokens. The lexical grammar describes the syntax of these tokens. The grammar is designed to be suitable for high-speed scanning and to facilitate the implementation of a correct scanner. It has a minimum of special case rules and there is only one phase of translation.

## Source Text

Source text can be encoded as any one of the following:

- ASCII
- UTF-8
- UTF-16BE
- UTF-16LE
- UTF-32BE
- UTF-32LE

UTF-8 is a superset of traditional 7-bit ASCII. One of the following UTF BOMs (Byte Order Marks) can be present at the beginning of the source text:

| Format | BOM |
|--------|-----|
| UTF-8 | EF BB BF |
| UTF-16BE | FE FF |
| UTF-16LE | FF FE |
| UTF-32BE | 00 00 FE FF |
| UTF-32LE | FF FE 00 00 |

If the source file does not start with a BOM, then the first character must be less than or equal to U+0000007F.

## Character Set

Characters in D source text are Unicode characters. However, some Unicode characters are given special meaning:

```d
// Example D code
module example;

import std.stdio;

void main() {
    writeln("Hello, World!");
}
```

## End of File

The source text is terminated by whichever comes first:

- The physical end of the file
- The logical end of the file
- A SUB character (U+00001A)

## End of Line

The following are recognized as end of line:

| Sequence | Unicode Name |
|----------|--------------|
| \u000D | carriage return (CR) |
| \u000A | line feed (LF) |
| \u000D\u000A | carriage return, line feed (CR LF) |
| \u0085 | next line (NEL) |
| \u2028 | line separator (LS) |
| \u2029 | paragraph separator (PS) |

## White Space

White space is defined as any character with the Unicode White_Space property, which includes:

- Space characters
- Tab characters  
- Vertical tab characters
- Form feed characters
- End of line characters

## Comments

There are three kinds of comments:

1. **Block comments** can span multiple lines, start with `/*` and end with `*/`. Block comments can be nested.

2. **Line comments** start with `//` and go to the end of the line.

3. **Nesting comments** start with `/+` and end with `+/`. Nesting comments can be nested.

```d
/* This is a block comment */

// This is a line comment

/+ This is a nesting comment +/

/+ 
   /+ This is a nested comment +/
+/
```

## Tokens

The input elements form a sequence of tokens. There are five kinds of tokens:

1. **Identifiers**
2. **Keywords** 
3. **Literals**
4. **Operators**
5. **Other separators**

Whitespace and comments are not tokens, although they may serve to separate tokens that, without such separation, might be lexed as a single token.

## Identifiers

Identifiers start with a letter or underscore, and are followed by any number of letters, underscores, or digits.

```d
// Valid identifiers
myVariable
_privateVar
className2
MAX_SIZE
```

## String Literals

A string literal is a sequence of characters enclosed in double quotes:

```d
"hello"
"world"
"D programming language"
```

## Wysiwyg Strings

Wysiwyg (what you see is what you get) strings are enclosed by backticks:

```d
`c:\root\foo.exe`
`"hello world"`
```

## Double Quoted Strings

Double quoted strings are enclosed in double quotes and can contain escape sequences:

```d
"hello\nworld"
"tab\there"
"quote: \""
```

## Delimited Strings

Delimited strings use custom delimiters:

```d
q"[hello world]"
q"{hello world}"
q"(hello world)"
```

## Token Strings

Token strings are delimited by `q{` and `}`:

```d
q{
    int x = 5;
    string s = "hello";
}
```

## Hex Strings

Hex strings represent binary data:

```d
x"0A 0B 0C"
x"deadbeef"
```

## String Postfix

String literals can have postfix characters:

```d
"hello"c    // char[]
"hello"w    // wchar[]
"hello"d    // dchar[]
```

## Character Literals

Character literals are enclosed in single quotes:

```d
'a'
'\n'
'\u0041'
```

## Integer Literals

Integer literals can be decimal, binary, octal, or hexadecimal:

```d
123         // decimal
0b1010      // binary
0o777       // octal
0xFF        // hexadecimal
```

## Floating Point Literals

Floating point literals:

```d
3.14
1.0e10
0x1.FFFFFEp+127
```

## Keywords

The following identifiers are reserved and may not be used as identifiers:

```
abstract    alias       align       asm
assert      auto        body        bool
break       byte        case        cast
catch       cdouble     cent        cfloat
char        class       const       continue
creal       dchar       debug       default
delegate    delete      deprecated  do
double      else        enum        export
extern      false       final       finally
float       for         foreach     foreach_reverse
function    goto        idouble     if
ifloat      immutable   import      in
inout       int         interface   invariant
ireal       is          lazy        long
macro       mixin       module      new
nothrow     null        out         override
package     pragma      private     protected
public      pure        real        ref
return      scope       shared      short
static      struct      super       switch
synchronized template   this        throw
true        try         typedef     typeid
typeof      ubyte       ucent       uint
ulong       union       unittest    ushort
version     void        volatile    wchar
while       with        __FILE__    __MODULE__
__LINE__    __FUNCTION__ __PRETTY_FUNCTION__
```

## Special Tokens

Special tokens include operators and punctuation:

```
/   /=  .   ..  ...
&   &=  &&  |   |=  ||
-   -=  --  +   +=  ++
<   <=  <<  <<=  <>  <>=
>   >=  >>= >>  >>> >>>=
!   !=  !<>=  !<>  !<=  !<
!>=  !>  (   )   [   ]
{   }   ?   ,   ;   :
$   =   ==  *   *=  %
%=  ^   ^=  ^^  ^^= ~
~=  @   =>  #
```

## Special Token Sequences

Special token sequences are replaced during lexical analysis:

```d
__DATE__        // Current date
__TIME__        // Current time  
__TIMESTAMP__   // Current timestamp
__VENDOR__      // Compiler vendor
__VERSION__     // Compiler version
```