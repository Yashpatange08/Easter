import re
import os

# Comprehensive question sets and exam-ready answers for DBATU B.Tech CS Sem 1 & 2
SUBJECT_QUESTION_BANKS = {
    "computer_programming_in_c": {
        "subject": "Computer Programming in C (BTES204)",
        "code": "BTES204",
        "semester": 1,
        "total_marks": 60,
        "questions": [
            {
                "id": "q1",
                "number": "Q.1",
                "title": "Objective Type Questions (MCQs)",
                "marks": 12,
                "sub_questions": [
                    {"q": "RAM is a type of", "ans": "d. Volatile memory (Loses content when power is switched off).", "marks": 1},
                    {"q": "Which topology connects every device to a central hub?", "ans": "d. Star topology (All nodes connect to a central switch/hub).", "marks": 1},
                    {"q": "Which command checks code for errors without running it?", "ans": "c. Compile (Syntactic and semantic checking by compiler).", "marks": 1},
                    {"q": "What is the output: int p=8>5>2; q=8>5>0; r=8>5>1; printf('%d %d %d', p,q,r);", "ans": "b. 1 0 0 (Because 8>5 is 1; then 1>2 is 0, 1>0 is 1, 1>1 is 0).", "marks": 1},
                    {"q": "What does the prefix operator ++i do?", "ans": "b. Increments i and returns new value.", "marks": 1},
                    {"q": "What is the data type of character literal 'A'?", "ans": "c. int (In C standard, character constants like 'A' have type int).", "marks": 1},
                    {"q": "The break statement is used to", "ans": "c. Exit from a loop or switch statement immediately.", "marks": 1},
                    {"q": "Output of while (i <= 3) { printf('%d ', i); i++; } with i=1", "ans": "b. 1 2 3", "marks": 1},
                    {"q": "Which correctly initializes a character array with a string?", "ans": "b. char s[] = \"Hello\";", "marks": 1},
                    {"q": "Output of int a[3]={1,2}; printf('%d', a[2]);", "ans": "a. 0 (Unspecified array elements are automatically zero-initialized).", "marks": 1},
                    {"q": "Which of the following correctly declares a pointer to an integer?", "ans": "b. int *p;", "marks": 1},
                    {"q": "A structure in C is used to", "ans": "b. Store different data types under one name.", "marks": 1}
                ]
            },
            {
                "id": "q2_a",
                "number": "Q.2 (A)",
                "title": "Explain the switch statement with syntax, rules, and an example.",
                "marks": 6,
                "keywords": ["switch", "case", "default", "break", "syntax", "rules"],
                "answers": {
                    "long": """**Q.2 (A) Explain the switch statement with syntax, rules, and an example. [6 Marks]**

**1. Definition & Concept:**
The `switch` statement in C is a multi-way decision-making control structure. It tests whether an integer or character expression matches one of a number of constant values, branching execution directly to that case.

**2. Syntax:**
```c
switch (expression) {
    case constant1:
        // statement(s) executed if expression == constant1
        break;
    case constant2:
        // statement(s) executed if expression == constant2
        break;
    default:
        // statement(s) executed if no case matches
}
```

**3. Key Rules for Switch Statement:**
1. **Expression Type:** The switch expression must evaluate to an integral type (`int`, `char`, or `enum`). Float or double values are strictly not allowed.
2. **Case Labels:** Each `case` label must be a unique constant or constant expression ending with a colon `:`. Duplicate case values cause a compilation error.
3. **Role of `break`:** The `break` statement terminates the switch block. If omitted, execution falls through into subsequent cases (known as *fall-through*).
4. **Default Block:** The `default` case is optional. It executes when no matching case constant is found. It can appear anywhere inside the switch body.

**4. Example Program:**
```c
#include <stdio.h>
int main() {
    int choice = 2;
    switch (choice) {
        case 1:
            printf("Selected Option 1: Start Program\\n");
            break;
        case 2:
            printf("Selected Option 2: Settings Configured\\n");
            break;
        default:
            printf("Invalid Choice\\n");
    }
    return 0;
}
```
**Output:** `Selected Option 2: Settings Configured`"""
                }
            },
            {
                "id": "q2_b",
                "number": "Q.2 (B)",
                "title": "Explain the initialization of two-dimensional arrays. How are elements stored in memory? Illustrate with an example.",
                "marks": 6,
                "keywords": ["2D array", "row-major", "memory", "initialization", "matrix"],
                "answers": {
                    "long": """**Q.2 (B) Explain the initialization of two-dimensional arrays. How are elements stored in memory? Illustrate with an example. [6 Marks]**

**1. Definition:**
A two-dimensional array in C is an array of arrays organized as a table of rows and columns. It is declared as `data_type array_name[rows][columns];`.

**2. Initialization Methods:**
- **Explicit Row-by-Row Initialization:**
  ```c
  int matrix[2][3] = { {1, 2, 3}, {4, 5, 6} };
  ```
- **Linear List Initialization (Compiler maps rows):**
  ```c
  int matrix[2][3] = { 1, 2, 3, 4, 5, 6 };
  ```
- **Omitting Row Size (Allowed if column size is fixed):**
  ```c
  int matrix[][3] = { {1, 2, 3}, {4, 5, 6} }; // Valid
  ```

**3. Memory Storage (Row-Major Order):**
Computer memory is linear (1D). C uses **Row-Major Order** to store multi-dimensional arrays in contiguous memory addresses:
- All elements of the first row are stored first: `matrix[0][0], matrix[0][1], matrix[0][2]`
- Followed immediately by all elements of the second row: `matrix[1][0], matrix[1][1], matrix[1][2]`
- Address Formula: `Address(matrix[i][j]) = Base_Address + (i * Total_Columns + j) * sizeof(data_type)`

**4. Code Illustration:**
```c
#include <stdio.h>
int main() {
    int mat[2][2] = { {10, 20}, {30, 40} };
    for (int i = 0; i < 2; i++) {
        for (int j = 0; j < 2; j++) {
            printf("mat[%d][%d]=%d at %p\\n", i, j, mat[i][j], (void*)&mat[i][j]);
        }
    }
    return 0;
}
```"""
                }
            },
            {
                "id": "q3_a",
                "number": "Q.3 (A)",
                "title": "Write a detailed note on the types of computer software with suitable examples.",
                "marks": 6,
                "keywords": ["software", "system software", "application software", "utility"],
                "answers": {
                    "long": """**Q.3 (A) Write a detailed note on the types of computer software with suitable examples. [6 Marks]**

**1. Definition of Software:**
Software is a structured collection of programs, procedures, and documentation that directs a computer's hardware to perform specific tasks.

**2. Primary Categories of Software:**

* **A. System Software:**
  Controls the internal computer hardware and provides a platform for application software to run.
  - **Operating Systems (OS):** Manages CPU, memory, files, and I/O devices (e.g., Windows 11, Linux Ubuntu, macOS).
  - **Translators / Compilers:** Converts source code to machine code (e.g., GCC for C/C++, Python interpreter).
  - **Device Drivers:** Interfaces hardware peripherals with the OS (e.g., GPU driver, printer driver).

* **B. Application Software:**
  Designed directly for end-users to accomplish personal, educational, or business tasks.
  - **General Purpose:** Widely used productivity suites (e.g., Microsoft Word, Google Chrome, Excel).
  - **Specialized / Custom:** Built for dedicated domains (e.g., AutoCAD, Tally ERP, Hospital Management Systems).

* **C. Utility Software:**
  Maintains system security, performance, and storage integrity.
  - Examples: Antivirus software (Windows Defender), Disk Cleanup tools, and File Compressors (7-Zip, WinRAR)."""
                }
            },
            {
                "id": "q4_a",
                "number": "Q.4 (A)",
                "title": "What happens if the size of an array is not specified during initialization? Explain different cases with examples.",
                "marks": 6,
                "keywords": ["array size", "omitting size", "declaration", "initialization"],
                "answers": {
                    "long": """**Q.4 (A) What happens if the size of an array is not specified during initialization? Explain different cases with examples. [6 Marks]**

**1. General Rule:**
In C, if the size of an array is omitted in the declaration, the compiler calculates the size automatically from the number of initializers provided in the initialization list.

**2. Case 1: 1D Array with Initialization (Valid):**
```c
int arr[] = {10, 20, 30, 40}; // Compiler allocates size = 4 elements (16 bytes)
```
The compiler counts 4 initializers and automatically sets the array size to 4.

**3. Case 2: 1D Array without Initialization (Compilation Error):**
```c
int arr[]; // ERROR: storage size of 'arr' isn't known
```
Without both a dimension and an initializer list, memory allocation cannot occur, causing a compile-time error.

**4. Case 3: 2D Array with Column Dimension (Valid):**
```c
int matrix[][3] = { {1, 2, 3}, {4, 5, 6} }; // Valid: Rows = 2, Columns = 3
```
In multi-dimensional arrays, only the leftmost dimension (row size) can be omitted. The remaining dimensions are mandatory so the compiler knows how many bytes constitute each row.

**5. Case 4: Omitting Column Dimension in 2D Array (Error):**
```c
int matrix[2][] = { {1, 2}, {3, 4} }; // ERROR: array type has incomplete element type
```
Column size is compulsory for memory offset calculations."""
                }
            },
            {
                "id": "q4_b",
                "number": "Q.4 (B)",
                "title": "Define simple and compound assignment operators. Give suitable examples for each and explain how they work.",
                "marks": 6,
                "keywords": ["assignment operators", "compound assignment", "operators"],
                "answers": {
                    "long": """**Q.4 (B) Define simple and compound assignment operators. Give suitable examples for each and explain how they work. [6 Marks]**

**1. Simple Assignment Operator (`=`):**
- **Definition:** Evaluates the expression on the right-hand side and assigns the resulting value to the variable on the left-hand side.
- **Syntax:** `variable = expression;`
- **Example:** `int x = 15;` assigns the integer value 15 to `x`.

**2. Compound Assignment Operators (Shorthand Operators):**
- **Definition:** Combines an arithmetic or bitwise operation with assignment. It performs the operation between the variable and the operand, then stores the result back into the variable.
- **Syntax:** `variable op= expression;` equivalent to `variable = variable op (expression);`

**3. Common Compound Operators & Examples:**
| Operator | Example | Equivalent Expression | Initial `a=10` Result |
| :--- | :--- | :--- | :--- |
| `+=` | `a += 5;` | `a = a + 5;` | `a = 15` |
| `-=` | `a -= 3;` | `a = a - 3;` | `a = 7` |
| `*=` | `a *= 2;` | `a = a * 2;` | `a = 20` |
| `/=` | `a /= 4;` | `a = a / 4;` | `a = 2` |
| `%=` | `a %= 3;` | `a = a % 3;` | `a = 1` |

**4. Advantages:**
1. Cleaner, more concise code.
2. The left-hand operand expression is evaluated only once, improving compiler optimization."""
                }
            },
            {
                "id": "q5_b",
                "number": "Q.5 (B)",
                "title": "Design a C program that uses conditional operator to find the largest of three numbers.",
                "marks": 6,
                "keywords": ["conditional operator", "ternary operator", "largest of three"],
                "answers": {
                    "long": """**Q.5 (B) Design a C program that uses conditional operator to find the largest of three numbers. [6 Marks]**

**1. Concept of Conditional (Ternary) Operator:**
The ternary operator `? :` takes three operands: `condition ? value_if_true : value_if_false`. It serves as a compact alternative to `if-else`.

**2. Logic for Three Numbers (`a, b, c`):**
`largest = (a > b) ? ((a > c) ? a : c) : ((b > c) ? b : c);`
- If `a > b`, compare `a` with `c`. The larger of the two is the maximum.
- Otherwise (`b >= a`), compare `b` with `c`. The larger of the two is the maximum.

**3. Complete C Program:**
```c
#include <stdio.h>

int main() {
    int a, b, c, largest;

    printf("Enter three integer values: ");
    if (scanf("%d %d %d", &a, &b, &c) != 3) {
        printf("Invalid input!\\n");
        return 1;
    }

    // Nested conditional operator
    largest = (a > b) ? ((a > c) ? a : c) : ((b > c) ? b : c);

    printf("\\n--- Result ---\\n");
    printf("Numbers entered: %d, %d, %d\\n", a, b, c);
    printf("The largest number is: %d\\n", largest);

    return 0;
}
```

**4. Sample Execution:**
- **Input:** `45 92 67`
- **Output:** `The largest number is: 92`"""
                }
            },
            {
                "id": "q6_b",
                "number": "Q.6 (B)",
                "title": "Define Structure? Explain how one should access structure fields with a suitable program.",
                "marks": 6,
                "keywords": ["structure", "struct", "dot operator", "member access"],
                "answers": {
                    "long": """**Q.6 (B) Define Structure? Explain how one should access structure fields with a suitable program. [6 Marks]**

**1. Definition:**
A `structure` in C is a user-defined composite data type that allows grouping variables of different data types under a single name. While an array holds homogeneous elements, a structure holds heterogeneous members.

**2. Accessing Structure Members:**
Structure fields are accessed using the **dot operator (`.`)** for regular structure variables, or the **arrow operator (`->`)** for structure pointers.
- Syntax: `structure_variable.member_name;`

**3. Program Demonstration:**
```c
#include <stdio.h>
#include <string.h>

// Definition of structure
struct Student {
    int roll_no;
    char name[50];
    float marks;
};

int main() {
    // Declaration and initialization
    struct Student s1;

    // Assigning values via dot operator
    s1.roll_no = 101;
    strcpy(s1.name, "Yash");
    s1.marks = 88.5f;

    // Accessing and printing values
    printf("Student Details:\\n");
    printf("Roll No: %d\\n", s1.roll_no);
    printf("Name:    %s\\n", s1.name);
    printf("Marks:   %.2f\\n", s1.marks);

    return 0;
}
```

**4. Key Points:**
- Total memory of a structure is at least the sum of sizes of its individual members (subject to structure padding/alignment).
- Dot operator has high precedence in C expressions."""
                }
            }
        ]
    },
    "engineering_mathematics_1": {
        "subject": "Engineering Mathematics - I (BTBS101)",
        "code": "BTBS101",
        "semester": 1,
        "total_marks": 60,
        "questions": [
            {
                "id": "m1_q1",
                "number": "Q.1",
                "title": "Find the rank of the matrix using Echelon Form.",
                "marks": 6,
                "answers": {
                    "long": """**Q.1 Find the rank of a matrix using Row Echelon Form. [6 Marks]**

**1. Definition of Rank & Echelon Form:**
The **rank** of a matrix is the maximum number of linearly independent row vectors, which equals the number of non-zero rows in its row echelon form.

**2. Standard Procedure:**
1. Apply elementary row operations: $R_i \leftrightarrow R_j$, $R_i \to k R_i$, or $R_i \to R_i + k R_j$.
2. Reduce the matrix so that the leading entry (first non-zero number) in each row is to the right of the leading entry in the row above it.
3. All zero rows are moved to the bottom of the matrix.
4. Count the number of non-zero rows $r$. The rank of the matrix is $\\rho(A) = r$.

**3. Solved Step-by-Step Example:**
Given matrix $A = \\begin{pmatrix} 1 & 2 & 3 \\\\ 2 & 4 & 7 \\\\ 3 & 6 & 10 \\end{pmatrix}$
- Apply $R_2 \to R_2 - 2R_1$ and $R_3 \to R_3 - 3R_1$:
  $A \\sim \\begin{pmatrix} 1 & 2 & 3 \\\\ 0 & 0 & 1 \\\\ 0 & 0 & 1 \\end{pmatrix}$
- Apply $R_3 \to R_3 - R_2$:
  $A \\sim \\begin{pmatrix} 1 & 2 & 3 \\\\ 0 & 0 & 1 \\\\ 0 & 0 & 0 \\end{pmatrix}$
- The matrix is in row echelon form with 2 non-zero rows.
- **Rank $\\rho(A) = 2$.**"""
                }
            },
            {
                "id": "m1_q2",
                "number": "Q.2",
                "title": "State and prove Euler's Theorem on Homogeneous Functions.",
                "marks": 6,
                "answers": {
                    "long": """**Q.2 State and prove Euler's Theorem on Homogeneous Functions. [6 Marks]**

**1. Statement:**
If $u = f(x, y)$ is a homogeneous function of degree $n$ in $x$ and $y$, having continuous partial derivatives, then:
$$x \\frac{\\partial u}{\\partial x} + y \\frac{\\partial u}{\\partial y} = n u$$

**2. Proof:**
Since $u$ is a homogeneous function of degree $n$, it can be written as:
$$u = x^n \\phi\\left(\\frac{y}{x}\\right)$$
Let $t = \\frac{y}{x}$. Then $u = x^n \\phi(t)$.

1. Differentiating partially with respect to $x$:
   $$\\frac{\\partial u}{\\partial x} = n x^{n-1} \\phi(t) + x^n \\phi'(t) \\left(-\\frac{y}{x^2}\\right) = n x^{n-1} \\phi(t) - x^{n-1} y \\phi'(t)$$
   Multiplying by $x$:
   $$x \\frac{\\partial u}{\\partial x} = n x^n \\phi(t) - x^n y \\phi'(t) \\quad \\text{--- (1)}$$

2. Differentiating partially with respect to $y$:
   $$\\frac{\\partial u}{\\partial y} = x^n \\phi'(t) \\left(\\frac{1}{x}\\right) = x^{n-1} \\phi'(t)$$
   Multiplying by $y$:
   $$y \\frac{\\partial u}{\\partial y} = x^{n-1} y \\phi'(t) \\quad \\text{--- (2)}$$

3. Adding equations (1) and (2):
   $$x \\frac{\\partial u}{\\partial x} + y \\frac{\\partial u}{\\partial y} = n x^n \\phi(t) = n u$$
Hence, Euler's theorem is proved."""
                }
            }
        ]
    },
    "engineering_physics": {
        "subject": "Engineering Physics (BTBS102P)",
        "code": "BTBS102P",
        "semester": 1,
        "total_marks": 60,
        "questions": [
            {
                "id": "p1_q1",
                "number": "Q.1",
                "title": "Explain the principle, construction, and working of He-Ne Laser.",
                "marks": 6,
                "answers": {
                    "long": """**Q.1 Explain the principle, construction, and working of Helium-Neon (He-Ne) Laser. [6 Marks]**

**1. Principle:**
He-Ne laser is a 4-level gas laser producing a continuous coherent red beam at $\\lambda = 632.8\\text{ nm}$. It works on the principle of population inversion achieved through resonant electrical collision between Helium and Neon atoms.

**2. Construction:**
1. **Discharge Tube:** A quartz tube (~50 cm length, ~0.5 cm diameter) containing a mixture of Helium and Neon gas in the ratio 10:1 at ~1 mm Hg pressure.
2. **Resonator Cavity:** Consists of two optical mirrors at the ends—one 100% reflective, and the other 98% reflective (output coupler).
3. **Pumping Source:** High voltage DC discharge (~1000–2000 V) applied through cathode and anode electrodes.

**3. Working & Energy Level Transitions:**
- Electric discharge excites He atoms from ground state $1s$ to metastable states $2^1S$ and $2^3S$ via electron impact ($e^- + \\text{He} \\to \\text{He}^* + e^-$).
- Excited He atoms collide with ground-state Ne atoms, resonantly transferring excitation energy to Neon's $3s$ and $2s$ levels (since energy levels closely match).
- Population inversion is created between Neon $3s$ and $2p$ levels.
- Spontaneous emission initiates stimulated emission, releasing red laser photons at $632.8\\text{ nm}$. Neon atoms drop to $1s$ state and de-excite back to ground state via wall collisions."""
                }
            }
        ]
    },
    "engineering_chemistry": {
        "subject": "Engineering Chemistry (BTBS102 / BTBS202)",
        "code": "BTBS102",
        "semester": 1,
        "total_marks": 60,
        "questions": [
            {
                "id": "c1_q1",
                "number": "Q.1",
                "title": "Explain the EDTA titration method for determination of hardness of water.",
                "marks": 6,
                "answers": {
                    "long": """**Q.1 Explain the EDTA titration method for determination of total hardness of water. [6 Marks]**

**1. Principle:**
Disodium salt of Ethylene Diamine Tetraacetic Acid (EDTA) forms stable, soluble, colorless hexadentate chelate complexes with Calcium ($Ca^{2+}$) and Magnesium ($Mg^{2+}$) ions at $pH = 9 - 10$.

**2. Role of Buffer & Indicator:**
- **Buffer Solution:** Ammonia-ammonium chloride buffer ($NH_4OH + NH_4Cl$) maintains $pH = 10$.
- **Indicator:** Eriochrome Black T (EBT). In hard water containing $Ca^{2+}/Mg^{2+}$, EBT forms an unstable wine-red colored complex:
  $[M^{2+} + \\text{EBT}] \\to [M-\\text{EBT}]\\text{ (Wine Red)}$

**3. Titration Procedure:**
- Pipette 50 mL hard water sample, add 2 mL buffer and 2–3 drops of EBT indicator (turns wine red).
- Titrate against standard $0.01\\text{ M}$ EDTA solution.
- As EDTA is added, it displaces EBT because the metal-EDTA complex is significantly more stable.
- **End Point:** Sharp color change from **Wine Red to Clear Sky Blue** (free uncomplexed EBT).

**4. Calculation:**
$$\\text{Total Hardness (ppm as } CaCO_3) = \\frac{\\text{Volume of EDTA (mL)} \\times \\text{Molarity} \\times 100 \\times 1000}{\\text{Volume of sample (mL)}}$$"""
                }
            }
        ]
    }
}


def detect_subject_from_filename(filename):
    fname = filename.lower()
    if any(k in fname for k in ["c-btes204", "computer-programming-in-c", "programming-for-problem-solving", "programming"]):
        return "computer_programming_in_c"
    elif any(k in fname for k in ["math-1", "mathematics-1", "btbs101", "1000bs101"]):
        return "engineering_mathematics_1"
    elif any(k in fname for k in ["physics", "phbs102", "btbs102p"]):
        return "engineering_physics"
    elif any(k in fname for k in ["chemistry", "chebs102", "btbs102", "btbs202"]):
        return "engineering_chemistry"
    return "computer_programming_in_c"


def generate_mark_based_answer(query, subject_key="computer_programming_in_c", format_type="long"):
    """
    Find or generate high-yield answers calibrated to question marks weightage.
    """
    bank = SUBJECT_QUESTION_BANKS.get(subject_key, SUBJECT_QUESTION_BANKS["computer_programming_in_c"])
    q_low = query.lower()

    # Match specific question if mentioned
    for q in bank["questions"]:
        if q["number"].lower() in q_low or any(k in q_low for k in q.get("keywords", [])):
            if "answers" in q and format_type in q["answers"]:
                return q["answers"][format_type]
            elif "sub_questions" in q:
                # Compile MCQ answers
                ans = f"### {q['number']} {q['title']} [Total {q['marks']} Marks]\n\n"
                for sq in q["sub_questions"]:
                    ans += f"**{sq['q']}**\n- **Answer:** `{sq['ans']}`\n\n"
                return ans

    # General subject AI response tailored to marks weightage
    return f"""### Exam Preparation Guide for {bank['subject']}

**Question Analysis & Marking Depth:**
- **1-2 Marks Questions (3-5 Lines):** Focus strictly on standard textbook definitions, correct syntax, and direct keyword answers.
- **6 Marks Questions (10-15 Lines):** Include:
  1. Definition & core mechanism (3 lines).
  2. Syntax & parameter explanation (4 lines).
  3. Working code block or formula derivation (5-6 lines).
  4. Output and rules summary (2 lines).
- **12 Marks Questions (20+ Lines):** Detailed architecture, step-by-step program or mathematical derivation, with error cases and real-world examples.

*Tip:* You can ask me to solve any specific question like **"Solve Q.2 (A)"**, **"Explain switch statement"**, or **"Solve MCQs from Q.1"**!"""
