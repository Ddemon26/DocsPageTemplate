# Dream Language Examples

Welcome to the Dream Programming Language examples! Dream uses the `.dr` file extension and features modern, intuitive syntax.

## Hello World Example

Here's a simple "Hello World" program in Dream:

```dream
// Hello World in Dream Language (.dr)
dream main() {
    print("Hello, Dream World!");
    return 0;
}
```

## Variables and Types

Dream supports strong typing with type inference:

```dream
// Variable declarations
let message: string = "Welcome to Dream";
let version: number = 1.0;
let isActive: boolean = true;

// Arrays
let numbers: array<number> = [1, 2, 3, 4, 5];
let names: array<string> = ["Alice", "Bob", "Charlie"];
```

## Functions

Functions in Dream are declared with the `dream` keyword:

```dream
dream greet(name: string) -> string {
    return "Hello, " + name + "!";
}

dream calculate(a: number, b: number) -> number {
    return a + b;
}
```

## Classes and Objects

Dream supports object-oriented programming:

```dream
class Person {
    name: string;
    age: number;
    
    dream constructor(name: string, age: number) {
        this.name = name;
        this.age = age;
    }
    
    dream introduce() -> string {
        return "Hi, I'm " + this.name + " and I'm " + this.age + " years old.";
    }
}

// Usage
let person = new Person("Alice", 25);
print(person.introduce());
```

## Control Flow

Dream supports modern control flow structures:

```dream
// If statements
if (age >= 18) {
    print("You are an adult");
} else {
    print("You are a minor");
}

// For loops
for i in 0..10 {
    print("Count: " + i);
}

// While loops
let count = 0;
while (count < 5) {
    print("Count: " + count);
    count++;
}
```

## File Extensions

- `.dr` - Dream source files
- `.dri` - Dream interface files
- `.drm` - Dream module files

## Navigation

- [Back to Introduction](introduction.md)
- [View API Reference](api/overview.md)
- [Language Reference](lexical.md)