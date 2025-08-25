# 🖥️ FASE 3: Construindo o Kernel - Primeiros Passos

## 📋 Visão Geral da Fase

Nesta fase, você começará a desenvolver as funcionalidades básicas do kernel, incluindo console, sistema de arquivos virtual e drivers essenciais.

## 🎯 Objetivos de Aprendizado

- ✅ Implementar console e saída de texto
- ✅ Criar sistema de arquivos virtual (VFS)
- ✅ Desenvolver drivers básicos
- ✅ Implementar system calls
- ✅ Gerenciar interrupções e exceções

## 📊 Informações da Fase

| Métrica | Valor |
|---------|-------|
| **Tempo Estimado** | 80 horas |
| **Dificuldade** | Avançado |
| **Pré-requisitos** | FASE 2 completa, C avançado |
| **Conceitos** | VFS, Drivers, IDT, System Calls |

## 📚 Módulos desta Fase

### Módulo 3.1: Console e Impressão de Texto
**Tempo: 40 horas**

- VGA text mode
- Scrolling e cores
- Keyboard driver
- Terminal emulation

### Módulo 3.2: Sistema de Arquivos Virtual (VFS)
**Tempo: 40 horas**

- Filosofia "Tudo é um arquivo"
- Inodes e file descriptors
- Mount points
- Device files (/dev)

## 💻 Código Exemplo: VFS Básico

```c
// vfs.h - Virtual File System
typedef struct vfs_node {
    char name[128];
    uint32_t flags;
    uint32_t inode;
    uint32_t length;
    
    // Funções do filesystem
    read_type_t read;
    write_type_t write;
    open_type_t open;
    close_type_t close;
    
    struct vfs_node *ptr; // Usado por mountpoints e symlinks
} vfs_node_t;

// Filesystem root
extern vfs_node_t *fs_root;

// Funções padrão
uint32_t vfs_read(vfs_node_t *node, uint32_t offset, uint32_t size, uint8_t *buffer);
uint32_t vfs_write(vfs_node_t *node, uint32_t offset, uint32_t size, uint8_t *buffer);
void vfs_open(vfs_node_t *node, uint8_t read, uint8_t write);
void vfs_close(vfs_node_t *node);

// console.c - Console driver
void console_init() {
    // Registrar console como device
    vfs_node_t *console = (vfs_node_t*)kmalloc(sizeof(vfs_node_t));
    strcpy(console->name, "console");
    console->flags = FS_CHARDEVICE;
    console->read = &console_read;
    console->write = &console_write;
    
    // Montar em /dev/console
    vfs_mount("/dev/console", console);
}

uint32_t console_write(vfs_node_t *node, uint32_t offset, uint32_t size, uint8_t *buffer) {
    for (uint32_t i = 0; i < size; i++) {
        putchar(buffer[i]);
    }
    return size;
}
```

## 🎯 Projeto: Mini Kernel Funcional

Implemente um kernel com:
1. Console funcional com cores
2. VFS com /dev, /proc básicos
3. Keyboard input
4. Simple shell
5. Memory info em /proc/meminfo

## 📊 Validação

### Checkpoints
- [ ] Printf funcional no kernel
- [ ] VFS implementado e testado
- [ ] Devices em /dev acessíveis
- [ ] Shell básico respondendo
- [ ] System calls funcionais

## 🔧 Ferramentas Úteis

```bash
# Compilar kernel
make -C kernel/

# Criar imagem de disco
dd if=/dev/zero of=disk.img bs=1M count=32
mkfs.ext2 disk.img

# Montar e copiar kernel
sudo mount disk.img /mnt
sudo cp kernel.bin /mnt/boot/
sudo umount /mnt

# Testar
qemu-system-x86_64 -hda disk.img -m 128M
```

## ➡️ Próxima Fase

Após implementar kernel básico:
[FASE 4: Gerenciamento de Processos](../FASE_4_PROCESSOS/README.md)

---

**Recursos:**
- [xv6 Source Code](https://github.com/mit-pdos/xv6-public)
- [Linux 0.01 Source](https://mirrors.edge.kernel.org/pub/linux/kernel/Historic/)
- [James Molloy's Tutorial](http://www.jamesmolloy.co.uk/tutorial_html/)