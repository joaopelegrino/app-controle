# 💻 FASE 1: Fundamentos C/C++ e Toolchain

## 📋 Visão Geral da Fase

Esta fase estabelece a base sólida de programação em C/C++ e domínio completo da toolchain de compilação, pré-requisitos essenciais para desenvolvimento de sistemas operacionais.

## 🎯 Objetivos de Aprendizado

Ao completar esta fase, você será capaz de:

- ✅ Dominar conceitos fundamentais de C/C++ para sistemas
- ✅ Entender gerenciamento de memória em baixo nível
- ✅ Trabalhar com ponteiros e aritmética de ponteiros
- ✅ Criar e usar estruturas de dados complexas
- ✅ Compilar projetos multi-arquivo com Make
- ✅ Configurar builds complexos com CMake/Meson
- ✅ Depurar código com GDB proficientemente

## 📊 Informações da Fase

| Métrica | Valor |
|---------|-------|
| **Tempo Estimado** | 60 horas |
| **Dificuldade** | Intermediário |
| **Pré-requisitos** | FASE 0 completa, lógica de programação |
| **Linguagens** | C (primário), C++ (secundário) |

## 📚 Módulos desta Fase

### [🔤 Módulo 1.1: Revisão de C/C++ Essencial](./01_revisao_c_cpp.md)
**Tempo: 30 horas**

Revisão aprofundada dos conceitos fundamentais de C/C++ com foco específico em programação de sistemas e desenvolvimento de SO.

**Tópicos:**
- Tipos de dados e representação em memória
- Ponteiros e referências (conceito crítico)
- Arrays e alocação dinâmica
- Structs e unions para hardware
- Operadores bitwise para manipulação de registros

---

### [🔧 Módulo 1.2: Toolchain de Build](./02_toolchain_build.md)
**Tempo: 30 horas**

Domínio completo das ferramentas de compilação e build, desde Makefiles simples até sistemas modernos como CMake e Meson.

**Tópicos:**
- Processo de compilação (preprocessor, compiler, linker)
- Makefiles e automação de build
- CMake para projetos portáveis
- Meson/Ninja para builds rápidos
- Cross-compilation para diferentes arquiteturas

## 🛠️ Ferramentas Necessárias

### Compiladores e Debuggers
- **GCC** 11+ (GNU Compiler Collection)
- **G++** para código C++
- **GDB** (GNU Debugger)
- **Valgrind** para análise de memória

### Build Systems
- **Make** (GNU Make)
- **CMake** 3.20+
- **Meson** + Ninja
- **pkg-config** para dependências

### Análise de Código
- **cppcheck** - análise estática
- **clang-format** - formatação
- **AddressSanitizer** - detecção de bugs

## 📝 Estrutura de Projetos

```
~/workspace/learning/
├── c_fundamentals/
│   ├── basics/          # Tipos, operadores, controle
│   ├── pointers/        # Exercícios com ponteiros
│   ├── memory/          # Alocação dinâmica
│   └── structures/      # Structs e unions
├── build_systems/
│   ├── make_projects/   # Projetos com Make
│   ├── cmake_projects/  # Projetos com CMake
│   └── meson_projects/  # Projetos com Meson
└── os_primitives/
    ├── bit_manipulation/ # Operações bitwise
    ├── inline_asm/      # Assembly inline
    └── hardware_sim/    # Simulação de hardware
```

## 💻 Exemplo Prático Inicial

### Hello Kernel - Primeiro Programa

```c
// kernel_hello.c
#include <stdint.h>
#include <stddef.h>

// Tipos específicos para OS Dev
typedef uint8_t  u8;
typedef uint16_t u16;
typedef uint32_t u32;
typedef uint64_t u64;

// Estrutura para representar entrada VGA
typedef struct {
    u8 character;
    u8 color;
} __attribute__((packed)) vga_entry_t;

// Buffer VGA em modo texto (80x25)
#define VGA_WIDTH  80
#define VGA_HEIGHT 25
#define VGA_MEMORY 0xB8000

// Função para escrever na tela (sem stdlib)
void kernel_print(const char* str, u8 color) {
    vga_entry_t* vga_buffer = (vga_entry_t*)VGA_MEMORY;
    static u16 cursor_pos = 0;
    
    while (*str) {
        if (*str == '\n') {
            cursor_pos = (cursor_pos / VGA_WIDTH + 1) * VGA_WIDTH;
        } else {
            vga_buffer[cursor_pos].character = *str;
            vga_buffer[cursor_pos].color = color;
            cursor_pos++;
        }
        
        if (cursor_pos >= VGA_WIDTH * VGA_HEIGHT) {
            cursor_pos = 0; // Wrap around
        }
        
        str++;
    }
}

// Entry point do kernel
void kernel_main(void) {
    // Limpar tela
    vga_entry_t* vga = (vga_entry_t*)VGA_MEMORY;
    for (u32 i = 0; i < VGA_WIDTH * VGA_HEIGHT; i++) {
        vga[i].character = ' ';
        vga[i].color = 0x07; // Cinza claro em preto
    }
    
    // Imprimir mensagem
    kernel_print("Hello from Kernel Space!\n", 0x0A); // Verde brilhante
    kernel_print("Ready for OS Development...", 0x0F); // Branco brilhante
    
    // Loop infinito (kernel nunca retorna)
    while (1) {
        __asm__ volatile("hlt");
    }
}
```

### Makefile Básico

```makefile
# Makefile para kernel_hello
CC = gcc
CFLAGS = -ffreestanding -nostdlib -nostartfiles -nodefaultlibs
CFLAGS += -Wall -Wextra -O2
LDFLAGS = -T linker.ld

TARGET = kernel.bin
OBJS = kernel_hello.o

all: $(TARGET)

$(TARGET): $(OBJS)
	$(CC) $(LDFLAGS) -o $@ $^

%.o: %.c
	$(CC) $(CFLAGS) -c $< -o $@

clean:
	rm -f $(OBJS) $(TARGET)

.PHONY: all clean
```

## 📊 Validação de Aprendizado

### Checkpoint 1: Fundamentos C
- [ ] Implementar lista ligada genérica
- [ ] Criar alocador de memória simples
- [ ] Manipular bits para flags de processo
- [ ] Trabalhar com function pointers

### Checkpoint 2: Build Systems
- [ ] Criar Makefile para projeto multi-arquivo
- [ ] Configurar projeto com CMake
- [ ] Implementar build com Meson
- [ ] Cross-compilar para ARM

### Checkpoint 3: Debugging
- [ ] Usar GDB para análise de crash
- [ ] Detectar memory leaks com Valgrind
- [ ] Aplicar AddressSanitizer
- [ ] Analisar assembly gerado

## 🚨 Problemas Comuns

### Segmentation Fault
**Causa:** Acesso inválido à memória
```bash
# Debugar com GDB
gdb ./programa
(gdb) run
(gdb) bt  # backtrace quando crashar
```

### Undefined Reference
**Causa:** Função declarada mas não definida
```makefile
# Verificar ordem de linkagem
$(CC) main.o utils.o -o programa  # Ordem importa!
```

### Memory Leaks
**Detecção:**
```bash
valgrind --leak-check=full ./programa
```

## 🧪 Projetos Práticos

### Projeto 1: Memory Manager
Implemente um gerenciador de memória simples:
- Pool de memória fixa
- Alocação e liberação
- Detecção de fragmentação
- Estatísticas de uso

### Projeto 2: Mini Shell
Crie um shell básico:
- Parser de comandos
- Execução de processos
- Redirecionamento I/O
- Pipes simples

### Projeto 3: Device Driver Simulado
Simule um driver de dispositivo:
- Estruturas de controle
- Buffer circular
- Interrupções simuladas
- DMA básico

## 📚 Recursos de Estudo

### Livros Essenciais
- "The C Programming Language" - K&R
- "Expert C Programming" - Peter van der Linden
- "C Interfaces and Implementations" - David Hanson

### Documentação Online
- [C Reference](https://en.cppreference.com/w/c)
- [GCC Documentation](https://gcc.gnu.org/onlinedocs/)
- [Make Manual](https://www.gnu.org/software/make/manual/)

### Vídeos e Cursos
- CS50 Harvard (Fundamentos)
- Low Level Learning (YouTube)
- Jacob Sorber (Systems Programming)

## 🎯 Desafio Final da Fase

### Bootloader Mínimo

Crie um bootloader de 512 bytes que:
1. Carregue em modo real (16-bit)
2. Imprima mensagem na tela
3. Mude para modo protegido (32-bit)
4. Salte para código C

**Entregáveis:**
- Código fonte comentado
- Makefile completo
- Documentação do processo
- Screenshot rodando em QEMU

## ➡️ Próximos Passos

Após completar todos os checkpoints:

1. ✅ Revise conceitos de ponteiros e memória
2. 📖 Estude arquitetura x86 básica
3. 🚀 Prossiga para [FASE 2: Hardware e Kernel](../FASE_2_HARDWARE/README.md)

## 📝 Registro de Progresso

```markdown
Data de Início: ___/___/___
Data de Conclusão: ___/___/___

Projetos Completos:
- [ ] Memory Manager
- [ ] Mini Shell
- [ ] Device Driver

Conceitos Dominados:
- [ ] Ponteiros e referências
- [ ] Alocação dinâmica
- [ ] Makefiles
- [ ] Debugging com GDB

Notas Pessoais:
_________________________________
_________________________________
```

---

**Tempo Total Investido:** _____ horas  
**Maior Desafio:** _________________  
**Próxima Revisão:** ___/___/___