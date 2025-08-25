# ⚙️ FASE 2: Hardware Virtualizado e Kernel

## 📋 Visão Geral da Fase

Esta fase introduz conceitos fundamentais de hardware, bootloaders e gerenciamento de memória - a ponte entre software e hardware.

## 🎯 Objetivos de Aprendizado

- ✅ Entender arquitetura x86 e modos de operação
- ✅ Implementar um bootloader funcional
- ✅ Configurar modo protegido e paginação
- ✅ Gerenciar memória física e virtual
- ✅ Trabalhar com QEMU para virtualização

## 📊 Informações da Fase

| Métrica | Valor |
|---------|-------|
| **Tempo Estimado** | 80 horas |
| **Dificuldade** | Intermediário-Avançado |
| **Pré-requisitos** | FASE 1 completa, Assembly básico |
| **Ferramentas** | NASM, QEMU, Bochs |

## 📚 Módulos desta Fase

### Módulo 2.1: Bootloader e Inicialização
**Tempo: 40 horas**

- BIOS e processo de boot
- Modo real (16-bit) vs Modo protegido (32-bit)
- Carregar kernel do disco
- Multiboot specification

### Módulo 2.2: Gerenciamento de Memória
**Tempo: 40 horas**

- Segmentação vs Paginação
- Page tables e TLB
- Alocação de frames físicos
- Virtual memory mapping

## 🛠️ Projeto Principal: Bootloader Completo

```assembly
; boot.asm - Bootloader simples
[BITS 16]
[ORG 0x7C00]

start:
    ; Configurar segmentos
    xor ax, ax
    mov ds, ax
    mov es, ax
    
    ; Imprimir mensagem
    mov si, msg
    call print
    
    ; Carregar kernel
    ; ... código para ler do disco ...
    
    ; Entrar em modo protegido
    cli
    lgdt [gdt_descriptor]
    mov eax, cr0
    or eax, 1
    mov cr0, eax
    jmp 0x08:protected_mode

[BITS 32]
protected_mode:
    ; Configurar segmentos de dados
    mov ax, 0x10
    mov ds, ax
    mov es, ax
    mov fs, ax
    mov gs, ax
    mov ss, ax
    
    ; Saltar para kernel
    jmp 0x100000

msg db 'Booting OS...', 0

; GDT
gdt_start:
    ; Null descriptor
    dd 0x0
    dd 0x0
    
    ; Code segment
    dw 0xFFFF
    dw 0x0
    db 0x0
    db 10011010b
    db 11001111b
    db 0x0
    
    ; Data segment
    dw 0xFFFF
    dw 0x0
    db 0x0
    db 10010010b
    db 11001111b
    db 0x0
gdt_end:

gdt_descriptor:
    dw gdt_end - gdt_start - 1
    dd gdt_start

times 510-($-$$) db 0
dw 0xAA55
```

## 📊 Validação de Aprendizado

### Checkpoints
- [ ] Bootloader carrega e executa
- [ ] Modo protegido ativado
- [ ] Paginação configurada
- [ ] Kernel carregado com sucesso
- [ ] Memory map implementado

## 🚨 Debugging Tips

```bash
# Compilar bootloader
nasm -f bin boot.asm -o boot.bin

# Testar com QEMU
qemu-system-x86_64 -drive file=boot.bin,format=raw

# Debug com GDB
qemu-system-x86_64 -s -S -drive file=boot.bin,format=raw &
gdb
(gdb) target remote localhost:1234
(gdb) break *0x7c00
(gdb) continue
```

## ➡️ Próxima Fase

Após dominar hardware e bootloaders:
[FASE 3: Construindo o Kernel](../FASE_3_KERNEL/README.md)

---

**Recursos Essenciais:**
- [OSDev Wiki - Bootloader](https://wiki.osdev.org/Bootloader)
- [Intel Manuals](https://software.intel.com/content/www/us/en/develop/articles/intel-sdm.html)
- [x86 Assembly Guide](https://www.cs.virginia.edu/~evans/cs216/guides/x86.html)