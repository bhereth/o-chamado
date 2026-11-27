# Como adicionar fotos e histórias ao site

Nada disso exige mexer em código. Depois de qualquer mudança, gere o site de novo com `quarto render` e publique.

## Fotos

1. Coloque o arquivo da foto na pasta **`images/fotos/`** (JPG ou PNG). Fotos de até ~2.000 px de largura e ~500 KB deixam o site leve.
2. Abra **`data/fotos.csv`** (no Excel ou num editor de texto) e acrescente **uma linha** para a foto:

| coluna | o que pôr | exemplo |
|---|---|---|
| `arquivo` | nome do arquivo, a partir de `images/` | `fotos/canoas-1998.jpg` |
| `secao` | onde a foto aparece (lista abaixo) | `areas` |
| `mes` | opcional: mês da foto. Use `secao=missionarios` para exibir a foto em "Chegadas e saídas" nesse mês. | `1999-08` |
| `legenda_pt` | legenda em português | `Batismo em Canoas.` |
| `legenda_en` | legenda em inglês | `A baptism in Canoas.` |
| `cortesia` | quem tirou ou mandou a foto | `Élder Hereth` |
| `link` | opcional: link da fonte, se a foto veio de um site | |
| `licenca` | opcional: licença, para fotos do Wikimedia Commons etc. | `CC BY-SA 4.0` |
| `na_secao` | `sim` para mostrar a foto no fim da seção; `não` se ela já está colocada à mão no site | `sim` |
| `tags` | opcional: vínculos com áreas, zonas ou pessoas, separados por `;` | `area:gramado;zone:caxias do sul` |

**Seções:** `inicio` (carrossel do topo; colocado à mão), `missao`, `areas`, `missionarios`, `templo`, `jornais`, `fotos` (só na seção Fotos), `historias`, `reencontros`, `woodwards`, `contato`.

Toda foto da planilha também aparece na seção **Fotos**, que mostra todas em ordem aleatória.

### Tags: fotos nos quadros e nos detalhes dos missionários

Copie os identificadores de **`data/photo-tag-reference.csv`**, gerado automaticamente a cada renderização. Ele lista a tag, o nome e o contexto (zonas de uma área ou datas de um missionário). Não edite esse arquivo: edite a coluna `tags` de `fotos.csv`.

- `area:marau`: câmera ao lado da área no quadro e botão no histórico da área.
- `zone:caxias do sul`: câmera ao lado do nome da zona, inclusive nos cartões fechados do celular.
- `missionary:e-hereth-1997-10`: botão Fotos nos detalhes desse missionário; nenhum ícone junto ao nome dele no quadro.
- Combine tags com ponto e vírgula: `area:gramado;zone:caxias do sul`. A mesma foto pode estar em várias galerias sem duplicação.
- Para fotos de grupo na jornada, preencha `mes` e inclua `arrival:1997-10` ou `departure:1999-08` em `tags`, usando o mesmo mês. A câmera aparece no escritório quando a jornada chega à etapa correspondente.

As tags são independentes: uma tag de área não marca automaticamente todas as zonas onde ela esteve. No quadro de transferências, as câmeras mostram fotos sem data e fotos do mês selecionado. As galerias abertas na jornada ou nos detalhes mostram todas as fotos vinculadas. `na_secao=não` não esconde fotos das galerias por tag.

Use a identidade exata para missionários com o mesmo nome e para áreas ambíguas. Por exemplo, `area:rio branco|poa` e `area:rio branco|serra` são áreas diferentes. Tags conhecidas inválidas ou ambíguas interrompem a geração com uma mensagem e sugestões, em vez de ligar a foto ao lugar errado. Iniciais, autoria e cortesia nunca são usadas para deduzir quem aparece numa foto.

Outros tipos, como `event:natal-1997`, são aceitos e indexados, mas só passam a aparecer em um novo local quando esse tipo ganha uma regra de exibição. Os tipos internos são `area`, `zone` e `missionary`; também são aceitos `zona` e `missionario`. Se seu CSV usa `;` como separador de colunas, coloque entre aspas o campo que contém várias tags.

Para verificar a lógica: `node --test scripts/photo-tags.test.mjs`. Para atualizar a referência sem renderizar: `node scripts/build-conteudo.mjs` (depois de atualizar `quadro.json` com `node scripts/build-data.mjs`, se os registros mudaram).

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
