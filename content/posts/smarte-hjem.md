---
title: Begynne i det små med smarte hjem
date: 2019-08-03T07:52:06+02:00
language: norwegian
draft: false
---

Det har vært snakk om smarte hjem en stund nå. Når alle hus har WiFi, og komponenter er så billige at til og med små enheter kan ha både Blutooth og WiFi, så skal det teoretisk sett være mulig å styre alt elektronisk i hjemmet slik at hjemmet blir smart som bare det. Det teoretiske har faktisk vært på plass i tiår allerede – omtrent fra da WiFi kom. Men utfordringen er å ha et robust grensesnitt for dingser/enheter å snakke sammen. Egentlig snakker sjelden dingser sammen, men de må ha mulighet til å snakke sammen.

De trenger bare å kunne høre på kommandoer fra et felles grensesnitt. Hvis det er på plass, kan man styre alt fra en app, en nettside, eller sette opp egne _hendelser_ via f eks [IFTTT](https://ifttt.com) (IF This Then That – et genialt produkt for automatisere hva som helst) eller Google Home. Dessverre ser det ut til at produsenter ikke er så opptatt av å lage felles grensesnitt eller gjøre det enkelt for brukere. Det er et drøss av forskjellige standarder, og til og med ting som liksom skal være smarte er ganske dumme, og det er vanskelig å integrere ting fra en produsent med noe annet. Vi plages stadig av at det er forskjellige støpsler i forskjellige land. Hva som hver produsent av elektronikk hadde sine egne støpsler og stikkontakter?
F eks kan man styre en Roomba-støvsuger fra en egen app man må installere. Man kan sette timere og rutiner og sånt. Det virker ganske greit for Roomba, men det hadde vært fint om man kunne velge å styre den fra en hvilken som helst app som f eks IFTTT eller Amazon Alexa. Vi kommer ingen vei hvis man må ha en egen app for hver bidige "smarte" ting man har.

![Skjermdump av for mange apper for smarte hjem](https://www.loxone.com/enen/wp-content/uploads/sites/3/2014/07/photo-2.png "Skjermdump av for mange apper for smarte hjem")

_Litt mange apper for et smart hjem._

Et smart hjem skal ideelt sett erstatte en butler. Man skal kun trenge å fortelle butleren noen få ting om sine dagligdagse rutiner, mens han/hun koordinerer et team av tjenere som gjør alt.

Måten jeg måler hvor langt vi har kommet med smarte hjem er hvor vanskelig det er å starte kaffetrakteren i det øyeblikket vekkerklokka di går av. Det er et åpenbart brukscase som er veldig simpelt, men som hjelper veldig. Hvor mye bedre er det ikke å våkne opp til duften av nytrakta kaffe? Med mindre man har en tjener eller en ektefelle som står opp før deg, er et smarthjem den eneste måten å få til dette.

Problem 1 – starte trakteren.
Hvis trakteren skal starte automatisk, må den kunne ta imot signaler på en måte. Det finnes sikkert kaffetraktere der ute som har mulighet til å koble seg til WiFi på samme måte som Roomba, men det er teit å måtte kjøpe en helt ny kaffetrakter bare for det. Mye bedre om man bare kan bruke den pålitelige trakteren du allerede har. Man vil også gjerne ha mulighet til å starte trakteren på en skreddersydd måte, og ikke konfigurere den fra en app, og brødristeren fra en annen app osv.

Problem 2 – reagere på vekkerklokka.
La oss si at du vil stå opp senere en dag. Eller kanskje er på ferie og ikke bruker vekkerklokke. Må man da inn i ørten apper og konfigurere innstillingene i hver eneste en? Slik som det er idag må man det. En enorm fordel med å ha et åpent grensesnitt som enheter kan kommunisere gjennom er at en hvilken som helst hendelse kan utløse en hvilken som helst reaksjon. Det er slik IFTTT og mye annet på internett fungerer. Man vil at alarmen du har satt på telefonen din – enten du har Android, Iphone eller Windows phone eller noe annet – skal si ifra til andre ting i hjemmet at nå ringer alarmen. Hvis hver produsent har sin egen app og et lukket grensesnitt for kommunikasjon vil dette aldri gå.
Noen enheter begynner nå å komme med støtte for Google Home og Amazon Alexa – som er et godt steg fremover. Men de færreste forbrukere har eller ønsker disse Orwelliske apparatene i hjemmet, så smarte enheter må kunne reagere på enda mer åpne grensesnitt som IFTTT eller det vi webutviklere kaller "webhooks".

Heldigvis går vi sakte men sikkert i riktig retning. Jeg synes ikke det er ønskelig at de fleste apparater skal komme med smart-funksjonalitet med mindre de støtter helt åpne grensesnitt. Bedre om de er dumme og enkle, og at kompleksiteten sitter i et annet nivå (layer). Jeg tipper en vanlig person maks til forholde seg til en eller to smarte dingser i hjemmet til enhver tid. For de fleste er dette kun vekkerklokka, men noen har f eks en tidsinnstilt motorvarmer eller sprinkelanlegg i tillegg.

Jeg er åpen for såkalte smart-plugs/sockets (smartkontakt?). De er bare en liten enhet mellom en stikkontakt og et støpsel og bestemmer om det skal gå strøm gjennom eller ikke. De fungerer akkurat som en sånn man kan bruke for å sette på motorvarmeren ved å stille en nedteller, bare at de kan utløses av en hvilken som helst hendelse – ikke bare en nedteller man må sette hver dag. Med en sånn kan man f eks starte motorvarmenen:

- Hver ukedag klokka 07:00, men ikke på helligdager
- Når jeg sier til Google Home at den skal starte motorvarmeren
- Når alarmen på telefonen ringer
- Når noen twitrer om forsinkelser i ~~NSB~~ Vy

Eller omtrent hva som helst av hendelser som kan representeres digitalt. Slike smartkontakter kan også brukes som en enkel måte å gjøre dumme hjem litt smarte på – på en måte folk flest kan begynne med. F eks kan man styre strømmen til en kaffetrakter med en smartkontakt, og man kan da ganske enkelt nå målet jeg satte i begynnelsen om å trakte kaffe automatisk når vekkerklokka ringer. En sånn smartkontakt er mye billigere enn å kjøpe en helt ny kaffetrakter – de koster omtrent 100kr på Aliexpress eller Ebay. Og de er fleksible og med åpne grensesnitt i tillegg. Man kan også styre andre ting i morgenrutinen med disse. F eks starte en varmluftsovn, starte en radio, skru på lyset, og starte en "oljediffuser". Alt dette kan skje på en gang og kan styres fra en enkelt app ved å bare bruke smartkontakter. Kontaktene kan også styres på alle slags kreative måter hvis de støtter IFTTT.

Man er avhengig av å ha apparater som faktisk starter når strømmen kobles til. Dessverre er mange dingser sånn at de ikke starter før man fysisk trykker på en knapp eller to først – etter å ha kobla til strømmen. Spesielt litt mer moderne apparater må konfigureres hver gang de kobles til strømmen, og kan aldri bli smarte av den grunn. Men noen ting som Moccamaster, varmekokere, eller en enkel varmluftsovn starter så straks strømmen kobles til, og kan bli veldig smarte med hjelp av en smartkontakt.

Jeg skal senere skrive en artikkel om hvor mye touch screens, touch-knapper, og mikrokontrollere i vanlige dingser har gjort brukergrensesnittet mye dårligere enn det var før. Jeg savner dingser som starter av seg selv når strømmen kobles til og som har fysiske brytere og knapper man kan vri og trykke på.

![Bilde av smartkontakt](https://i.ebayimg.com/images/g/nlcAAOSwRiNdDL60/s-l1600.jpg "Bilde av smartkontakt")

_Eksempel på en smartkontakt._
