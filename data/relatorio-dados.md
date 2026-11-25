# Relatório dos dados do quadro de transferências

Gerado por `node scripts/build-data.mjs`. Corrija a planilha ou `data/correcoes.json` e rode de novo.

- Quadros (meses): 27
- Nomes no total: 4773
- exato: 4307
- inferido: 205
- sem-iniciais: 64
- sem-registro: 147
- tolerancia: 50

## A. Nomes ambíguos (mais de uma pessoa possível)

Para resolver, adicione um item em `vinculos` no `data/correcoes.json`.

### E Hanks — 14× (1999-01 … 2000-06)
- `e-hanks-1998-09` (Élder Hanks, 1998-09 → 2000-07)
- `e-hanks-1998-12` (Élder Hanks, 1998-12 → 2000-10)

```json
{"rotulo":"E Hanks","de":"1999-01","ate":"2000-06","id":"e-hanks-1998-09"}
```

### E Pereira — 13× (1999-03 … 2000-06)
- `e-pereira-1999-02` (Élder Pereira, 1999-02 → 2001-01)
- `e-pereira-x` (Élder Pereira, ? → ?)

```json
{"rotulo":"E Pereira","de":"1999-03","ate":"2000-06","id":"e-pereira-1999-02"}
```

### E Wilson — 8× (1997-10 … 1998-04)
- `e-wilson-1996-07` (Élder Wilson, 1996-07 → 1998-05)
- `e-wilson-1996-09` (Élder Wilson, 1996-09 → 1998-08)

```json
{"rotulo":"E Wilson","de":"1997-10","ate":"1998-04","id":"e-wilson-1996-07"}
```

### E L Wilson — 7× (1997-10 … 1998-04)
- `e-wilson-1996-07` (Élder Wilson, 1996-07 → 1998-05)
- `e-wilson-1996-09` (Élder Wilson, 1996-09 → 1998-08)

```json
{"rotulo":"E L Wilson","de":"1997-10","ate":"1998-04","id":"e-wilson-1996-07"}
```

### E Araujo — 6× (1997-10 … 1998-03)
- `e-araujo-1996-06` (Élder Araújo, 1996-06 → 1998-05)
- `e-araujo-1997-10` (Élder Araújo, 1997-10 → 1999-09)

```json
{"rotulo":"E Araujo","de":"1997-10","ate":"1998-03","id":"e-araujo-1996-06"}
```

## B. Nomes sem nenhuma pessoa correspondente

- **E de Araújo** 18× (1997-10 … 1999-07; ex.: 1997-10 Passo Fundo / Passo Fundo) — provavelmente falta em missionarios.json
- **E Poulsen** 14× (1999-03 … 2000-06; ex.: 1999-03 Osório / Osório) — parecidos: Élder Paulsen (1999-02 → 2000-12)
- **S Sena** 8× (1997-10 … 1999-04; ex.: 1997-10 Osório / Tramandaí) — provavelmente falta em missionarios.json
- **S da Cunha** 8× (1998-04 … 1999-03; ex.: 1998-04 São Leopoldo / Duque B) — provavelmente falta em missionarios.json
- **E Lima** 7× (1999-12 … 2000-06; ex.: 1999-12 Moinhos de Vento / Eldorado do Sul) — parecidos: Élder Lima (1997-08 → 1999-07)
- **S Garcia** 7× (1999-12 … 2000-06; ex.: 1999-12 Osório / Tramandaí) — parecidos: Síster Faria (1999-08 → 2001-01); Síster Garcia (1998-05 → 1999-10)
- **S Alves** 6× (1997-10 … 1998-03; ex.: 1997-10 Osório / Capão da Canoa) — parecidos: Síster Alves (1999-11 → ?); Síster T Alves (1998-05 → 1999-10)
- **E Aviz** 5× (1997-12 … 1998-04; ex.: 1997-12 Caxias do Sul / Moreira Cezar) — parecidos: Élder Aviz (1997-11 → 1997-10)
- **E Cristiano** 5× (2000-02 … 2000-06; ex.: 2000-02 São Leopoldo / Feitoria) — provavelmente falta em missionarios.json
- **S Vieira** 4× (1997-10 … 1998-01; ex.: 1997-10 Ijuí / Cruz Alta Casal) — parecidos: Síster Veiga (1997-02 → 1998-07)
- **S Pereira** 4× (1998-03 … 1998-08; ex.: 1998-03 Santo Ângelo / São Luiz Casal) — parecidos: Síster Ferreira (1996-03 → 1997-08); Síster Ferreira (1999-12 → 2001-04); Síster Pereira (1996-08 → 1998-01); Síster Pereira (1999-03 → 2000-08)
- **E Peterson** 2× (1997-10 … 1997-12; ex.: 1997-10 Novo Hamburgo / Primavera) — parecidos: Élder Patterson (1997-03 → 1999-01); Élder Petersen (1996-09 → 1998-07)
- **E Carneiro** 1× (1997-10; ex.: 1997-10 Ijuí / Palmeira) — parecidos: Élder Carneiro (1998-04 → 2000-03); Élder Cordeiro (1999-12 → 2001-11)
- **E Erekson** 1× (1997-11; ex.: 1997-11 Vergueiro / Carazinho) — parecidos: Élder Erekson (1995-11 → 1997-09); Élder Erikson (1997-03 → 1999-01)
- **S Chavier** 1× (1998-02; ex.: 1998-02 Porto Alegre / Lindóia) — parecidos: Síster Chaves (1998-02 → 1999-08); Síster Xavier (1998-02 → 1999-08)
- **E Midões** 1× (1998-04; ex.: 1998-04 Ijuí / Cruz Alta) — parecidos: Élder Midões (1997-03 → 1998-02)
- **S Gibson** 1× (1998-11; ex.: 1998-11 Porto Alegre / Parque dos Maias) — parecidos: Síster Gibson (1997-07 → 1998-09)
- **E Dartora** 1× (1999-05; ex.: 1999-05 Porto Alegre / Humaitá) — parecidos: Élder Dartora (1997-04 → 1999-03)
- **E Morais** 1× (1999-10; ex.: 1999-10 Passo Fundo / Marau B) — parecidos: Élder Moraes (1998-05 → 2000-04); Élder Morris (1999-12 → 2001-10); Élder Norris (1995-10 → 1997-08)
- **E Perfian** 1× (1999-12; ex.: 1999-12 Caxias do Sul / Botafogo) — provavelmente falta em missionarios.json
- **E Retjen** 1× (1999-12; ex.: 1999-12 Gravataí / Vista Alegre) — parecidos: Élder Redden (1998-11 → 2000-09); Élder Tietjen (1999-10 → 2001-08)
- **E Roos** 1× (1999-12; ex.: 1999-12 Vergueiro / Medianeira B) — parecidos: Élder Cook (1999-11 → 2001-09); Élder Cook (2000-04 → 2002-02); Élder Loosi (? → ?); Élder Reis (1997-12 → 1999-12); Élder Ross (1999-11 → 2001-09)
- **E Hall** 1× (2000-01; ex.: 2000-01 Taquara / Sapiranga) — parecidos: Élder Call (1996-01 → 1997-11); Élder Gull (1999-09 → 2001-07); Élder Hall (1997-10 → 1999-08); Élder Heil (1999-11 → 2001-09); Élder Hill (1999-01 → 2000-11)

## C. Identificados só com tolerância de ±1 mês

- E Aviz → `e-aviz-1997-11` (Élder Aviz, 1997-11 → 1997-10) — 1997-10 … 1997-11
- S Amorim → `s-amorim-1997-11` (Síster Amorim, 1997-11 → 1999-05) — 1997-10
- E Wolverton → `e-wolverton-1997-11` (Élder Wolverton, 1997-11 → 1999-09) — 1997-10
- E Prince → `e-prince-1997-11` (Élder Prince, 1997-11 → 1999-09) — 1997-10
- E Vandiver → `e-vandiver-1997-11` (Élder Vandiver, 1997-11 → 1999-09) — 1997-10
- S Poll → `s-poll-1997-11` (Síster Poll, 1997-11 → 1999-03) — 1997-10
- E Graham → `e-graham-1997-11` (Élder Graham, 1997-11 → 1999-09) — 1997-10
- E Quillen → `e-quillen-1997-11` (Élder Quillen, 1997-11 → 1999-09) — 1997-10
- E Erekson → `e-erekson-1995-11` (Élder Erekson, 1995-11 → 1997-09) — 1997-10
- E Johnson → `e-johnson-1997-11` (Élder Johnson, 1997-11 → 1999-09) — 1997-10
- E Hespanha → `e-hespanha-1997-11` (Élder Hespanha, 1997-11 → 1999-10) — 1997-10
- S Nazaré → `s-nazare-1997-11` (Síster Nazaré, 1997-11 → 1999-05) — 1997-10
- S Pereira → `s-pereira-1996-08` (Síster Pereira, 1996-08 → 1998-01) — 1998-02
- E Midões → `e-midoes-1997-03` (Élder Midões, 1997-03 → 1998-02) — 1998-03
- E dos Santos → `e-dos-santos-1998-04` (Élder dos Santos, 1998-04 → 2000-03) — 1998-03
- E Polacchini → `e-polacchini-1998-04` (Élder Polacchini, 1998-04 → 2000-03) — 1998-03
- S Nogueira → `s-nogueira-1998-04` (Síster Nogueira, 1998-04 → 1999-09) — 1998-03
- E Sérgio → `e-sergio-1998-04` (Élder Sérgio, 1998-04 → 2000-03) — 1998-03
- S Alves → `s-t-alves-1998-05` (Síster T Alves, 1998-05 → 1999-10) — 1998-04
- S Santana → `s-santana-1998-05` (Síster Santana, 1998-05 → 1999-09) — 1998-04
- S Garcia → `s-garcia-1998-05` (Síster Garcia, 1998-05 → 1999-10) — 1998-04
- S Figueiredo → `s-figueiredo-1998-05` (Síster Figueiredo, 1998-05 → 1999-10) — 1998-04
- E Bargueiras → `e-bargueiras-1998-05` (Élder Bargueiras, 1998-05 → 2000-04) — 1998-04
- E Maggio → `e-maggio-1998-05` (Élder Maggio, 1998-05 → 2000-04) — 1998-04
- E Moraes → `e-moraes-1998-05` (Élder Moraes, 1998-05 → 2000-04) — 1998-04
- E Kruger → `e-kruger-1998-05` (Élder Kruger, 1998-05 → 2000-04) — 1998-04
- E Cesar → `e-cesar-1998-05` (Élder Cesar, 1998-05 → 2000-04) — 1998-04
- E Seganti → `e-seganti-1998-05` (Élder Seganti, 1998-05 → 2000-04) — 1998-04
- S T Alves → `s-t-alves-1998-05` (Síster T Alves, 1998-05 → 1999-10) — 1998-04
- E Moreira → `e-moreira-1998-05` (Élder Moreira, 1998-05 → 2000-04) — 1998-04
- E Gouvea → `e-gouvea-1998-05` (Élder Gouvea, 1998-05 → 2000-04) — 1998-04
- E Bessa → `e-bessa-1996-10` (Élder Bessa, 1996-10 → 1998-09) — 1998-10
- S Santos → `s-santos-1997-04` (Síster Santos, 1997-04 → 1998-09) — 1998-10
- E Assunção → `e-assuncao-1996-10` (Élder Assunção, 1996-10 → 1998-09) — 1998-10
- S Gibson → `s-gibson-1997-07` (Síster Gibson, 1997-07 → 1998-09) — 1998-10
- E Elliott → `e-elliott-1997-03` (Élder Elliott, 1997-03 → 1999-02) — 1999-03
- E Cleber → `e-cleber-1997-03` (Élder Cleber, 1997-03 → 1999-02) — 1999-03
- E Spear → `e-spear-1997-03` (Élder Spear, 1997-03 → 1999-02) — 1999-03
- E Dartora → `e-dartora-1997-04` (Élder Dartora, 1997-04 → 1999-03) — 1999-04
- S de Oliveira → `s-de-oliveira-1999-06` (Síster de Oliveira, 1999-06 → 2000-10) — 1999-05
- E Slade → `e-slade-1997-07` (Élder Slade, 1997-07 → 1999-05) — 1999-06
- E K Jackson → `e-jackson-1998-03` (Élder Jackson, 1998-03 → 2000-01) — 2000-02
- S Ramos → `s-ramos-1998-12` (Síster Ramos, 1998-12 → 2000-04) — 2000-05
- E Ferraz → `e-ferraz-2000-06` (Élder Ferraz, 2000-06 → 2000-05) — 2000-06
- S Soares → `s-soares-2000-06` (Síster Soares, 2000-06 → 2000-05) — 2000-06
- E Curitima → `e-curitima-2000-06` (Élder Curitima, 2000-06 → 2000-05) — 2000-06
- E Filter → `e-filter-2000-06` (Élder Filter, 2000-06 → 2000-05) — 2000-06
- S dos Santos → `s-dos-santos-2000-06` (Síster dos Santos, 2000-06 → 2000-05) — 2000-06
- S Roberta → `s-roberta-2000-06` (Síster Roberta, 2000-06 → 2000-05) — 2000-06

## D. Iniciais só de um lado

Sugestão: acrescentar a inicial na Plaqueta (ou na planilha) para casar exatamente.

- E C Leite → `e-leite-x` (Élder Leite, ? → ?) — 14×
- E B Allen → `e-allen-1998-03` (Élder Allen, 1998-03 → 2000-01) — 9×
- E K Jackson → `e-jackson-1998-03` (Élder Jackson, 1998-03 → 2000-01) — 8×
- E D Thomas → `e-thomas-1998-12` (Élder Thomas, 1998-12 → 2000-10) — 6×
- E E Johnson → `e-johnson-1998-04` (Élder Johnson, 1998-04 → 2000-02) — 5×
- E A Cornwall → `e-cornwall-1998-12` (Élder Cornwall, 1998-12 → 2000-10) — 5×
- E B Pace → `e-pace-1999-04` (Élder Pace, 1999-04 → 2001-02) — 4×
- E B Young → `e-young-1999-07` (Élder Young, 1999-07 → 2001-05) — 4×
- E F Krüger → `e-kruger-1999-03` (Élder Krüger, 1999-03 → 2001-03) — 2×
- E A Santos → `e-santos-1997-02` (Élder Santos, 1997-02 → 1999-01) — 1×
- S A Silva → `s-silva-1997-06` (Síster Silva, 1997-06 → 1998-11) — 1×
- E R Fernandes → `e-fernandes-1996-05` (Élder Fernandes, 1996-05 → 1998-04) — 1×
- E F Alves → `e-alves-1997-10` (Élder Alves, 1997-10 → 1999-09) — 1×
- E J Santos → `e-santos-1997-02` (Élder Santos, 1997-02 → 1999-01) — 1×
- E da Silva → `e-f-da-silva-1997-04` (Élder F da Silva, 1997-04 → 1999-03) — 1×
- E de Oliveira → `e-j-de-oliveira-1997-04` (Élder J de Oliveira, 1997-04 → 1999-03) — 1×

## E1. Linhas duplicadas removidas (mesmos missionários)

- 1997-10 **Vacaria A**: mantida em Vacaria (linha 47), removida de Vergueiro (linha 58) — E Macedo, E Maciel

## E2. Áreas com mais de uma dupla (numeradas)

- 1999-01 Moinhos de Vento / **Porto Alegre 1**: #1 E Hereth, E Polacchini (linha 1086) · #2 E Barcellos, E Hathaway (linha 1087)
- 1999-10 Canoas / **Estância Velha**: #1 E Dornelas, E D Thomas (linha 1574) · #2 E Rossi, E Byram (linha 1575)
- 1999-11 Canoas / **Estância Velha**: #1 E Dornelas, E D Thomas (linha 1665) · #2 E Young, E Byram (linha 1666)
- 1999-12 Canoas / **Estância Velha**: #1 E Young, E Gull (linha 1755) · #2 E Gouvêa, E D Thomas (linha 1756)
- 2000-01 Canoas / **Estância Velha**: #1 E Young, E D Thomas (linha 1854) · #2 E Gouvea, E Gull (linha 1855)

## E3. Mesmo nome de área em zonas diferentes (não numeradas)

- 1998-10 **Rio Branco**: Caxias do Sul, Moinhos de Vento
- 1999-01 **Rio Branco**: Caxias do Sul, Moinhos de Vento
- 2000-03 **Rio Branco A**: Bento Gonçalves, Moinhos de Vento

## F. Repetições no mesmo quadro

- 1997-10 rótulo **E Lima** em Cachoerinha e Marau
- 1997-10 rótulo **E Vieira** em Cruz Alta Casal e Niterói
- 1997-11 rótulo **E Allen** em Farroupilha e Sapiranga
- 1997-11 rótulo **E Lima** em Cachoeirinha e Marau
- 1997-11 rótulo **E Vieira** em Cruz Alta Casal e Niterói
- 1997-11 rótulo **E Wilson** em Taquara e Élderes Viajantes
- 1997-12 rótulo **S Pereira** em Rio Branco e São Luis Casal
- 1997-12 rótulo **E Vieira** em Cruz Alta Casal e Niterói
- 1998-01 rótulo **E Vieira** em Cruz Alta Casal e Kephas
- 1998-02 rótulo **E J de Oliveira** em Alvorada A e Sapiranga
- 1998-02 rótulo **E Hespanha** em Alvorada A e Sapiranga
- 1998-04 rótulo **E Riches** em Cachoeirinha e Cachoeirinha B
- 1998-04 rótulo **E Houston** em Bela Vista e Guaíba Colina
- 1998-07 rótulo **E Fernandes** em Centro e Montenegro
- 1998-07 rótulo **E Bezerra** em Carazinho e Niterói
- 1998-08 rótulo **E Moraes** em Canudos e Kephas
- 1998-08 rótulo **E Bezerra** em Carazinho B e Niterói LD
- 1998-08 rótulo **E Pettingill** em Niterói LD e Niterói
- 1998-10 rótulo **S dos Santos** em Farroupilha e Erechim
- 1998-10 rótulo **S Garrido** em Erechim B e Guaíba Centro
- 1998-11 rótulo **S Santana** em Farroupilha e Lindóia
- 1997-10 pessoa `e-lima-1997-08` (Élder Lima, 1997-08 → 1999-07) em Cachoerinha e Marau
- 1997-10 pessoa `e-vieira-1996-04` (Élder Vieira, 1996-04 → 1998-03) em Cruz Alta Casal e Niterói
- 1997-11 pessoa `e-allen-1997-03` (Élder Allen, 1997-03 → 1999-01) em Farroupilha e Sapiranga
- 1997-11 pessoa `e-lima-1997-08` (Élder Lima, 1997-08 → 1999-07) em Cachoeirinha e Marau
- 1997-11 pessoa `e-vieira-1996-04` (Élder Vieira, 1996-04 → 1998-03) em Cruz Alta Casal e Niterói
- 1997-12 pessoa `s-pereira-1996-08` (Síster Pereira, 1996-08 → 1998-01) em Rio Branco e São Luis Casal
- 1997-12 pessoa `e-vieira-1996-04` (Élder Vieira, 1996-04 → 1998-03) em Cruz Alta Casal e Niterói
- 1998-01 pessoa `e-vieira-1996-04` (Élder Vieira, 1996-04 → 1998-03) em Cruz Alta Casal e Kephas
- 1998-02 pessoa `e-j-de-oliveira-1997-04` (Élder J de Oliveira, 1997-04 → 1999-03) em Alvorada A e Sapiranga
- 1998-02 pessoa `e-hespanha-1997-11` (Élder Hespanha, 1997-11 → 1999-10) em Alvorada A e Sapiranga
- 1998-03 pessoa `e-fernandes-1996-05` (Élder Fernandes, 1996-05 → 1998-04) em Ijuí e Cruz Alta Oeste
- 1998-03 pessoa `e-alves-1997-10` (Élder Alves, 1997-10 → 1999-09) em Canudos e Primavera
- 1998-03 pessoa `s-silva-1997-06` (Síster Silva, 1997-06 → 1998-11) em Canela e Lindóia
- 1998-03 pessoa `e-santos-1997-02` (Élder Santos, 1997-02 → 1999-01) em Caxias 1 e Leopoldina
- 1998-04 pessoa `e-riches-1997-10` (Élder Riches, 1997-10 → 1999-08) em Cachoeirinha e Cachoeirinha B
- 1998-04 pessoa `s-t-alves-1998-05` (Síster T Alves, 1998-05 → 1999-10) em Estância Velha e Duque
- 1998-04 pessoa `e-santos-1997-02` (Élder Santos, 1997-02 → 1999-01) em Moreira César e Osório B
- 1998-04 pessoa `e-houston-1997-12` (Élder Houston, 1997-12 → 1999-10) em Bela Vista e Guaíba Colina
- 1998-04 pessoa `e-f-da-silva-1997-04` (Élder F da Silva, 1997-04 → 1999-03) em Vacaria B e Eldorado
- 1998-07 pessoa `e-fernandes-1998-05` (Élder Fernandes, 1998-05 → 2000-04) em Centro e Montenegro
- 1998-07 pessoa `e-bezerra-1996-12` (Élder Bezerra, 1996-12 → 1998-11) em Carazinho e Niterói
- 1998-08 pessoa `e-moraes-1998-05` (Élder Moraes, 1998-05 → 2000-04) em Canudos e Kephas
- 1998-08 pessoa `e-bezerra-1996-12` (Élder Bezerra, 1996-12 → 1998-11) em Carazinho B e Niterói LD
- 1998-08 pessoa `e-pettingill-1997-09` (Élder Pettingill, 1997-09 → 1999-08) em Niterói LD e Niterói
- 1998-10 pessoa `s-dos-santos-1998-09` (Síster dos Santos, 1998-09 → 2000-03) em Farroupilha e Erechim
- 1998-10 pessoa `s-garrido-1998-02` (Síster Garrido, 1998-02 → 1999-08) em Erechim B e Guaíba Centro
- 1998-11 pessoa `s-santana-1998-05` (Síster Santana, 1998-05 → 1999-09) em Farroupilha e Lindóia
- 2000-03 pessoa `e-young-1999-07` (Élder Young, 1999-07 → 2001-05) em Guaraní e Assistente

## G. Zonas fora do mapa de correções / avisos

- zona sem entrada em `zonas`: Canoas (ok se o nome já estiver correto)
- zona sem entrada em `zonas`: Ijuí (ok se o nome já estiver correto)
- zona sem entrada em `zonas`: Montenegro (ok se o nome já estiver correto)
- zona sem entrada em `zonas`: Gravataí (ok se o nome já estiver correto)
- zona sem entrada em `zonas`: Novo Hamburgo (ok se o nome já estiver correto)
- zona sem entrada em `zonas`: Vacaria (ok se o nome já estiver correto)
- zona sem entrada em `zonas`: Passo Fundo (ok se o nome já estiver correto)
- zona sem entrada em `zonas`: Vergueiro (ok se o nome já estiver correto)
- zona sem entrada em `zonas`: São Leopoldo (ok se o nome já estiver correto)
- zona sem entrada em `zonas`: Osório (ok se o nome já estiver correto)
- zona sem entrada em `zonas`: Santo Ângelo (ok se o nome já estiver correto)
- zona sem entrada em `zonas`: Moinhos de Vento (ok se o nome já estiver correto)
- zona sem entrada em `zonas`: Assistentes (ok se o nome já estiver correto)
- zona sem entrada em `zonas`: Bento Gonçalves (ok se o nome já estiver correto)
- zona sem entrada em `zonas`: Taquara (ok se o nome já estiver correto)
- zona sem entrada em `zonas`: Staff (ok se o nome já estiver correto)
- zona sem entrada em `zonas`: Erechim (ok se o nome já estiver correto)
- zona sem entrada em `zonas`: Guaíba (ok se o nome já estiver correto)
- zona sem entrada em `zonas`: Capão da Canoa (ok se o nome já estiver correto)
