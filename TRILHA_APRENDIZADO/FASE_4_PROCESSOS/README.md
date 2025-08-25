# 🔄 FASE 4: Gerenciamento de Processos

## 📋 Visão Geral da Fase

Implementação de gerenciamento de processos, scheduling, e comunicação entre processos - o coração de um sistema operacional multitarefa.

## 🎯 Objetivos de Aprendizado

- ✅ Implementar estruturas de processos (PCB)
- ✅ Criar scheduler básico (Round Robin)
- ✅ Gerenciar context switching
- ✅ Implementar fork() e exec()
- ✅ Desenvolver IPC básico

## 📊 Informações da Fase

| Métrica | Valor |
|---------|-------|
| **Tempo Estimado** | 80 horas |
| **Dificuldade** | Avançado |
| **Pré-requisitos** | FASE 3 completa |
| **Conceitos** | PCB, Scheduling, IPC, Threads |

## 📚 Módulos desta Fase

### Módulo 4.1: Processos e Scheduling
**Tempo: 40 horas**

- Process Control Block (PCB)
- Estados de processo
- Context switching
- Algoritmos de scheduling

### Módulo 4.2: Comunicação e Sincronização
**Tempo: 40 horas**

- Semáforos e mutexes
- Message passing
- Shared memory
- Deadlock prevention

## 💻 Estruturas Principais

```c
// process.h - Estruturas de processo
typedef enum {
    PROCESS_READY,
    PROCESS_RUNNING,
    PROCESS_BLOCKED,
    PROCESS_TERMINATED
} process_state_t;

typedef struct process {
    uint32_t pid;
    uint32_t ppid;  // Parent PID
    char name[32];
    
    // Estado do processo
    process_state_t state;
    int32_t exit_code;
    
    // Contexto da CPU
    struct {
        uint32_t eax, ebx, ecx, edx;
        uint32_t esi, edi, esp, ebp;
        uint32_t eip, eflags;
        uint32_t cr3;  // Page directory
    } context;
    
    // Memória
    void *stack;
    void *heap;
    size_t heap_size;
    
    // Scheduling
    uint32_t priority;
    uint32_t time_slice;
    uint64_t cpu_time;
    
    // File descriptors
    struct file *files[MAX_FDS];
    
    // Lista de processos
    struct process *next;
    struct process *prev;
} process_t;

// scheduler.c - Round Robin Scheduler
void scheduler() {
    while (1) {
        process_t *next = get_next_ready_process();
        
        if (next) {
            switch_to_process(next);
            
            // Executar por time slice
            enable_timer_interrupt(QUANTUM);
            
            // Retorna aqui após interrupção
            if (current_process->state == PROCESS_RUNNING) {
                current_process->state = PROCESS_READY;
                add_to_ready_queue(current_process);
            }
        } else {
            // Idle
            halt_cpu();
        }
    }
}

// Context switch em Assembly
void switch_context(context_t *old, context_t *new) {
    asm volatile(
        "pushl %%ebp\n\t"
        "pushl %%ebx\n\t"
        "pushl %%esi\n\t"
        "pushl %%edi\n\t"
        "movl %%esp, %0\n\t"
        "movl %1, %%esp\n\t"
        "popl %%edi\n\t"
        "popl %%esi\n\t"
        "popl %%ebx\n\t"
        "popl %%ebp\n\t"
        : "=m" (old->esp)
        : "m" (new->esp)
    );
}
```

## 🎯 Projeto: Sistema Multitarefa

Implemente:
1. Criar e destruir processos
2. Fork e exec system calls
3. Scheduler preemptivo
4. IPC via pipes
5. /proc filesystem com info de processos

## 📊 Validação

### Checkpoints
- [ ] Múltiplos processos rodando
- [ ] Context switch funcional
- [ ] Fork criando processo filho
- [ ] IPC funcionando entre processos
- [ ] /proc/[pid]/status implementado

## 🧑‍💻 Exercício: Producer-Consumer

```c
// TODO(human): Implementar problema producer-consumer
// Requisitos:
// - Buffer circular compartilhado
// - Semáforos para sincronização
// - Múltiplos producers e consumers
// - Evitar deadlock e starvação
```

## ➡️ Próxima Fase

Após dominar processos:
[FASE 5: Extensões Avançadas](../FASE_5_EXTENSOES/README.md)

---

**Recursos:**
- [Linux Scheduler](https://www.kernel.org/doc/html/latest/scheduler/)
- [MINIX 3 Source](https://github.com/Stichting-MINIX-Research-Foundation/minix)
- [Process Management in xv6](https://pdos.csail.mit.edu/6.828/2012/xv6/book-rev7.pdf)