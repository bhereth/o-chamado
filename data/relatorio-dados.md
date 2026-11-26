# Relatório dos dados do quadro de transferências

Gerado por `node scripts/build-data.mjs`. Corrija a planilha ou `data/correcoes.json` e rode de novo.

- Quadros (meses): 27
- Nomes no total: 4773
- exato: 4287
- inferido: 214
- sem-iniciais: 58
- sem-registro: 165
- tolerancia: 49

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
- **E Poulsen** 14× (1999-03 … 2000-06; ex.: 1999-03 Osório / Osório A) — parecidos: Élder Paulsen (1999-02 → 2000-12)
- **E Lima** 9× (1997-10 … 2000-06; ex.: 1997-10 Vergueiro / Marau A) — parecidos: Élder Lima (1997-08 → 1999-07)
- **S Sena** 8× (1997-10 … 1999-04; ex.: 1997-10 Osório / Tramandaí A) — provavelmente falta em missionarios.json
- **S da Cunha** 8× (1998-04 … 1999-03; ex.: 1998-04 São Leopoldo / Duque B) — provavelmente falta em missionarios.json
- **S Garcia** 7× (1999-12 … 2000-06; ex.: 1999-12 Osório / Tramandaí A) — parecidos: Síster Faria (1999-08 → 2001-01); Síster Garcia (1998-05 → 1999-10)
- **S Alves** 6× (1997-10 … 1998-03; ex.: 1997-10 Osório / Capão da Canoa A) — parecidos: Síster Alves (1999-11 → ?); Síster T Alves (1998-05 → 1999-10)
- **E Aviz** 5× (1997-12 … 1998-04; ex.: 1997-12 Caxias do Sul / Moreira César A) — parecidos: Élder Aviz (1997-11 → 1997-10)
- **S Pereira** 5× (1997-12 … 1998-08; ex.: 1997-12 Santo Ângelo / São Luiz Casal) — parecidos: Síster Ferreira (1996-03 → 1997-08); Síster Ferreira (1999-12 → 2001-04); Síster Pereira (1996-08 → 1998-01); Síster Pereira (1999-03 → 2000-08)
- **E Cristiano** 5× (2000-02 … 2000-06; ex.: 2000-02 São Leopoldo / Feitoria) — provavelmente falta em missionarios.json
- **S Vieira** 4× (1997-10 … 1998-01; ex.: 1997-10 Ijuí / Cruz Alta Casal) — parecidos: Síster Veiga (1997-02 → 1998-07)
- **E Vieira** 4× (1997-10 … 1998-01; ex.: 1997-10 Moinhos de Vento / Niterói A) — parecidos: Élder Vieira (1996-04 → 1998-03)
- **E Peterson** 2× (1997-10 … 1997-12; ex.: 1997-10 Novo Hamburgo / Primavera A) — parecidos: Élder Patterson (1997-03 → 1999-01); Élder Petersen (1996-09 → 1998-07)
- **E Bezerra** 2× (1998-07 … 1998-08; ex.: 1998-07 Vergueiro / Carazinho A) — parecidos: Élder Bezerra (1996-12 → 1998-11)
- **E Carneiro** 1× (1997-10; ex.: 1997-10 Ijuí / Palmeira A) — parecidos: Élder Carneiro (1998-04 → 2000-03); Élder Cordeiro (1999-12 → 2001-11)
- **E Allen** 1× (1997-11; ex.: 1997-11 Caxias do Sul / Farroupilha A) — parecidos: Élder Alger (1997-07 → 1999-05); Élder Allen (1997-03 → 1999-01); Élder Allen (1998-03 → 2000-01); Élder Alves (1997-10 → 1999-09); Élder Alves (1999-08 → 2001-07)
- **E Erekson** 1× (1997-11; ex.: 1997-11 Vergueiro / Carazinho A) — parecidos: Élder Erekson (1995-11 → 1997-09); Élder Erikson (1997-03 → 1999-01)
- **E J de Oliveira** 1× (1998-02; ex.: 1998-02 Gravataí / Alvorada A) — parecidos: Élder de Oliveira (1996-08 → 1998-07); Élder de Oliveira (1998-10 → 2000-09); Élder J de Oliveira (1997-04 → 1999-03)
- **E Hespanha** 1× (1998-02; ex.: 1998-02 Gravataí / Alvorada A) — parecidos: Élder Hespanha (1997-11 → 1999-10)
- **S Chavier** 1× (1998-02; ex.: 1998-02 Porto Alegre / Lindóia) — parecidos: Síster Chaves (1998-02 → 1999-08); Síster Xavier (1998-02 → 1999-08)
- **E Midões** 1× (1998-04; ex.: 1998-04 Ijuí / Cruz Alta) — parecidos: Élder Midões (1997-03 → 1998-02)
- **E Riches** 1× (1998-04; ex.: 1998-04 Gravataí / Cachoeirinha B) — parecidos: Élder Riches (1997-10 → 1999-08)
- **S T Alves** 1× (1998-04; ex.: 1998-04 São Leopoldo / Duque A) — parecidos: Síster Alves (1999-11 → ?); Síster T Alves (1998-05 → 1999-10)
- **E Houston** 1× (1998-04; ex.: 1998-04 Moinhos de Vento / Guaíba Colina) — parecidos: Élder Houston (1997-12 → 1999-10)
- **E Moraes** 1× (1998-08; ex.: 1998-08 Novo Hamburgo / Canudos) — parecidos: Élder Borges (1997-03 → 1999-02); Élder McRae (1996-01 → 1997-11); Élder Moraes (1998-05 → 2000-04); Élder Morris (1999-12 → 2001-10)
- **E Pettingill** 1× (1998-08; ex.: 1998-08 Moinhos de Vento / Niterói LD) — parecidos: Élder Pettingill (1997-09 → 1999-08)
- **S Garrido** 1× (1998-10; ex.: 1998-10 Moinhos de Vento / Guaíba Centro) — parecidos: Síster Garrido (1998-02 → 1999-08)
- **S Santana** 1× (1998-11; ex.: 1998-11 Porto Alegre / Lindóia) — parecidos: Síster Santana (1998-05 → 1999-09)
- **S Gibson** 1× (1998-11; ex.: 1998-11 Porto Alegre / Parque dos Maias) — parecidos: Síster Gibson (1997-07 → 1998-09)
- **E Dartora** 1× (1999-05; ex.: 1999-05 Porto Alegre / Humaitá) — parecidos: Élder Dartora (1997-04 → 1999-03)
- **E Morais** 1× (1999-10; ex.: 1999-10 Passo Fundo / Marau B) — parecidos: Élder Moraes (1998-05 → 2000-04); Élder Morris (1999-12 → 2001-10); Élder Norris (1995-10 → 1997-08)
- **E Retjen** 1× (1999-12; ex.: 1999-12 Gravataí / Vista Alegre) — parecidos: Élder Redden (1998-11 → 2000-09); Élder Tietjen (1999-10 → 2001-08)
- **E Roos** 1× (1999-12; ex.: 1999-12 Vergueiro / Medianeira B) — parecidos: Élder Cook (1999-11 → 2001-09); Élder Cook (2000-04 → 2002-02); Élder Loosi (? → ?); Élder Reis (1997-12 → 1999-12); Élder Ross (1999-11 → 2001-09)
- **E Hall** 1× (2000-01; ex.: 2000-01 Taquara / Sapiranga A) — parecidos: Élder Call (1996-01 → 1997-11); Élder Gull (1999-09 → 2001-07); Élder Hall (1997-10 → 1999-08); Élder Heil (1999-11 → 2001-09); Élder Hill (1999-01 → 2000-11)

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
- E de Oliveira → `e-j-de-oliveira-1997-04` (Élder J de Oliveira, 1997-04 → 1999-03) — 1×

## E1. Linhas duplicadas removidas (mesmos missionários)

- 1997-10 **Vacaria A**: mantida em Vacaria (linha 47), removida de Vergueiro (linha 58) — E Macedo, E Maciel

## E2. Áreas com mais de uma dupla (numeradas)


## E3. Mesmo nome de área em zonas diferentes (não numeradas)

- 1997-10 **Rio Branco A**: Caxias do Sul, Moinhos de Vento
- 1997-11 **Rio Branco A**: Caxias do Sul, Moinhos de Vento
- 1997-12 **Rio Branco A**: Caxias do Sul, Moinhos de Vento
- 1998-01 **Rio Branco A**: Caxias do Sul, Moinhos de Vento
- 1998-02 **Rio Branco A**: Caxias do Sul, Moinhos de Vento
- 1998-03 **Rio Branco A**: Caxias do Sul, Moinhos de Vento
- 1998-04 **Rio Branco A**: Caxias do Sul, Moinhos de Vento
- 1998-07 **Rio Branco A**: Caxias do Sul, Moinhos de Vento
- 1998-08 **Rio Branco A**: Caxias do Sul, Moinhos de Vento
- 1998-09 **Rio Branco A**: Caxias do Sul, Moinhos de Vento
- 1998-10 **Rio Branco A**: Caxias do Sul, Moinhos de Vento
- 1998-11 **Rio Branco A**: Caxias do Sul, Moinhos de Vento
- 1999-01 **Rio Branco A**: Caxias do Sul, Moinhos de Vento
- 1999-03 **Rio Branco A**: Caxias do Sul, Moinhos de Vento
- 1999-04 **Rio Branco A**: Caxias do Sul, Moinhos de Vento
- 1999-05 **Rio Branco A**: Caxias do Sul, Moinhos de Vento
- 1999-06 **Rio Branco A**: Caxias do Sul, Moinhos de Vento
- 1999-07 **Rio Branco A**: Caxias do Sul, Moinhos de Vento
- 1999-10 **Rio Branco A**: Caxias do Sul, Moinhos de Vento
- 1999-11 **Rio Branco A**: Caxias do Sul, Moinhos de Vento
- 1999-12 **Rio Branco A**: Caxias do Sul, Moinhos de Vento
- 2000-01 **Rio Branco A**: Bento Gonçalves, Moinhos de Vento
- 2000-03 **Rio Branco A**: Bento Gonçalves, Moinhos de Vento
- 2000-04 **Rio Branco A**: Caxias do Sul, Moinhos de Vento
- 2000-05 **Rio Branco A**: Caxias do Sul, Moinhos de Vento
- 2000-06 **Rio Branco A**: Caxias do Sul, Moinhos de Vento

## F. Repetições no mesmo quadro

- 1997-10 rótulo **E Lima** em Cachoeirinha A e Marau A
- 1997-10 rótulo **E Vieira** em Cruz Alta Casal e Niterói A
- 1997-11 rótulo **E Allen** em Farroupilha A e Sapiranga A
- 1997-11 rótulo **E Lima** em Cachoeirinha A e Marau A
- 1997-11 rótulo **E Vieira** em Cruz Alta Casal e Niterói A
- 1997-11 rótulo **E Wilson** em Taquara A e Élderes Viajantes
- 1997-12 rótulo **S Pereira** em Rio Branco A e São Luiz Casal
- 1997-12 rótulo **E Vieira** em Cruz Alta Casal e Niterói A
- 1998-01 rótulo **E Vieira** em Cruz Alta Casal e Kephas
- 1998-02 rótulo **E J de Oliveira** em Alvorada A e Sapiranga A
- 1998-02 rótulo **E Hespanha** em Alvorada A e Sapiranga A
- 1998-04 rótulo **E Riches** em Cachoeirinha A e Cachoeirinha B
- 1998-04 rótulo **E Houston** em Bela Vista e Guaíba Colina
- 1998-07 rótulo **E Fernandes** em Centro e Montenegro
- 1998-07 rótulo **E Bezerra** em Carazinho A e Niterói A
- 1998-08 rótulo **E Moraes** em Canudos e Kephas
- 1998-08 rótulo **E Bezerra** em Carazinho B e Niterói LD
- 1998-08 rótulo **E Pettingill** em Niterói LD e Niterói A
- 1998-10 rótulo **S dos Santos** em Farroupilha A e Erechim A
- 1998-10 rótulo **S Garrido** em Erechim B e Guaíba Centro
- 1998-11 rótulo **S Santana** em Farroupilha A e Lindóia

## F2. Mesma pessoa em duas áreas no mesmo quadro (resolvido automaticamente)

Uma pessoa só pode estar numa área por mês. Ficou com a área que continua a zona dos meses vizinhos.

- 1997-10 `e-vieira-1996-04` (Élder Vieira, 1996-04 → 1998-03): fica em Cruz Alta Casal; E Vieira em Niterói A → sem registro
- 1997-10 `e-lima-1997-08` (Élder Lima, 1997-08 → 1999-07): fica em Cachoeirinha A; E Lima em Marau A → sem registro
- 1997-11 `e-allen-1997-03` (Élder Allen, 1997-03 → 1999-01): fica em Sapiranga A; E Allen em Farroupilha A → sem registro
- 1997-11 `e-vieira-1996-04` (Élder Vieira, 1996-04 → 1998-03): fica em Cruz Alta Casal; E Vieira em Niterói A → sem registro
- 1997-11 `e-lima-1997-08` (Élder Lima, 1997-08 → 1999-07): fica em Cachoeirinha A; E Lima em Marau A → sem registro
- 1997-12 `s-pereira-1996-08` (Síster Pereira, 1996-08 → 1998-01): fica em Rio Branco A; S Pereira em São Luiz Casal → sem registro
- 1997-12 `e-vieira-1996-04` (Élder Vieira, 1996-04 → 1998-03): fica em Cruz Alta Casal; E Vieira em Niterói A → sem registro
- 1998-01 `e-vieira-1996-04` (Élder Vieira, 1996-04 → 1998-03): fica em Cruz Alta Casal; E Vieira em Kephas → sem registro
- 1998-02 `e-j-de-oliveira-1997-04` (Élder J de Oliveira, 1997-04 → 1999-03): fica em Sapiranga A; E J de Oliveira em Alvorada A → sem registro
- 1998-02 `e-hespanha-1997-11` (Élder Hespanha, 1997-11 → 1999-10): fica em Sapiranga A; E Hespanha em Alvorada A → sem registro
- 1998-03 `e-santos-1997-02` (Élder Santos, 1997-02 → 1999-01): fica em Leopoldina A; E A Santos em Caxias → `e-a-santos-1998-04` (Élder A Santos, 1998-04 → 2000-03)
- 1998-03 `s-silva-1997-06` (Síster Silva, 1997-06 → 1998-11): fica em Lindóia; S A Silva em Canela A → `s-a-silva-1998-04` (Síster A Silva, 1998-04 → 1999-09)
- 1998-03 `e-fernandes-1996-05` (Élder Fernandes, 1996-05 → 1998-04): fica em Ijuí; E R Fernandes em Cruz Alta Oeste → `e-r-fernandes-1998-04` (Élder R Fernandes, 1998-04 → 2000-03)
- 1998-03 `e-alves-1997-10` (Élder Alves, 1997-10 → 1999-09): fica em Primavera A; E F Alves em Canudos → `e-f-alves-1998-04` (Élder F Alves, 1998-04 → 2000-03)
- 1998-04 `s-t-alves-1998-05` (Síster T Alves, 1998-05 → 1999-10): fica em Estância Velha A; S T Alves em Duque A → sem registro
- 1998-04 `e-houston-1997-12` (Élder Houston, 1997-12 → 1999-10): fica em Bela Vista; E Houston em Guaíba Colina → sem registro
- 1998-04 `e-santos-1997-02` (Élder Santos, 1997-02 → 1999-01): fica em Moreira César A; E J Santos em Osório B → `e-j-santos-1998-05` (Élder J Santos, 1998-05 → 2000-04)
- 1998-04 `e-riches-1997-10` (Élder Riches, 1997-10 → 1999-08): fica em Cachoeirinha A; E Riches em Cachoeirinha B → sem registro
- 1998-04 `e-f-da-silva-1997-04` (Élder F da Silva, 1997-04 → 1999-03): fica em Vacaria B; E da Silva em Eldorado do Sul A → `e-da-silva-1998-05` (Élder da Silva, 1998-05 → 2000-04)
- 1998-07 `e-fernandes-1998-05` (Élder Fernandes, 1998-05 → 2000-04): fica em Centro; E Fernandes em Montenegro → `e-r-fernandes-1998-04` (Élder R Fernandes, 1998-04 → 2000-03)
- 1998-07 `e-bezerra-1996-12` (Élder Bezerra, 1996-12 → 1998-11): fica em Niterói A; E Bezerra em Carazinho A → sem registro
- 1998-08 `e-moraes-1998-05` (Élder Moraes, 1998-05 → 2000-04): fica em Kephas; E Moraes em Canudos → sem registro
- 1998-08 `e-bezerra-1996-12` (Élder Bezerra, 1996-12 → 1998-11): fica em Niterói LD; E Bezerra em Carazinho B → sem registro
- 1998-08 `e-pettingill-1997-09` (Élder Pettingill, 1997-09 → 1999-08): fica em Niterói A; E Pettingill em Niterói LD → sem registro
- 1998-10 `s-dos-santos-1998-09` (Síster dos Santos, 1998-09 → 2000-03): fica em Erechim A; S dos Santos em Farroupilha A → `s-dos-santos-1997-04` (Síster dos Santos, 1997-04 → 1998-09)
- 1998-10 `s-garrido-1998-02` (Síster Garrido, 1998-02 → 1999-08): fica em Erechim B; S Garrido em Guaíba Centro → sem registro
- 1998-11 `s-santana-1998-05` (Síster Santana, 1998-05 → 1999-09): fica em Farroupilha A; S Santana em Lindóia → sem registro
- 2000-03 `e-young-1999-07` (Élder Young, 1999-07 → 2001-05): fica em Guarani; E Young em Assistente → `e-young-1998-04` (Élder Young, 1998-04 → 2000-02)

## G. Avisos

