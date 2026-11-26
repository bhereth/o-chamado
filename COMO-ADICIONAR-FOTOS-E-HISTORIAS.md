# Como adicionar fotos e histórias ao site

Nada disso exige mexer em código. Depois de qualquer mudança, gere o site de novo com `quarto render` e publique.

## Fotos

1. Coloque o arquivo da foto na pasta **`images/fotos/`** (JPG ou PNG). Fotos de até ~2.000 px de largura e ~500 KB deixam o site leve.
2. Abra **`data/fotos.csv`** (no Excel ou num editor de texto) e acrescente **uma linha** para a foto:

| coluna | o que pôr | exemplo |
|---|---|---|
| `arquivo` | nome do arquivo, a partir de `images/` | `fotos/canoas-1998.jpg` |
| `secao` | onde a foto aparece (lista abaixo) | `areas` |
| `mes` | opcional: mês da foto, se for de um mês específico; ela aparece em "Chegadas e saídas" nesse mês | `1999-08` |
| `legenda_pt` | legenda em português | `Batismo em Canoas.` |
| `legenda_en` | legenda em inglês | `A baptism in Canoas.` |
| `cortesia` | quem tirou ou mandou a foto | `Élder Hereth` |
| `link` | opcional: link da fonte, se a foto veio de um site | |
| `licenca` | opcional: licença, para fotos do Wikimedia Commons etc. | `CC BY-SA 4.0` |
| `na_secao` | `sim` para mostrar a foto no fim da seção; `não` se ela já está colocada à mão no site | `sim` |

**Seções:** `inicio` (carrossel do topo; colocado à mão), `missao`, `areas`, `missionarios`, `templo`, `jornais`, `fotos` (só na seção Fotos), `historias`, `reencontros`, `woodwards`, `contato`.

Toda foto da planilha também aparece na seção **Fotos**, que mostra todas em ordem aleatória.

O crédito é montado sozinho:
- sem licença nem link → "Foto: cortesia do Élder Hereth" / "Photo courtesy of Elder Hereth";
- com link e sem licença → "Foto: Church News, 2007";
- com licença → "Foto: Ricardo630, Wikimedia Commons, CC BY 3.0".

Ao gerar o site, o terminal mostra `[build-conteudo] N fotos, N histórias` e avisa (⚠) se algum arquivo não existe, se a seção está errada ou se o mês não foi reconhecido.

Antes de publicar uma foto com pessoas, confirme que quem mandou concorda com a publicação. Só cite nomes na legenda com a permissão da pessoa. Se alguém pedir para tirar uma foto ou o nome, apague a linha da planilha (ou o nome da legenda) e gere o site de novo. A seção Fotos avisa isso aos visitantes.

## Histórias

1. Copie **`historias/_modelo.md`** com um nome novo, por exemplo `historias/1998-chuva-em-canoas.md`.
2. Troque os campos do topo (`titulo`, `autor`, `ano`, `area`, `idioma`) e escreva a história embaixo, com uma linha em branco entre os parágrafos.
3. Gere o site de novo.

As histórias aparecem na seção **Histórias**, em ordem de ano. Arquivos que começam com `_` são ignorados.

O botão "Mandar uma história" abre um e-mail para info@ochamado.org com um modelo: título, nome na missão, ano, área, a história e a autorização para publicar. Quando chegar uma, é só passá-la para um arquivo como acima.
