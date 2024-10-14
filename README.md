# Smart Home Control

## Este projeto tem como objetivo simular uma casa inteligente, na qual os dispositivos podem ser controlados remotamente através de uma interface web. A casa possui diferentes cômodos, cada um com dispositivos conectados que podem ser manipulados pelos usuários. A interação com os dispositivos será feita em tempo real, usando comunicação WebSocket para refletir as alterações de estado em múltiplos clientes simultaneamente.

### Cômodos e Dispositivos
  - A casa inteligente será composta por três principais cômodos:

1. Sala de Estar
  - Luzes Inteligentes
    - Comportamento esperado: O usuário deve poder ligar e desligar as luzes.
    - Estados: Ligado/Desligado.
  - Televisão
    - Comportamento esperado: O usuário deve poder ligar e desligar a TV e mudar de canal.
    - Estados: Ligado/Desligado, Canal (lista de canais disponíveis).
  - Ar-Condicionado
    - Comportamento esperado: O usuário deve poder ligar e desligar o ar-condicionado e ajustar a temperatura.
    - Estados: Ligado/Desligado, Temperatura (ajustável de 18°C a 30°C).
2. Cozinha
  - Luzes Inteligentes
    - Comportamento esperado: O usuário deve poder ligar e desligar as luzes.
    - Estados: Ligado/Desligado.
  - Geladeira Inteligente
    - Comportamento esperado: Monitorar a temperatura interna da geladeira e alertar o usuário se a temperatura subir além do valor definido.
    - Estados: Temperatura interna, Alerta (acionado quando acima de 5°C).
  - Fogão Elétrico
    - Comportamento esperado: O usuário deve poder ligar e desligar o fogão elétrico e ajustar o nível de potência.
    - Estados: Ligado/Desligado, Potência (ajustável de 1 a 5).
3. Quarto
  - Luzes Inteligentes
    - Comportamento esperado: O usuário deve poder ligar e desligar as luzes.
    - Estados: Ligado/Desligado.
  - Ventilador Inteligente
    - Comportamento esperado: O usuário deve poder ligar e desligar o ventilador e ajustar a velocidade.
    - Estados: Ligado/Desligado, Velocidade (1 a 3).
  - Cortinas Automáticas
    - Comportamento esperado: O usuário deve poder abrir e fechar as cortinas.
    - Estados: Aberto/Fechado.

### Configuração

- Para ver o projeto funcionando é necessário seguir os passos descritos no arquivo `init.txt`.

