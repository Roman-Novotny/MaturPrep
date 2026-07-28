// Maturitní témata z matematiky – všech 12 témat plně rozepsáno
// (vzorce, klíčové pojmy, checklist, řešené příklady, kvíz, kartičky).

export const CATEGORY_COLORS = {
  Algebra: '#3b82f6',
  Funkce: '#10b981',
  Geometrie: '#f59e0b',
  Statistika: '#a855f7',
};

export const ALL_TOPICS = [
  {
    id: 'vyrazy',
    number: 1,
    title: 'Výrazy a jejich úpravy',
    category: 'Algebra',
    difficulty: 'easy',
    summary: 'Algebraický výraz upravujeme pomocí vzorců pro mocniny a rozklad na součin (vytýkání, $(a\\pm b)^2$, rozdíl čtverců). U lomených výrazů navíc určujeme podmínky, kdy mají smysl.',
    terms: ['mnohočlen', 'vytýkání', 'lomený výraz', 'absolutní hodnota', 'podmínky řešitelnosti'],
    formulas: [
      { name: 'Vzorec (a+b)²', latex: '(a+b)^2=a^2+2ab+b^2' },
      { name: 'Vzorec (a-b)²', latex: '(a-b)^2=a^2-2ab+b^2' },
      { name: 'Rozdíl čtverců', latex: 'a^2-b^2=(a-b)(a+b)' },
      { name: 'Mocnina součinu', latex: '(ab)^n=a^n b^n' },
    ],
    subtopics: [
      'Umím roznásobit a upravit mnohočlen',
      'Umím použít vzorce (a±b)² a rozdíl čtverců',
      'Umím vytknout společný činitel',
      'Umím určit podmínky, za kterých má lomený výraz smysl',
      'Umím zjednodušit lomený výraz krácením',
      'Umím pracovat s absolutní hodnotou čísla',
    ],
    workedExamples: [
      {
        problem: 'Zjednodušte výraz $(x+3)^2-(x-2)(x+2)$.',
        steps: [
          'Roznásobíme $(x+3)^2=x^2+6x+9$ pomocí vzorce $(a+b)^2$.',
          'Roznásobíme $(x-2)(x+2)=x^2-4$ pomocí vzorce rozdílu čtverců.',
          'Dosadíme: $(x^2+6x+9)-(x^2-4)$.',
          'Po úpravě: $x^2+6x+9-x^2+4=6x+13$.',
        ],
        answer: '6x+13',
      },
      {
        problem: 'Určete podmínky řešitelnosti a zjednodušte výraz $\\dfrac{x^2-9}{x^2-3x}$.',
        steps: [
          'Jmenovatel $x^2-3x=x(x-3)$ nesmí být roven nule, tedy $x\\neq 0$ a $x\\neq 3$.',
          'Čitatel rozložíme pomocí rozdílu čtverců: $x^2-9=(x-3)(x+3)$.',
          'Jmenovatel rozložíme vytknutím: $x^2-3x=x(x-3)$.',
          'Výraz se zkrátí na $\\dfrac{(x-3)(x+3)}{x(x-3)}=\\dfrac{x+3}{x}$.',
        ],
        answer: '\\dfrac{x+3}{x},\\ x\\neq 0,\\ x\\neq 3',
      },
    ],
    quiz: [
      {
        question: 'Čemu se rovná $(a-b)^2$?',
        options: ['a^2-b^2', 'a^2-2ab+b^2', 'a^2+2ab+b^2', 'a^2-ab+b^2'],
        correctIndex: 1,
      },
      {
        question: 'Rozložte $a^2-16$ na součin.',
        options: ['(a-4)(a+4)', '(a-8)(a+8)', '(a-4)^2', 'nelze rozložit'],
        correctIndex: 0,
      },
      {
        question: 'Za jaké podmínky má výraz $\\dfrac{1}{x-5}$ smysl?',
        options: ['x ≠ 5', 'x ≠ 0', 'x ≠ -5', 'pro všechna x'],
        correctIndex: 0,
      },
      {
        question: 'Zjednodušte $(2x)^3$.',
        options: ['2x^3', '8x^3', '6x^3', '8x'],
        correctIndex: 1,
      },
      {
        question: 'Kolik je $|-7|+|3|$?',
        options: ['10', '-4', '4', '-10'],
        correctIndex: 0,
      },
    ],
    flashcards: [
      { front: '$(a+b)^2$', back: '$a^2+2ab+b^2$' },
      { front: '$(a-b)^2$', back: '$a^2-2ab+b^2$' },
      { front: 'Rozdíl čtverců $a^2-b^2$', back: '$(a-b)(a+b)$' },
      { front: 'Definice $|x|$', back: 'Vzdálenost čísla x od nuly na číselné ose (vždy nezáporná)' },
      { front: 'Kdy lomený výraz nemá smysl?', back: 'Když se jmenovatel rovná nule' },
      { front: '$(ab)^n$', back: '$a^n b^n$' },
    ],
  },
  {
    id: 'linearni-rovnice',
    number: 2,
    title: 'Lineární rovnice a nerovnice',
    category: 'Algebra',
    difficulty: 'easy',
    summary: 'Lineární rovnice má tvar $ax+b=0$ s $a\\neq 0$ a řešíme ji úpravou na tvar $x=\\ldots$. Nerovnice řešíme stejně, ale při násobení nebo dělení záporným číslem se otočí znak nerovnosti.',
    terms: ['ekvivalentní úprava', 'lineární rovnice', 'lineární nerovnice', 'interval řešení', 'otočení znaku nerovnosti'],
    formulas: [
      { name: 'Obecný tvar rovnice', latex: 'ax+b=0,\\quad a\\neq 0' },
      { name: 'Řešení rovnice', latex: 'x=-\\dfrac{b}{a}' },
    ],
    subtopics: [
      'Umím vyřešit lineární rovnici převodem na tvar x=...',
      'Umím ověřit výsledek zkouškou dosazením',
      'Umím vyřešit lineární nerovnici',
      'Umím zapsat řešení nerovnice jako interval',
      'Umím poznat, kdy se při úpravě nerovnice otáčí znak',
      'Umím řešit rovnici i nerovnici se zlomky',
    ],
    workedExamples: [
      {
        problem: 'Řešte rovnici $3(x-2)+5=2x+7$.',
        steps: [
          'Roznásobíme levou stranu: $3x-6+5=2x+7$.',
          'Sečteme čísla vlevo: $3x-1=2x+7$.',
          'Převedeme neznámé na jednu stranu: $3x-2x=7+1$.',
          'Získáme $x=8$.',
        ],
        answer: 'x=8',
      },
      {
        problem: 'Řešte nerovnici $-2x+4\\leq 10$.',
        steps: [
          'Odečteme 4 od obou stran: $-2x\\leq 6$.',
          'Dělíme obě strany číslem $-2$ (záporné číslo), proto se otočí znak nerovnosti: $x\\geq -3$.',
          'Řešením je interval $x\\in[-3,+\\infty)$.',
        ],
        answer: 'x\\in[-3,+\\infty)',
      },
    ],
    quiz: [
      {
        question: 'Řešte rovnici $2x-6=0$.',
        options: ['x = 3', 'x = -3', 'x = 12', 'x = 0'],
        correctIndex: 0,
      },
      {
        question: 'Řešte nerovnici $x+5<2$.',
        options: ['x < -3', 'x > -3', 'x < 3', 'x > 3'],
        correctIndex: 0,
      },
      {
        question: 'Co se stane se znakem nerovnosti při násobení obou stran záporným číslem?',
        options: ['Nezmění se', 'Otočí se', 'Nerovnost zanikne', 'Změní se na rovnost'],
        correctIndex: 1,
      },
      {
        question: 'Řešte rovnici $\\dfrac{x}{2}+3=7$.',
        options: ['x = 8', 'x = 4', 'x = 2', 'x = 14'],
        correctIndex: 0,
      },
      {
        question: 'Zapište množinu řešení nerovnice $x\\geq 2$ jako interval.',
        options: ['[2, +∞)', '(2, +∞)', '(-∞, 2]', '{2}'],
        correctIndex: 0,
      },
    ],
    flashcards: [
      { front: 'Obecný tvar lineární rovnice', back: '$ax+b=0$' },
      { front: 'Řešení lineární rovnice', back: '$x=-\\dfrac{b}{a}$' },
      { front: 'Kdy se otáčí znak nerovnosti?', back: 'Při násobení nebo dělení záporným číslem' },
      { front: 'Zápis otevřeného intervalu (a,b)', back: 'Neobsahuje krajní body a, b' },
      { front: 'Zápis uzavřeného intervalu [a,b]', back: 'Obsahuje krajní body a, b' },
      { front: 'Co je ekvivalentní úprava?', back: 'Úprava, která nemění množinu řešení rovnice/nerovnice' },
    ],
  },
  {
    id: 'kvadraticke-rovnice',
    number: 3,
    title: 'Kvadratické rovnice a nerovnice',
    category: 'Algebra',
    difficulty: 'medium',
    summary: 'Kvadratická rovnice má tvar $ax^2+bx+c=0$ s $a\\neq0$. Řešíme ji přes diskriminant, Vietovy vzorce nebo rozklad na kořenové činitele; nerovnice pak pomocí grafu paraboly.',
    terms: ['diskriminant', 'kořen rovnice', 'Vietovy vzorce', 'parabola', 'kořenový činitel', 'ryze kvadratická rovnice'],
    formulas: [
      { name: 'Obecný tvar', latex: 'ax^2+bx+c=0,\\quad a\\neq 0' },
      { name: 'Diskriminant', latex: 'D=b^2-4ac' },
      { name: 'Kořeny (D ≥ 0)', latex: 'x_{1,2}=\\dfrac{-b\\pm\\sqrt{D}}{2a}' },
      { name: 'Vietovy vzorce', latex: 'x_1+x_2=-\\dfrac{b}{a},\\qquad x_1\\cdot x_2=\\dfrac{c}{a}' },
      { name: 'Rozklad na kořenové činitele', latex: 'ax^2+bx+c=a(x-x_1)(x-x_2)' },
    ],
    subtopics: [
      'Umím určit diskriminant a rozhodnout o počtu řešení',
      'Umím vypočítat kořeny pomocí vzorce',
      'Umím použít Vietovy vzorce',
      'Umím rozložit kvadratický výraz na součin kořenových činitelů',
      'Umím vyřešit ryze kvadratickou rovnici (bez lineárního členu)',
      'Umím vyřešit kvadratickou nerovnici pomocí grafu paraboly',
    ],
    workedExamples: [
      {
        problem: 'Řešte rovnici $x^2-5x+6=0$.',
        steps: [
          'Rovnice je v obecném tvaru $ax^2+bx+c=0$ s $a=1$, $b=-5$, $c=6$.',
          'Diskriminant: $D=b^2-4ac=(-5)^2-4\\cdot1\\cdot6=25-24=1$.',
          'Protože $D>0$, rovnice má dva různé reálné kořeny.',
          'Kořeny: $x_{1,2}=\\dfrac{-b\\pm\\sqrt{D}}{2a}=\\dfrac{5\\pm1}{2}$.',
          'Tedy $x_1=3$, $x_2=2$.',
        ],
        answer: 'x_1=3,\\ x_2=2',
      },
      {
        problem: 'Řešte nerovnici $x^2-x-6>0$.',
        steps: [
          'Nejprve najdeme nulové body odpovídající rovnice $x^2-x-6=0$.',
          'Diskriminant: $D=(-1)^2-4\\cdot1\\cdot(-6)=1+24=25$.',
          'Kořeny: $x_{1,2}=\\dfrac{1\\pm5}{2}$, tedy $x_1=-2$, $x_2=3$.',
          'Graf funkce $y=x^2-x-6$ je parabola s rameny nahoru ($a=1>0$), takže je kladná mimo interval kořenů.',
          'Řešení nerovnice: $x\\in(-\\infty,-2)\\cup(3,\\infty)$.',
        ],
        answer: 'x\\in(-\\infty,-2)\\cup(3,\\infty)',
      },
    ],
    quiz: [
      {
        question: 'Kolik reálných kořenů má rovnice $x^2+2x+5=0$?',
        options: ['Dva různé reálné kořeny', 'Jeden dvojnásobný kořen', 'Žádný reálný kořen', 'Nekonečně mnoho'],
        correctIndex: 2,
      },
      {
        question: 'Jaký je diskriminant rovnice $2x^2-4x+2=0$?',
        options: ['D = 0', 'D = 8', 'D = -8', 'D = 16'],
        correctIndex: 0,
      },
      {
        question: 'Podle Vietových vzorců platí pro rovnici $x^2-7x+12=0$, že součet kořenů je:',
        options: ['7', '-7', '12', '-12'],
        correctIndex: 0,
      },
      {
        question: 'Řešte rovnici $x^2-9=0$.',
        options: ['x = 3 nebo x = -3', 'x = 3 (dvojnásobný kořen)', 'x = 9 nebo x = -9', 'Rovnice nemá řešení'],
        correctIndex: 0,
      },
      {
        question: 'Kdy má kvadratická rovnice právě jeden (dvojnásobný) kořen?',
        options: ['Když D > 0', 'Když D = 0', 'Když D < 0', 'Když a = 0'],
        correctIndex: 1,
      },
    ],
    flashcards: [
      { front: 'Obecný tvar kvadratické rovnice', back: '$ax^2+bx+c=0,\\ a\\neq0$' },
      { front: 'Diskriminant', back: '$D=b^2-4ac$' },
      { front: 'Vzorec pro kořeny (D ≥ 0)', back: '$x_{1,2}=\\dfrac{-b\\pm\\sqrt D}{2a}$' },
      { front: 'Součet kořenů (Vieta)', back: '$x_1+x_2=-\\dfrac{b}{a}$' },
      { front: 'Součin kořenů (Vieta)', back: '$x_1\\cdot x_2=\\dfrac{c}{a}$' },
      { front: 'Co znamená D > 0?', back: 'Dva různé reálné kořeny' },
      { front: 'Co znamená D < 0?', back: 'Žádný reálný kořen (dva komplexně sdružené)' },
      { front: 'Co znamená D = 0?', back: 'Jeden dvojnásobný reálný kořen' },
    ],
  },
  {
    id: 'soustavy-rovnic',
    number: 4,
    title: 'Soustavy rovnic',
    category: 'Algebra',
    difficulty: 'medium',
    summary: 'Soustavu dvou lineárních rovnic o dvou neznámých řešíme dosazovací nebo sčítací metodou. Geometricky řešení odpovídá průsečíku dvou přímek — může být jedno, žádné, nebo nekonečně mnoho.',
    terms: ['dosazovací metoda', 'sčítací metoda', 'soustava rovnic', 'jedno řešení', 'nekonečně mnoho řešení', 'žádné řešení'],
    formulas: [
      { name: 'Obecný tvar soustavy', latex: 'a_1x+b_1y=c_1,\\qquad a_2x+b_2y=c_2' },
    ],
    subtopics: [
      'Umím řešit soustavu dosazovací metodou',
      'Umím řešit soustavu sčítací metodou',
      'Umím rozeznat soustavu bez řešení nebo s nekonečně mnoha řešeními',
      'Umím provést zkoušku dosazením do obou rovnic',
      'Umím sestavit soustavu rovnic ze slovní úlohy',
    ],
    workedExamples: [
      {
        problem: 'Řešte soustavu sčítací metodou: $x+y=7$, $x-y=1$.',
        steps: [
          'Sečteme obě rovnice: $(x+y)+(x-y)=7+1$.',
          'Levá strana se zjednoduší na $2x$, pravá na $8$: $2x=8$.',
          'Odtud $x=4$.',
          'Dosadíme do první rovnice: $4+y=7$, tedy $y=3$.',
        ],
        answer: 'x=4,\\ y=3',
      },
      {
        problem: 'Řešte soustavu dosazovací metodou: $y=2x-1$, $3x+y=9$.',
        steps: [
          'Z první rovnice víme $y=2x-1$, dosadíme do druhé rovnice: $3x+(2x-1)=9$.',
          'Upravíme: $5x-1=9$.',
          'Odtud $5x=10$, tedy $x=2$.',
          'Dosadíme zpět: $y=2\\cdot2-1=3$.',
        ],
        answer: 'x=2,\\ y=3',
      },
    ],
    quiz: [
      {
        question: 'Kolik řešení má obecně soustava dvou různoběžných přímek?',
        options: ['Žádné', 'Jedno', 'Nekonečně mnoho', 'Dvě'],
        correctIndex: 1,
      },
      {
        question: 'Jakou metodou nejrychleji vyřešíte soustavu $x=5$, $x+y=9$?',
        options: ['Dosazovací', 'Sčítací', 'Grafickou', 'Žádnou'],
        correctIndex: 0,
      },
      {
        question: 'Řešte soustavu $x+y=10$, $x-y=2$.',
        options: ['x=6, y=4', 'x=4, y=6', 'x=8, y=2', 'x=5, y=5'],
        correctIndex: 0,
      },
      {
        question: 'Co znamená, že soustava nemá řešení, geometricky?',
        options: ['Přímky jsou rovnoběžné a různé', 'Přímky jsou totožné', 'Přímky se protínají', 'Přímky jsou kolmé'],
        correctIndex: 0,
      },
      {
        question: 'Co znamená, že soustava má nekonečně mnoho řešení?',
        options: ['Přímky jsou totožné', 'Přímky jsou rovnoběžné a různé', 'Přímky se protínají v jednom bodě', 'Neexistuje řešení'],
        correctIndex: 0,
      },
    ],
    flashcards: [
      { front: 'Obecný tvar soustavy 2 rovnic o 2 neznámých', back: '$a_1x+b_1y=c_1,\\ a_2x+b_2y=c_2$' },
      { front: 'Dosazovací metoda', back: 'Z jedné rovnice vyjádříme jednu neznámou a dosadíme do druhé' },
      { front: 'Sčítací metoda', back: 'Rovnice sečteme nebo odečteme tak, aby jedna neznámá vypadla' },
      { front: 'Žádné řešení znamená...', back: 'Přímky jsou rovnoběžné a různé' },
      { front: 'Nekonečně mnoho řešení znamená...', back: 'Přímky splývají (jsou totožné)' },
      { front: 'Zkouška řešení soustavy', back: 'Dosazení výsledku do OBOU původních rovnic' },
    ],
  },
  {
    id: 'funkce-linearni-kvadraticka',
    number: 5,
    title: 'Lineární a kvadratická funkce',
    category: 'Funkce',
    difficulty: 'medium',
    summary: 'Lineární funkce $f(x)=ax+b$ má graf přímku se směrnicí $a$; kvadratická funkce $f(x)=ax^2+bx+c$ má graf parabolu s vrcholem, který najdeme doplněním na čtverec.',
    terms: ['definiční obor', 'obor hodnot', 'směrnice', 'vrchol paraboly', 'osa paraboly', 'rostoucí/klesající funkce'],
    formulas: [
      { name: 'Lineární funkce', latex: 'f(x)=ax+b' },
      { name: 'Směrnice ze dvou bodů', latex: 'a=\\dfrac{y_2-y_1}{x_2-x_1}' },
      { name: 'Kvadratická funkce', latex: 'f(x)=ax^2+bx+c,\\ a\\neq0' },
      { name: 'Souřadnice vrcholu paraboly', latex: 'x_V=-\\dfrac{b}{2a},\\qquad y_V=f(x_V)' },
      { name: 'Vrcholový tvar', latex: 'f(x)=a(x-m)^2+n' },
    ],
    subtopics: [
      'Umím určit, zda je lineární funkce rostoucí nebo klesající podle znaménka a',
      'Umím sestavit rovnici přímky ze dvou bodů',
      'Umím najít souřadnice vrcholu paraboly',
      'Umím převést kvadratickou funkci na vrcholový tvar (doplnění na čtverec)',
      'Umím načrtnout graf lineární i kvadratické funkce',
      'Umím určit průsečíky grafu s osami x a y',
    ],
    workedExamples: [
      {
        problem: 'Najděte předpis lineární funkce, jejíž graf prochází body $A=[1,3]$ a $B=[4,9]$.',
        steps: [
          'Směrnici spočítáme jako $a=\\dfrac{y_2-y_1}{x_2-x_1}=\\dfrac{9-3}{4-1}=\\dfrac{6}{3}=2$.',
          'Předpis má tvar $f(x)=2x+b$, dosadíme bod $A$: $3=2\\cdot1+b$.',
          'Odtud $b=3-2=1$.',
          'Předpis funkce je $f(x)=2x+1$.',
        ],
        answer: 'f(x)=2x+1',
      },
      {
        problem: 'Najděte vrchol paraboly funkce $f(x)=x^2-4x+3$ a určete její minimum.',
        steps: [
          'Souřadnice $x$ vrcholu: $x_V=-\\dfrac{b}{2a}=-\\dfrac{-4}{2\\cdot1}=2$.',
          'Dosadíme do funkce: $f(2)=2^2-4\\cdot2+3=4-8+3=-1$.',
          'Vrchol paraboly je $V=[2,-1]$.',
          'Protože $a=1>0$, parabola má ramena nahoru a v bodě $V$ nabývá svého minima.',
        ],
        answer: 'V=[2,-1],\\ f_{min}=-1',
      },
    ],
    quiz: [
      {
        question: 'Jaký je vrchol paraboly $f(x)=x^2-6x+8$?',
        options: ['[3, -1]', '[3, 1]', '[-3, -1]', '[6, 8]'],
        correctIndex: 0,
      },
      {
        question: 'Lineární funkce $f(x)=-3x+2$ je:',
        options: ['rostoucí', 'klesající', 'konstantní', 'žádná z možností'],
        correctIndex: 1,
      },
      {
        question: 'Kolik průsečíků s osou x může mít graf kvadratické funkce nejvýše?',
        options: ['0', '1', '2', 'nekonečně mnoho'],
        correctIndex: 2,
      },
      {
        question: 'Graf konstantní funkce $f(x)=b$ (kdy $a=0$) je:',
        options: ['přímka rovnoběžná s osou x', 'přímka rovnoběžná s osou y', 'parabola', 'bod'],
        correctIndex: 0,
      },
      {
        question: 'Pro kvadratickou funkci $f(x)=ax^2+bx+c$ s $a<0$ platí, že parabola:',
        options: ['má ramena nahoru a vrchol je minimum', 'má ramena dolů a vrchol je maximum', 'je to vlastně přímka', 'nemá vrchol'],
        correctIndex: 1,
      },
    ],
    flashcards: [
      { front: 'Lineární funkce – předpis', back: '$f(x)=ax+b$' },
      { front: 'Směrnice ze dvou bodů', back: '$a=\\dfrac{y_2-y_1}{x_2-x_1}$' },
      { front: 'Kvadratická funkce – předpis', back: '$f(x)=ax^2+bx+c$' },
      { front: 'x-ová souřadnice vrcholu paraboly', back: '$x_V=-\\dfrac{b}{2a}$' },
      { front: 'Kdy má parabola ramena nahoru?', back: 'Když $a>0$ (vrchol je minimum)' },
      { front: 'Kdy má parabola ramena dolů?', back: 'Když $a<0$ (vrchol je maximum)' },
      { front: 'Definiční obor lineární i kvadratické funkce', back: '$\\mathbb{R}$ (všechna reálná čísla)' },
    ],
  },
  {
    id: 'exponencialni-logaritmicke',
    number: 6,
    title: 'Exponenciální a logaritmické funkce a rovnice',
    category: 'Funkce',
    difficulty: 'hard',
    summary: 'Exponenciální funkce $f(x)=a^x$ ($a>0$, $a\\neq 1$) je rostoucí pro $a>1$ a klesající pro $0<a<1$. Logaritmus je opačná operace k umocňování: $\\log_a x$ je exponent, na který musíme umocnit základ a, abychom dostali x.',
    terms: ['exponenciální funkce', 'logaritmus', 'základ logaritmu', 'přirozený logaritmus', 'dekadický logaritmus', 'exponenciální rovnice'],
    formulas: [
      { name: 'Exponenciální funkce', latex: 'f(x)=a^x,\\quad a>0,\\ a\\neq1' },
      { name: 'Definice logaritmu', latex: '\\log_a x=y \\iff a^y=x' },
      { name: 'Logaritmus součinu', latex: '\\log_a(xy)=\\log_a x+\\log_a y' },
      { name: 'Logaritmus podílu', latex: '\\log_a\\dfrac{x}{y}=\\log_a x-\\log_a y' },
      { name: 'Logaritmus mocniny', latex: '\\log_a(x^n)=n\\log_a x' },
    ],
    subtopics: [
      'Umím určit, zda je exponenciální funkce rostoucí, nebo klesající',
      'Umím používat definici logaritmu',
      'Umím používat věty o logaritmu součinu, podílu a mocniny',
      'Umím řešit jednoduchou exponenciální rovnici převodem na stejný základ',
      'Umím řešit jednoduchou logaritmickou rovnici',
      'Umím rozlišit přirozený (ln) a dekadický (log) logaritmus',
    ],
    workedExamples: [
      {
        problem: 'Řešte rovnici $2^x=32$.',
        steps: [
          'Číslo 32 vyjádříme jako mocninu čísla 2: $32=2^5$.',
          'Rovnice má tvar $2^x=2^5$.',
          'Protože základy jsou stejné, musí se rovnat i exponenty: $x=5$.',
        ],
        answer: 'x=5',
      },
      {
        problem: 'Řešte rovnici $\\log_2 x=4$.',
        steps: [
          'Podle definice logaritmu platí $\\log_2 x=4 \\iff 2^4=x$.',
          'Vypočítáme $2^4=16$.',
          'Tedy $x=16$.',
        ],
        answer: 'x=16',
      },
    ],
    quiz: [
      {
        question: 'Pro jaké $a$ je funkce $f(x)=a^x$ klesající?',
        options: ['a > 1', '0 < a < 1', 'a = 1', 'a < 0'],
        correctIndex: 1,
      },
      {
        question: 'Čemu se rovná $\\log_a 1$?',
        options: ['0', '1', 'a', '-1'],
        correctIndex: 0,
      },
      {
        question: 'Řešte rovnici $3^x=81$.',
        options: ['x = 3', 'x = 4', 'x = 27', 'x = 9'],
        correctIndex: 1,
      },
      {
        question: 'Podle pravidla o logaritmu součinu platí $\\log_a(xy)=$',
        options: ['\\log_a x\\cdot\\log_a y', '\\log_a x+\\log_a y', '\\log_a x-\\log_a y', '(\\log_a x)(\\log_a y)'],
        correctIndex: 1,
      },
      {
        question: 'Jaký je definiční obor funkce $f(x)=\\log_a x$?',
        options: ['Všechna reálná čísla', 'x > 0', 'x ≥ 0', 'x ≠ 0'],
        correctIndex: 1,
      },
    ],
    flashcards: [
      { front: 'Exponenciální funkce – předpis', back: '$f(x)=a^x,\\ a>0,\\ a\\neq1$' },
      { front: 'Definice logaritmu', back: '$\\log_a x=y \\iff a^y=x$' },
      { front: 'Logaritmus součinu', back: '$\\log_a(xy)=\\log_a x+\\log_a y$' },
      { front: 'Logaritmus podílu', back: '$\\log_a\\frac{x}{y}=\\log_a x-\\log_a y$' },
      { front: 'Logaritmus mocniny', back: '$\\log_a(x^n)=n\\log_a x$' },
      { front: 'Přirozený logaritmus ln x', back: 'Logaritmus o základu $e\\approx 2{,}718$' },
    ],
  },
  {
    id: 'goniometrie',
    number: 7,
    title: 'Goniometrické funkce a rovnice',
    category: 'Funkce',
    difficulty: 'hard',
    summary: 'Goniometrické funkce sinus, kosinus a tangens popisují vztahy v pravoúhlém trojúhelníku a jsou periodické. Základní vztah mezi sinem a kosinem je $\\sin^2 x+\\cos^2 x=1$.',
    terms: ['jednotková kružnice', 'perioda funkce', 'radián', 'goniometrická rovnice', 'orientovaný úhel'],
    formulas: [
      { name: 'Základní goniometrická identita', latex: '\\sin^2 x+\\cos^2 x=1' },
      { name: 'Tangens', latex: '\\tan x=\\dfrac{\\sin x}{\\cos x}' },
      { name: 'Perioda sinu a kosinu', latex: 'T=2\\pi' },
    ],
    subtopics: [
      'Umím převádět stupně na radiány a naopak',
      'Umím použít vztah sin²x + cos²x = 1',
      'Umím určit hodnoty sinu a kosinu základních úhlů (0°, 30°, 45°, 60°, 90°)',
      'Umím načrtnout graf funkce sinus a kosinus',
      'Umím vyřešit jednoduchou goniometrickou rovnici typu sin x = a',
      'Umím určit periodu goniometrické funkce',
    ],
    workedExamples: [
      {
        problem: 'Vypočítejte $\\cos x$, pokud $\\sin x=\\dfrac{3}{5}$ a $x$ je úhel z prvního kvadrantu ($0<x<\\frac{\\pi}{2}$).',
        steps: [
          'Použijeme základní vztah $\\sin^2 x+\\cos^2 x=1$.',
          'Dosadíme: $\\left(\\dfrac{3}{5}\\right)^2+\\cos^2 x=1$.',
          'Upravíme: $\\dfrac{9}{25}+\\cos^2 x=1$, tedy $\\cos^2 x=\\dfrac{16}{25}$.',
          'Protože x je z prvního kvadrantu, $\\cos x$ je kladný: $\\cos x=\\dfrac{4}{5}$.',
        ],
        answer: '\\cos x=\\dfrac{4}{5}',
      },
      {
        problem: 'Řešte rovnici $\\sin x=\\dfrac{1}{2}$ pro $x\\in[0,2\\pi)$.',
        steps: [
          'Hodnotu $\\frac{1}{2}$ má sinus u úhlů $\\dfrac{\\pi}{6}$ a $\\pi-\\dfrac{\\pi}{6}=\\dfrac{5\\pi}{6}$ (první a druhý kvadrant).',
          'V zadaném intervalu $[0,2\\pi)$ jsou to jediná dvě řešení.',
        ],
        answer: 'x=\\dfrac{\\pi}{6}\\ \\text{nebo}\\ x=\\dfrac{5\\pi}{6}',
      },
    ],
    quiz: [
      {
        question: 'Čemu se rovná $\\sin^2 x+\\cos^2 x$?',
        options: ['0', '1', '2', 'x'],
        correctIndex: 1,
      },
      {
        question: 'Kolik radiánů odpovídá 180°?',
        options: ['π', '2π', 'π/2', '360'],
        correctIndex: 0,
      },
      {
        question: 'Jaká je perioda funkce sinus?',
        options: ['π', '2π', 'π/2', '4π'],
        correctIndex: 1,
      },
      {
        question: 'Čemu se rovná $\\tan x$?',
        options: ['sin x / cos x', 'cos x / sin x', 'sin x · cos x', '1 / sin x'],
        correctIndex: 0,
      },
      {
        question: 'Kolik je $\\sin(\\pi/2)$?',
        options: ['0', '1', '-1', '1/2'],
        correctIndex: 1,
      },
    ],
    flashcards: [
      { front: 'Základní identita', back: '$\\sin^2 x+\\cos^2 x=1$' },
      { front: 'tg x – definice', back: '$\\dfrac{\\sin x}{\\cos x}$' },
      { front: 'Perioda sin a cos', back: '$2\\pi$' },
      { front: '180° v radiánech', back: '$\\pi$' },
      { front: 'sin(0)', back: '0' },
      { front: 'cos(0)', back: '1' },
      { front: 'sin(π/2)', back: '1' },
    ],
  },
  {
    id: 'planimetrie',
    number: 8,
    title: 'Planimetrie',
    category: 'Geometrie',
    difficulty: 'medium',
    summary: 'Planimetrie zkoumá útvary v rovině — trojúhelníky, čtyřúhelníky, kružnice. Klíčové jsou Pythagorova věta, vzorce pro obsah a obvod základních útvarů a věty o podobnosti trojúhelníků.',
    terms: ['Pythagorova věta', 'podobnost trojúhelníků', 'obsah', 'obvod', 'pravoúhlý trojúhelník', 'Thaletova věta'],
    formulas: [
      { name: 'Pythagorova věta', latex: 'c^2=a^2+b^2' },
      { name: 'Obsah trojúhelníku', latex: 'S=\\dfrac{1}{2}\\cdot z\\cdot v_z' },
      { name: 'Obsah kruhu', latex: 'S=\\pi r^2' },
      { name: 'Obvod kruhu', latex: 'o=2\\pi r' },
      { name: 'Obsah obdélníku', latex: 'S=a\\cdot b' },
    ],
    subtopics: [
      'Umím použít Pythagorovu větu k výpočtu strany pravoúhlého trojúhelníku',
      'Umím vypočítat obsah a obvod trojúhelníku',
      'Umím vypočítat obsah a obvod kruhu',
      'Umím poznat podobné trojúhelníky a použít poměr podobnosti',
      'Umím použít Thaletovu větu',
      'Umím vypočítat obsah čtyřúhelníku (obdélník, čtverec, kosočtverec)',
    ],
    workedExamples: [
      {
        problem: 'Pravoúhlý trojúhelník má odvěsny $a=3$ cm, $b=4$ cm. Vypočítejte délku přepony.',
        steps: [
          'Podle Pythagorovy věty platí $c^2=a^2+b^2$.',
          'Dosadíme: $c^2=3^2+4^2=9+16=25$.',
          'Odmocníme: $c=\\sqrt{25}=5$.',
        ],
        answer: 'c=5\\ \\text{cm}',
      },
      {
        problem: 'Vypočítejte obsah kruhu o poloměru $r=6$ cm ($\\pi\\approx3{,}14$).',
        steps: [
          'Použijeme vzorec $S=\\pi r^2$.',
          'Dosadíme: $S=3{,}14\\cdot6^2=3{,}14\\cdot36$.',
          'Vypočítáme: $S\\approx113{,}04\\ \\text{cm}^2$.',
        ],
        answer: 'S\\approx113{,}04\\ \\text{cm}^2',
      },
    ],
    quiz: [
      {
        question: 'Pythagorova věta platí pro:',
        options: ['Libovolný trojúhelník', 'Pravoúhlý trojúhelník', 'Rovnostranný trojúhelník', 'Kosočtverec'],
        correctIndex: 1,
      },
      {
        question: 'Jaký je obsah kruhu o poloměru r?',
        options: ['2πr', 'πr²', 'πr', 'πd'],
        correctIndex: 1,
      },
      {
        question: 'Odvěsny pravoúhlého trojúhelníku jsou 6 a 8. Jak dlouhá je přepona?',
        options: ['10', '14', '48', '100'],
        correctIndex: 0,
      },
      {
        question: 'Co říká Thaletova věta?',
        options: ['Trojúhelník vepsaný do kružnice nad průměrem je pravoúhlý', 'Součet úhlů trojúhelníku je 180°', 'Obsah trojúhelníku je poloviční součin základny a výšky', 'Přepona je vždy nejdelší strana'],
        correctIndex: 0,
      },
      {
        question: 'Obsah obdélníku se stranami 5 cm a 7 cm je:',
        options: ['12 cm²', '35 cm²', '24 cm²', '70 cm²'],
        correctIndex: 1,
      },
    ],
    flashcards: [
      { front: 'Pythagorova věta', back: '$c^2=a^2+b^2$' },
      { front: 'Obsah trojúhelníku', back: '$S=\\frac{1}{2}\\cdot z\\cdot v$' },
      { front: 'Obsah kruhu', back: '$S=\\pi r^2$' },
      { front: 'Obvod kruhu', back: '$o=2\\pi r$' },
      { front: 'Obsah obdélníku', back: '$S=a\\cdot b$' },
      { front: 'Thaletova věta', back: 'Obvodový úhel nad průměrem kružnice je pravý (90°)' },
    ],
  },
  {
    id: 'stereometrie',
    number: 9,
    title: 'Stereometrie',
    category: 'Geometrie',
    difficulty: 'hard',
    summary: 'Stereometrie zkoumá tělesa v prostoru — hranoly, válce, jehlany, koule. Typicky počítáme jejich objem a povrch pomocí vzorců odvozených z obsahu podstavy a výšky tělesa.',
    terms: ['těleso', 'podstava', 'objem', 'povrch', 'síť tělesa', 'rotační těleso'],
    formulas: [
      { name: 'Objem hranolu', latex: 'V=S_p\\cdot v' },
      { name: 'Objem válce', latex: 'V=\\pi r^2 v' },
      { name: 'Objem jehlanu / kužele', latex: 'V=\\dfrac{1}{3}S_p v' },
      { name: 'Objem koule', latex: 'V=\\dfrac{4}{3}\\pi r^3' },
      { name: 'Povrch koule', latex: 'S=4\\pi r^2' },
    ],
    subtopics: [
      'Umím vypočítat objem hranolu',
      'Umím vypočítat objem a povrch válce',
      'Umím vypočítat objem jehlanu a kužele',
      'Umím vypočítat objem a povrch koule',
      'Umím načrtnout síť jednoduchého tělesa',
      'Umím rozlišit rotační a hranatá tělesa',
    ],
    workedExamples: [
      {
        problem: 'Vypočítejte objem kvádru s hranami $a=4$ cm, $b=3$ cm, $c=5$ cm.',
        steps: [
          'Objem kvádru (speciální případ hranolu) je součin délek jeho hran: $V=a\\cdot b\\cdot c$.',
          'Dosadíme: $V=4\\cdot3\\cdot5$.',
          'Vypočítáme: $V=60\\ \\text{cm}^3$.',
        ],
        answer: 'V=60\\ \\text{cm}^3',
      },
      {
        problem: 'Vypočítejte objem válce s poloměrem podstavy $r=3$ cm a výškou $v=10$ cm ($\\pi\\approx3{,}14$).',
        steps: [
          'Použijeme vzorec $V=\\pi r^2 v$.',
          'Dosadíme: $V=3{,}14\\cdot3^2\\cdot10=3{,}14\\cdot9\\cdot10$.',
          'Vypočítáme: $V\\approx282{,}6\\ \\text{cm}^3$.',
        ],
        answer: 'V\\approx282{,}6\\ \\text{cm}^3',
      },
    ],
    quiz: [
      {
        question: 'Jaký je vzorec pro objem válce?',
        options: ['πr²v', '2πrv', 'πr²+v', '(1/3)πr²v'],
        correctIndex: 0,
      },
      {
        question: 'Jaký je vzorec pro objem koule?',
        options: ['(4/3)πr³', '4πr²', '(1/3)πr³', 'πr³'],
        correctIndex: 0,
      },
      {
        question: 'Objem jehlanu se vypočítá jako:',
        options: ['S_p·v', '(1/3)S_p·v', '(1/2)S_p·v', '2S_p·v'],
        correctIndex: 1,
      },
      {
        question: 'Povrch koule o poloměru r je:',
        options: ['4πr²', '(4/3)πr³', '2πr²', 'πr²'],
        correctIndex: 0,
      },
      {
        question: 'Kvádr má hrany 2 cm, 3 cm a 4 cm. Jaký je jeho objem?',
        options: ['9 cm³', '24 cm³', '18 cm³', '12 cm³'],
        correctIndex: 1,
      },
    ],
    flashcards: [
      { front: 'Objem hranolu', back: '$V=S_p\\cdot v$' },
      { front: 'Objem válce', back: '$V=\\pi r^2 v$' },
      { front: 'Objem jehlanu / kužele', back: '$V=\\frac{1}{3}S_p\\cdot v$' },
      { front: 'Objem koule', back: '$V=\\frac{4}{3}\\pi r^3$' },
      { front: 'Povrch koule', back: '$S=4\\pi r^2$' },
      { front: 'Objem kvádru', back: '$V=a\\cdot b\\cdot c$' },
    ],
  },
  {
    id: 'analyticka-geometrie',
    number: 10,
    title: 'Analytická geometrie',
    category: 'Geometrie',
    difficulty: 'hard',
    summary: 'Analytická geometrie popisuje geometrické útvary pomocí souřadnic a rovnic — bod, vektor, přímku a kružnici v souřadnicové soustavě.',
    terms: ['souřadnice bodu', 'směrový vektor', 'normálový vektor', 'obecná rovnice přímky', 'střed kružnice', 'poloměr'],
    formulas: [
      { name: 'Vzdálenost dvou bodů', latex: '|AB|=\\sqrt{(x_2-x_1)^2+(y_2-y_1)^2}' },
      { name: 'Směrový vektor přímky AB', latex: '\\vec{u}=(x_2-x_1,\\ y_2-y_1)' },
      { name: 'Obecná rovnice přímky', latex: 'ax+by+c=0' },
      { name: 'Směrnicový tvar přímky', latex: 'y=kx+q' },
      { name: 'Rovnice kružnice', latex: '(x-m)^2+(y-n)^2=r^2' },
    ],
    subtopics: [
      'Umím vypočítat vzdálenost dvou bodů',
      'Umím určit směrový vektor přímky ze dvou bodů',
      'Umím sestavit obecnou rovnici přímky',
      'Umím sestavit rovnici kružnice se zadaným středem a poloměrem',
      'Umím určit střed a poloměr kružnice z její rovnice',
      'Umím rozhodnout, zda bod leží na přímce nebo kružnici',
    ],
    workedExamples: [
      {
        problem: 'Vypočítejte vzdálenost bodů $A=[1,2]$ a $B=[4,6]$.',
        steps: [
          'Použijeme vzorec $|AB|=\\sqrt{(x_2-x_1)^2+(y_2-y_1)^2}$.',
          'Dosadíme: $|AB|=\\sqrt{(4-1)^2+(6-2)^2}=\\sqrt{3^2+4^2}$.',
          'Vypočítáme pod odmocninou: $\\sqrt{9+16}=\\sqrt{25}$.',
          'Odmocníme: $|AB|=5$.',
        ],
        answer: '|AB|=5',
      },
      {
        problem: 'Napište rovnici kružnice se středem $S=[2,-1]$ a poloměrem $r=3$.',
        steps: [
          'Použijeme obecnou rovnici kružnice $(x-m)^2+(y-n)^2=r^2$.',
          'Dosadíme souřadnice středu $m=2$, $n=-1$: $(x-2)^2+(y-(-1))^2=r^2$.',
          'Zjednodušíme a dosadíme poloměr $r=3$, tedy $r^2=9$.',
        ],
        answer: '(x-2)^2+(y+1)^2=9',
      },
    ],
    quiz: [
      {
        question: 'Jaký je vzorec pro vzdálenost bodů A, B?',
        options: ['√((x₂-x₁)²+(y₂-y₁)²)', '(x₂-x₁)+(y₂-y₁)', '(x₂-x₁)²+(y₂-y₁)²', '√(x₂+y₂)'],
        correctIndex: 0,
      },
      {
        question: 'Rovnice kružnice se středem S=[0,0] a poloměrem r má tvar:',
        options: ['x²+y²=r²', 'x+y=r', 'x²-y²=r²', 'xy=r²'],
        correctIndex: 0,
      },
      {
        question: 'Obecná rovnice přímky má tvar:',
        options: ['ax+by+c=0', 'y=x²', 'x²+y²=1', 'ax²+bx+c=0'],
        correctIndex: 0,
      },
      {
        question: 'Směrový vektor přímky procházející body A=[0,0], B=[2,5] je:',
        options: ['(2, 5)', '(5, 2)', '(2, 0)', '(0, 5)'],
        correctIndex: 0,
      },
      {
        question: 'Kružnice $(x-3)^2+(y-1)^2=16$ má poloměr:',
        options: ['16', '8', '4', '2'],
        correctIndex: 2,
      },
    ],
    flashcards: [
      { front: 'Vzdálenost dvou bodů', back: '$|AB|=\\sqrt{(x_2-x_1)^2+(y_2-y_1)^2}$' },
      { front: 'Obecná rovnice přímky', back: '$ax+by+c=0$' },
      { front: 'Směrnicový tvar přímky', back: '$y=kx+q$' },
      { front: 'Rovnice kružnice', back: '$(x-m)^2+(y-n)^2=r^2$' },
      { front: 'Směrový vektor AB', back: '$(x_2-x_1,\\ y_2-y_1)$' },
      { front: 'Co určuje $r^2$ v rovnici kružnice?', back: 'Druhou mocninu poloměru' },
    ],
  },
  {
    id: 'posloupnosti-rady',
    number: 11,
    title: 'Posloupnosti a řady',
    category: 'Algebra',
    difficulty: 'medium',
    summary: 'Posloupnost je funkce definovaná na přirozených číslech. Aritmetická posloupnost má konstantní diferenci mezi členy, geometrická konstantní kvocient (podíl).',
    terms: ['aritmetická posloupnost', 'geometrická posloupnost', 'diference', 'kvocient', 'n-tý člen', 'součet posloupnosti'],
    formulas: [
      { name: 'n-tý člen aritmetické posloupnosti', latex: 'a_n=a_1+(n-1)d' },
      { name: 'Součet aritmetické posloupnosti', latex: 's_n=\\dfrac{n}{2}(a_1+a_n)' },
      { name: 'n-tý člen geometrické posloupnosti', latex: 'a_n=a_1\\cdot q^{n-1}' },
      { name: 'Součet geometrické posloupnosti', latex: 's_n=a_1\\cdot\\dfrac{q^n-1}{q-1},\\quad q\\neq1' },
    ],
    subtopics: [
      'Umím určit n-tý člen aritmetické posloupnosti',
      'Umím vypočítat součet prvních n členů aritmetické posloupnosti',
      'Umím určit n-tý člen geometrické posloupnosti',
      'Umím vypočítat součet prvních n členů geometrické posloupnosti',
      'Umím rozeznat, zda je posloupnost aritmetická, geometrická, nebo ani jedno',
      'Umím řešit slovní úlohy vedoucí na posloupnosti',
    ],
    workedExamples: [
      {
        problem: 'Aritmetická posloupnost má $a_1=3$ a diferenci $d=4$. Vypočítejte desátý člen.',
        steps: [
          'Použijeme vzorec $a_n=a_1+(n-1)d$.',
          'Dosadíme $n=10$: $a_{10}=3+(10-1)\\cdot4$.',
          'Vypočítáme: $a_{10}=3+9\\cdot4=3+36$.',
          'Výsledek: $a_{10}=39$.',
        ],
        answer: 'a_{10}=39',
      },
      {
        problem: 'Vypočítejte součet prvních 5 členů geometrické posloupnosti s $a_1=2$ a kvocientem $q=3$.',
        steps: [
          'Použijeme vzorec $s_n=a_1\\cdot\\dfrac{q^n-1}{q-1}$.',
          'Dosadíme $n=5$, $q=3$: $s_5=2\\cdot\\dfrac{3^5-1}{3-1}$.',
          'Vypočítáme $3^5=243$, tedy $s_5=2\\cdot\\dfrac{242}{2}$.',
          'Výsledek: $s_5=242$.',
        ],
        answer: 's_5=242',
      },
    ],
    quiz: [
      {
        question: 'Jak se nazývá konstantní rozdíl mezi členy aritmetické posloupnosti?',
        options: ['Kvocient', 'Diference', 'Poměr', 'Index'],
        correctIndex: 1,
      },
      {
        question: 'Vzorec pro n-tý člen geometrické posloupnosti je:',
        options: ['a₁+(n-1)d', 'a₁·q^(n-1)', 'a₁·n', 'a₁+q^n'],
        correctIndex: 1,
      },
      {
        question: 'Posloupnost 2, 4, 8, 16, ... je:',
        options: ['Aritmetická', 'Geometrická', 'Ani jedna', 'Obě'],
        correctIndex: 1,
      },
      {
        question: 'Aritmetická posloupnost má $a_1=5$, $d=2$. Jaký je $a_4$?',
        options: ['7', '9', '11', '13'],
        correctIndex: 2,
      },
      {
        question: 'Součet prvních n členů aritmetické posloupnosti se vypočítá jako:',
        options: ['n/2·(a₁+aₙ)', 'a₁·q^n', 'n·a₁', '(a₁+aₙ)/2'],
        correctIndex: 0,
      },
    ],
    flashcards: [
      { front: 'n-tý člen aritmetické posloupnosti', back: '$a_n=a_1+(n-1)d$' },
      { front: 'Součet aritmetické posloupnosti', back: '$s_n=\\frac{n}{2}(a_1+a_n)$' },
      { front: 'n-tý člen geometrické posloupnosti', back: '$a_n=a_1\\cdot q^{n-1}$' },
      { front: 'Součet geometrické posloupnosti', back: '$s_n=a_1\\cdot\\frac{q^n-1}{q-1}$' },
      { front: 'Diference', back: 'Konstantní rozdíl mezi po sobě jdoucími členy aritmetické posloupnosti' },
      { front: 'Kvocient', back: 'Konstantní podíl mezi po sobě jdoucími členy geometrické posloupnosti' },
    ],
  },
  {
    id: 'kombinatorika-pravdepodobnost',
    number: 12,
    title: 'Kombinatorika, pravděpodobnost a statistika',
    category: 'Statistika',
    difficulty: 'medium',
    summary: 'Kombinatorika počítá počty možností uspořádání a výběru prvků (permutace, variace, kombinace). Klasická pravděpodobnost jevu je poměr počtu příznivých výsledků k počtu všech možných výsledků.',
    terms: ['faktoriál', 'permutace', 'variace', 'kombinace', 'náhodný jev', 'pravděpodobnost'],
    formulas: [
      { name: 'Faktoriál', latex: 'n!=1\\cdot2\\cdot3\\cdots n' },
      { name: 'Permutace', latex: 'P(n)=n!' },
      { name: 'Variace bez opakování', latex: 'V(k,n)=\\dfrac{n!}{(n-k)!}' },
      { name: 'Kombinace bez opakování', latex: 'C(k,n)=\\binom{n}{k}=\\dfrac{n!}{k!(n-k)!}' },
      { name: 'Klasická pravděpodobnost', latex: 'P(A)=\\dfrac{\\text{počet příznivých výsledků}}{\\text{počet všech výsledků}}' },
    ],
    subtopics: [
      'Umím vypočítat faktoriál čísla',
      'Umím rozlišit permutaci, variaci a kombinaci',
      'Umím vypočítat počet kombinací pomocí kombinačního čísla',
      'Umím vypočítat klasickou pravděpodobnost jevu',
      'Umím určit aritmetický průměr a medián souboru dat',
      'Umím vypočítat pravděpodobnost opačného jevu',
    ],
    workedExamples: [
      {
        problem: 'Kolika způsoby lze seřadit 4 různé knihy na poličce?',
        steps: [
          'Jde o permutaci 4 prvků, počet uspořádání je $P(4)=4!$.',
          'Vypočítáme $4!=4\\cdot3\\cdot2\\cdot1$.',
          'Výsledek: $P(4)=24$.',
        ],
        answer: '24\\ \\text{způsobů}',
      },
      {
        problem: 'Kolika způsoby lze vybrat 2 žáky z party 5 žáků (na pořadí nezáleží)?',
        steps: [
          'Jde o kombinaci 2 prvků z 5: $C(2,5)=\\binom{5}{2}=\\dfrac{5!}{2!\\cdot3!}$.',
          'Vypočítáme $5!=120$, $2!=2$, $3!=6$, takže $C(2,5)=\\dfrac{120}{2\\cdot6}=\\dfrac{120}{12}$.',
          'Výsledek: $C(2,5)=10$.',
        ],
        answer: '10\\ \\text{způsobů}',
      },
    ],
    quiz: [
      {
        question: 'Kolik je $5!$?',
        options: ['20', '60', '120', '25'],
        correctIndex: 2,
      },
      {
        question: 'Kdy použijeme kombinace místo variací?',
        options: ['Když záleží na pořadí', 'Když nezáleží na pořadí', 'Nikdy', 'Vždy'],
        correctIndex: 1,
      },
      {
        question: 'Klasická pravděpodobnost jevu A se vypočítá jako:',
        options: ['počet příznivých / počet všech výsledků', 'počet všech / počet příznivých', 'počet příznivých · počet všech', 'počet příznivých − počet všech'],
        correctIndex: 0,
      },
      {
        question: 'Hodíme kostkou. Jaká je pravděpodobnost, že padne číslo 6?',
        options: ['1/6', '1/3', '1/2', '1'],
        correctIndex: 0,
      },
      {
        question: 'Kolik je $P(3)$ (permutace 3 prvků)?',
        options: ['3', '6', '9', '27'],
        correctIndex: 1,
      },
    ],
    flashcards: [
      { front: 'Faktoriál n!', back: '$1\\cdot2\\cdot3\\cdots n$' },
      { front: 'Permutace P(n)', back: '$n!$' },
      { front: 'Variace V(k,n)', back: '$\\dfrac{n!}{(n-k)!}$' },
      { front: 'Kombinace C(k,n)', back: '$\\dfrac{n!}{k!(n-k)!}$' },
      { front: 'Klasická pravděpodobnost', back: 'Počet příznivých / počet všech výsledků' },
      { front: 'Pravděpodobnost opačného jevu', back: '$P(A\')=1-P(A)$' },
    ],
  },
];

// Zajistí, že u nedopsaných témat existují prázdná pole místo undefined.
for (const t of ALL_TOPICS) {
  t.terms ??= [];
  t.formulas ??= [];
  t.subtopics ??= [];
  t.workedExamples ??= [];
  t.quiz ??= [];
  t.flashcards ??= [];
}
